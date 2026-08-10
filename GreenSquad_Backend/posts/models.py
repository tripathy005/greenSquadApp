from django.conf import settings
from django.db import models


class Post(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posts"
    )

    description = models.TextField(blank=True)

    location = models.CharField(max_length=255)

    latitude = models.DecimalField(
        max_digits=11,
        decimal_places=8
    )

    longitude = models.DecimalField(
        max_digits=11,
        decimal_places=8
    )

    posted_at = models.DateTimeField(
        auto_now_add=True
    )

    ai_verified = models.BooleanField(default=False)

    is_duplicate = models.BooleanField(default=False)

    ACTION_CHOICES = (
    ("self_resolve", "Self Resolve"),
    ("handover", "Hand Over to Authority"),
    )

    action = models.CharField(
    max_length=20,
    choices=ACTION_CHOICES,
    null=True,
    blank=True
    )

    is_resolved = models.BooleanField(default=False)

    credit_points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Post {self.id} - {self.user.username}"

    

class PostMedia(models.Model):

    MEDIA_TYPE_CHOICES = (
        ("original", "Original"),
        ("cleanup", "Cleanup"),
    )

    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="media"
    )

    image = models.ImageField(
        upload_to="posts/"
    )

    media_type = models.CharField(
        max_length=20,
        choices=MEDIA_TYPE_CHOICES
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.post.id} - {self.media_type}"

class DuplicatePost(models.Model):

    post = models.OneToOneField(
        Post,
        on_delete=models.CASCADE,
        related_name="duplicate_info"
    )

    duplicate_of = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="duplicate_posts"
    )

    detected_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Post {self.post.id} duplicates Post {self.duplicate_of.id}"