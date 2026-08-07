from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = (
        "id",
        "username",
        "full_name",
        "email",
        "role",
    )

    fieldsets = UserAdmin.fieldsets + (
        (
            "GreenSquad",
            {
                "fields": (
                    "full_name",
                    "role",
                    "profile_photo",
                )
            },
        ),
    )