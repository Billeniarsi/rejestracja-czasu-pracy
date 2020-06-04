from rest_framework import permissions


class IsReportSender(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return obj.employee == user


class IsReportSenderOrStaffMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return obj.employee == user or user.is_staff


class ReportNotAccepted(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return not obj.is_accepted


class IsSelfOrStaffMember(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.id == view.kwargs['user_id'] or request.user.is_staff


