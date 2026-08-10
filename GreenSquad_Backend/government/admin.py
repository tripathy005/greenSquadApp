from django.contrib import admin

from .models import SuperintendentProfile


@admin.register(SuperintendentProfile)
class SuperintendentProfileAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "employee_id",
    )