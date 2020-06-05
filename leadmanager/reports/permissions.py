from rest_framework import permissions


class IsReportSender(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if request.method in permissions.SAFE_METHODS and user.is_staff:
            return True
        elif obj.is_accepted is True and request.method not in permissions.SAFE_METHODS:
            return False
        else:
            return request.user == obj.employee


class ReportNotAccepted(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return not obj.is_accepted


class IsSelfOrStaffMember(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.id == view.kwargs['user_id'] or request.user.is_staff


