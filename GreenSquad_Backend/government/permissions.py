from rest_framework.permissions import BasePermission


class IsSuperintendent(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "superintendent"
        )


class IsOfficerOrAdmin(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role in ["officer", "admin"]
        )