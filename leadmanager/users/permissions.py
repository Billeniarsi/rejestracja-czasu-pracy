from rest_framework import permissions


class IsStaffMember(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff


class IsStaffMemberOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return user.is_staff


