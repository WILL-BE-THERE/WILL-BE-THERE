"""
Custom permission classes for Events app.
"""

from rest_framework import permissions


class IsEventOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an event to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the event
        return obj.user == request.user
