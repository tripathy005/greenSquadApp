from rest_framework import serializers

from posts.models import Post


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