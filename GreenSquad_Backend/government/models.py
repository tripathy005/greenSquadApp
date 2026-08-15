from django.conf import settings
from django.db import models


class SuperintendentProfile(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="superintendentprofile"
    )

    employee_id = models.CharField(
        max_length=50,
        unique=True
    )

    def __str__(self):
        return f"{self.user.full_name} - {self.employee_id}"