from rest_framework import serializers

from .models import Post, PostMedia


class PostSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(write_only=True)

    action = serializers.ChoiceField(
    choices=Post.ACTION_CHOICES,
    required=True
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "description",
            "location",
            "latitude",
            "longitude",
            "action",
            "image",
            "posted_at",
            "ai_verified",
            "is_duplicate",
            "is_resolved",
            "credit_points",
        ]

        read_only_fields = [
            "id",
            "posted_at",
            "ai_verified",
            "is_duplicate",
            "is_resolved",
            "credit_points",
        ]

    def create(self, validated_data):

        image = validated_data.pop("image")

        user = self.context["request"].user

        post = Post.objects.create(
            user=user,
            **validated_data
        )

        PostMedia.objects.create(
            post=post,
            image=image,
            media_type="original"
        )

        return post