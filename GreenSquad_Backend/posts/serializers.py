from rest_framework import serializers
from .utils import find_matching_area
from government.utils import find_duplicate_post
from .models import Post, PostMedia, DuplicatePost
from areas.models import Area
from django.contrib.auth import get_user_model
User = get_user_model()


class PostMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostMedia
        fields = [
            "id",
            "image",
            "media_type",
            "uploaded_at",
        ]

class AreaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Area
        fields = [
            "id",
            "name",
        ]

class PostUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "full_name",
            "profile_photo",
        ]


class PostSerializer(serializers.ModelSerializer):

    user = PostUserSerializer(
    read_only=True
    )

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

    area = AreaSerializer(
    read_only=True
    )

    area_name = serializers.CharField(
    write_only=True,
    required=False
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "description",
            "location",
            "latitude",
            "longitude",
            "area",
            "area_name",
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

        validated_data.pop(
            "area_name",
            None
        )

        user = self.context["request"].user

        latitude = validated_data.get("latitude")
        longitude = validated_data.get("longitude")

        area = find_matching_area(
            latitude,
            longitude
        )

        post = Post.objects.create(
            user=user,
            area=area,
            **validated_data
        )

        # Save original post image
        PostMedia.objects.create(
            post=post,
            image=image,
            media_type="original"
        )

        # Check duplicate after Post is created
        duplicate_post = find_duplicate_post(
            post,
            area
        )

        if duplicate_post:
            post.is_duplicate = True
            post.save(
                update_fields=["is_duplicate"]
            )

            DuplicatePost.objects.create(
                post=post,
                duplicate_of=duplicate_post
            )

        return post

class SuperintendentPostSerializer(serializers.ModelSerializer):

    user = PostUserSerializer(
    read_only=True
    )

    like_count = serializers.IntegerField(
        source="likes.count",
        read_only=True
    )

    media = PostMediaSerializer(
        many=True,
        read_only=True
    )

    area = AreaSerializer(
        read_only=True
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "description",
            "location",
            "latitude",
            "longitude",
            "area",
            "action",
            "media",
            "posted_at",
            "is_resolved",
            "credit_points",
            "like_count",
        ]
    
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



        