from django.contrib.auth.models import User
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Organization, OrganizationMember
from .permissions import IsOrganizationMember
from .serializers import (
    InviteMemberSerializer,
    OrganizationMemberSerializer,
    OrganizationSerializer,
)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def listMyOrganizations(request):
    """Get all organizations where the user is a member"""
    memberships = OrganizationMember.objects.filter(
        user=request.user,
        is_active=True
    ).select_related('organization')

    organizations = [m.organization for m in memberships]
    serializer = OrganizationSerializer(organizations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def createOrganization(request):
    """Create a new organization (user becomes owner)"""
    serializer = OrganizationSerializer(data=request.data)

    if serializer.is_valid():
        # Create organization
        org = serializer.save(owner=request.user)

        # Add creator as owner member
        OrganizationMember.objects.create(
            organization=org,
            user=request.user,
            role='owner',
            is_active=True
        )

        return Response(
            OrganizationSerializer(org).data,
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getOrganization(request, org_id):
    """Get organization details"""
    org = get_object_or_404(Organization, id=org_id)

    # Check if user is a member
    is_member = org.members.filter(user=request.user, is_active=True).exists()
    if not is_member:
        return Response(
            {"error": "You are not a member of this organization"},
            status=status.HTTP_403_FORBIDDEN
        )

    serializer = OrganizationSerializer(org)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsOrganizationMember])
@authentication_classes([JWTAuthentication])
def listMembers(request, org_id):
    """List all members of an organization"""
    org = get_object_or_404(Organization, id=org_id)

    members = org.members.filter(is_active=True).select_related('user', 'invited_by')
    serializer = OrganizationMemberSerializer(members, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def inviteMember(request, org_id):
    """Invite a new member to the organization"""
    org = get_object_or_404(Organization, id=org_id)

    # Check if user can manage this org
    member = org.members.filter(user=request.user, is_active=True).first()
    if not member or not member.can_manage_events():
        return Response(
            {"error": "Only admins and owners can invite members"},
            status=status.HTTP_403_FORBIDDEN
        )

    serializer = InviteMemberSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']
    role = serializer.validated_data['role']

    # Find user by email
    try:
        invited_user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": f"No user found with email: {email}"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Check if already a member
    if org.members.filter(user=invited_user).exists():
        return Response(
            {"error": "User is already a member of this organization"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Create membership
    new_member = OrganizationMember.objects.create(
        organization=org,
        user=invited_user,
        role=role,
        invited_by=request.user,
        is_active=True
    )

    # TODO: Send email notification to invited user

    return Response(
        OrganizationMemberSerializer(new_member).data,
        status=status.HTTP_201_CREATED
    )


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def updateMemberRole(request, org_id, member_id):
    """Update a member's role"""
    org = get_object_or_404(Organization, id=org_id)
    member_to_update = get_object_or_404(OrganizationMember, id=member_id, organization=org)

    # Check if requester can manage
    requester_member = org.members.filter(user=request.user, is_active=True).first()
    if not requester_member or requester_member.role != 'owner':
        return Response(
            {"error": "Only owners can change member roles"},
            status=status.HTTP_403_FORBIDDEN
        )

    # Prevent changing owner role
    if member_to_update.role == 'owner':
        return Response(
            {"error": "Cannot change owner role. Transfer ownership instead."},
            status=status.HTTP_400_BAD_REQUEST
        )

    new_role = request.data.get('role')
    if new_role not in dict(OrganizationMember.ROLE_CHOICES):
        return Response(
            {"error": "Invalid role"},
            status=status.HTTP_400_BAD_REQUEST
        )

    member_to_update.role = new_role
    member_to_update.save()

    return Response(
        OrganizationMemberSerializer(member_to_update).data,
        status=status.HTTP_200_OK
    )


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def removeMember(request, org_id, member_id):
    """Remove a member from the organization"""
    org = get_object_or_404(Organization, id=org_id)
    member_to_remove = get_object_or_404(OrganizationMember, id=member_id, organization=org)

    # Check if requester can manage
    requester_member = org.members.filter(user=request.user, is_active=True).first()
    if not requester_member or not requester_member.can_manage_events():
        return Response(
            {"error": "Only admins and owners can remove members"},
            status=status.HTTP_403_FORBIDDEN
        )

    # Prevent removing owner
    if member_to_remove.role == 'owner':
        return Response(
            {"error": "Cannot remove owner. Transfer ownership first."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Soft delete (deactivate)
    member_to_remove.is_active = False
    member_to_remove.save()

    return Response(
        {"message": f"Member {member_to_remove.user.username} removed successfully"},
        status=status.HTTP_200_OK
    )
