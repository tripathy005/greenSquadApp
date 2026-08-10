from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    model = User

    list_display = (
        "id",
        "username",
        "full_name",
        "email",
        "role",
    )

    fieldsets = (
        (None, {
            "fields": (
                "username",
                "password",
            )
        }),

        ("Personal Information", {
            "fields": (
                "full_name",
                "email",
                "profile_photo",
            )
        }),

        ("Role", {
            "fields": (
                "role",
            )
        }),

        ("Permissions", {
            "fields": (
                "is_staff",
                "is_superuser",
                "groups",
                "user_permissions",
            )
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "username",
                "full_name",
                "email",
                "profile_photo",
                "role",
                "password1",
                "password2",
            ),
        }),
    )

    search_fields = (
        "username",
        "full_name",
        "email",
    )

    ordering = ("id",)