from rest_framework import serializers
from .models import Post, PostMedia
from areas.models import Area
from government.utils import (
    find_area_for_location,
    find_duplicate_post,
)


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

    like_count = serializers.IntegerField(
    source="likes.count",
    read_only=True
    )

    image = serializers.ImageField(write_only=True)

    action = serializers.ChoiceField(
    choices=Post.ACTION_CHOICES,
    required=True
    )

    media = PostMediaSerializer(many=True,read_only=True)

    area = serializers.PrimaryKeyRelatedField(
    read_only=True
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "description",
            "location",
            "latitude",
            "longitude",
            "area",
            "action",
            "image",
            "media",
            "posted_at",
            "ai_verified",
            "is_duplicate",
            "is_resolved",
            "credit_points",
            "like_count",
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

        latitude = validated_data["latitude"]
        longitude = validated_data["longitude"]

        areas = Area.objects.all()

        area = find_area_for_location(
            latitude,
            longitude,
            areas
        )

        post = Post.objects.create(
            user=user,
            area=area,
            **validated_data
        )

        PostMedia.objects.create(
            post=post,
            image=image,
            media_type="original"
        )

        if area:

            duplicate_post = find_duplicate_post(
                post,
                area
            )

            if duplicate_post:

                post.is_duplicate = True

                post.save(
                    update_fields=["is_duplicate"]
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



        