from django.contrib.auth.models import User
from rest_framework import serializers

from .models import EventTeamMember, Organization, OrganizationMember


class UserSerializer(serializers.ModelSerializer):
    """Basic user info for member listings"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = fields


class OrganizationSerializer(serializers.ModelSerializer):
    """Organization with member count"""
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    member_count = serializers.SerializerMethodField()

    class Meta:
        model = Organization
        fields = [
            'id', 'name', 'slug', 'description', 'website',
            'subscription_tier', 'owner', 'owner_username',
            'member_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'owner', 'created_at', 'updated_at']

    def get_member_count(self, obj):
        return obj.members.filter(is_active=True).count()


class OrganizationMemberSerializer(serializers.ModelSerializer):
    """Team member with user details"""
    user_details = UserSerializer(source='user', read_only=True)
    organization_name = serializers.CharField(source='organization.name', read_only=True)
    invited_by_username = serializers.CharField(source='invited_by.username', read_only=True, allow_null=True)

    class Meta:
        model = OrganizationMember
        fields = [
            'id', 'organization', 'organization_name',
            'user', 'user_details', 'role', 'is_active',
            'invited_by', 'invited_by_username', 'joined_at'
        ]
        read_only_fields = ['joined_at', 'invited_by']


class InviteMemberSerializer(serializers.Serializer):
    """Payload for inviting a new member"""
    email = serializers.EmailField()
    role = serializers.ChoiceField(choices=OrganizationMember.ROLE_CHOICES)

    def validate_role(self, value):
        # Prevent inviting as owner (only one owner per org)
        if value == 'owner':
            raise serializers.ValidationError("Cannot invite members as owner. Transfer ownership instead.")
        return value


class EventTeamMemberSerializer(serializers.ModelSerializer):
    """Per-event team assignment"""
    member_details = OrganizationMemberSerializer(source='member', read_only=True)
    event_name = serializers.CharField(source='event.eventName', read_only=True)
    assigned_by_username = serializers.CharField(source='assigned_by.username', read_only=True, allow_null=True)

    class Meta:
        model = EventTeamMember
        fields = [
            'id', 'event', 'event_name', 'member', 'member_details',
            'role', 'assigned_at', 'assigned_by', 'assigned_by_username'
        ]
        read_only_fields = ['assigned_at', 'assigned_by']
