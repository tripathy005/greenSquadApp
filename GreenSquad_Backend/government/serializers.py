from rest_framework import serializers

from posts.models import Post, PostMedia


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