from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ("citizen", "Citizen"),
        ("officer", "Officer"),
        ("superintendent", "Superintendent"),
        ("admin", "Admin"),
    )

    # Remove Django's default name fields
    first_name = None
    last_name = None

    full_name = models.CharField(
        max_length=150
    )

    username = models.CharField(
        max_length=50,
        unique=True
    )

    email = models.EmailField(
        unique=True
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="citizen"
    )

    profile_photo = models.ImageField(
        upload_to="profile_photos/",
        blank=True,
        null=True
    )

    REQUIRED_FIELDS = [
        "email",
        "full_name"
    ]

    def __str__(self):
        return self.username
