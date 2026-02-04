from rest_framework.permissions import BasePermission


class IsOrganizationMember(BasePermission):
    """
    Permission check: User must be an active member of the organization.
    Works with objects that have an 'organization' attribute.
    """
    
    def has_object_permission(self, request, view, obj):
        # Get the organization from the object
        organization = getattr(obj, 'organization', None)
        if not organization:
            return False
        
        # Check if user is an active member
        return organization.members.filter(
            user=request.user,
            is_active=True
        ).exists()


class CanManageEvent(BasePermission):
    """
    Permission check: User must have admin or owner role for the event's organization.
    """
    
    def has_object_permission(self, request, view, obj):
        # Get the organization from the event
        organization = getattr(obj, 'organization', None)
        if not organization:
            return False
        
        # Check if user has management permissions
        member = organization.members.filter(
            user=request.user,
            is_active=True
        ).first()
        
        return member and member.can_manage_events()


class CanViewFinances(BasePermission):
    """
    Permission check: User must have finance access (owner, admin, or finance role).
    """
    
    def has_object_permission(self, request, view, obj):
        organization = getattr(obj, 'organization', None)
        if not organization:
            return False
        
        member = organization.members.filter(
            user=request.user,
            is_active=True
        ).first()
        
        return member and member.can_view_finances()


class CanCheckIn(BasePermission):
    """
    Permission check: User must have check-in permissions (staff or higher).
    """
    
    def has_object_permission(self, request, view, obj):
        # For Event objects
        organization = getattr(obj, 'organization', None)
        
        # For RSVP objects, get organization through event
        if not organization and hasattr(obj, 'event'):
            organization = obj.event.organization
        
        if not organization:
            return False
        
        member = organization.members.filter(
            user=request.user,
            is_active=True
        ).first()
        
        return member and member.can_check_in()


class IsOrganizationOwner(BasePermission):
    """
    Permission check: User must be the owner of the organization.
    """
    
    def has_object_permission(self, request, view, obj):
        organization = getattr(obj, 'organization', None)
        if not organization:
            # If obj IS the organization
            organization = obj if hasattr(obj, 'owner') else None
        
        if not organization:
            return False
        
        return organization.owner == request.user
