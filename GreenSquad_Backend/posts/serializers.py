from rest_framework import serializers

from .models import Post, PostMedia


class PostMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostMedia
        fields = [
            "id",
            "image",
            "media_type",
            "uploaded_at",
        ]


class PostSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(write_only=True)

    action = serializers.ChoiceField(
    choices=Post.ACTION_CHOICES,
    required=True
    )

    media = PostMediaSerializer(many=True,read_only=True)

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
            "media",
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

class CleanupImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostMedia
        fields = ["image"]

    def create(self, validated_data):

        post = self.context["post"]

        return PostMedia.objects.create(
            post=post,
            image=validated_data["image"],
            media_type="cleanup"
        )



        