from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Post(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posts"
    )

    description = models.TextField(blank=True)

    location = models.CharField(max_length=255)

    area = models.ForeignKey(
    "areas.Area",
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name="posts"
    )

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

    waste_type = models.CharField(
    max_length=100,
    null=True,
    blank=True
    )

    ai_confidence = models.DecimalField(
    max_digits=5,
    decimal_places=2,
    null=True,
    blank=True
    )


    waste_volume = models.CharField(
    max_length=10,
    choices=(
        ("small", "Small"),
        ("medium", "Medium"),
        ("large", "Large"),
    ),
    null=True,
    blank=True
    )

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

    credit_points = models.DecimalField(
    max_digits=4,
    decimal_places=1,
    null=True,
    blank=True,
    validators=[
        MinValueValidator(0),
        MaxValueValidator(10),
    ]
    )

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


class PostLike(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="post_likes"
    )

    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="likes"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "post"],
                name="unique_user_post_like"
            )
        ]

    def __str__(self):
        return f"{self.user.username} liked Post {self.post.id}"