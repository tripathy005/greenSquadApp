from rest_framework import serializers

from posts.models import Post, PostMedia
from authentication.models import User

from authentication.models import User


class GovernmentPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post

        fields = [
            "id",
            "description",
            "location",
            "latitude",
            "longitude",
            "action",
            "posted_at",
            "is_resolved",
        ]


class GovernmentCleanupSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostMedia
        fields = [
            "image",
        ]

    def create(self, validated_data):

        post = self.context["post"]

        return PostMedia.objects.create(
            post=post,
            image=validated_data["image"],
            media_type="cleanup"
        )

class SuperintendentSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "full_name",
            "email",
            "profile_photo",
            "role",
        ]
        read_only_fields = [
            "id",
            "role",
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            role="superintendent",
            **validated_data
        )

        return user