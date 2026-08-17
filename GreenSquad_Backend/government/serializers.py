from rest_framework import serializers

from posts.models import Post, PostMedia
from authentication.models import User


from django.contrib.auth import get_user_model
from .models import SuperintendentProfile
from areas.models import Area


class GovernmentAreaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Area
        fields = [
            "id",
            "name",
        ]


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

    id = serializers.SerializerMethodField()

    employee_id = serializers.SerializerMethodField()

    password = serializers.CharField(
        write_only=True,
        required=True
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "full_name",
            "email",
            "password",
            "profile_photo",
            "role",
            "is_active",
            "employee_id",
        ]

        read_only_fields = [
            "id",
            "role",
            "employee_id",
        ]

    def get_id(self, obj):
        try:
            return obj.superintendentprofile.id
        except SuperintendentProfile.DoesNotExist:
            return None
        
    def get_employee_id(self, obj):
        try:
            return obj.superintendentprofile.employee_id
        except SuperintendentProfile.DoesNotExist:
            return None

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            role="superintendent",
            **validated_data
        )

        return user


class SuperintendentAreaSerializer(serializers.Serializer):

    area_ids = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=True
    )

User = get_user_model()

class SuperintendentCreateSerializer(serializers.Serializer):

    full_name = serializers.CharField(
        max_length=255
    )

    email = serializers.EmailField()

    username = serializers.CharField(
        max_length=150
    )

    employee_id = serializers.RegexField(
    regex=r"^SUP\d{3}$",
    max_length=6,
    error_messages={
        "invalid": "Employee ID must be in format SUP001, SUP002, SUP003, etc."
    }
)

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password": "Passwords do not match."
            })

        if User.objects.filter(
            username=attrs["username"]
        ).exists():
            raise serializers.ValidationError({
                "username": "Username already exists."
            })

        if User.objects.filter(
            email=attrs["email"]
        ).exists():
            raise serializers.ValidationError({
                "email": "Email already exists."
            })

        if SuperintendentProfile.objects.filter(employee_id=attrs["employee_id"]).exists():
            raise serializers.ValidationError({
            "employee_id": "This Employee ID already exists."
        })

        return attrs


class SuperintendentUpdateSerializer(serializers.Serializer):

    full_name = serializers.CharField(
        max_length=255,
        required=False
    )

    email = serializers.EmailField(
        required=False
    )

    username = serializers.CharField(
        max_length=150,
        required=False
    )

    employee_id = serializers.RegexField(
        regex=r"^SUP\d{3}$",
        max_length=6,
        required=False,
        error_messages={
            "invalid": "Employee ID must be in format SUP001, SUP002, SUP003, etc."
        }
    )

    def update(self, instance, validated_data):

        user = instance.user

        if "full_name" in validated_data:
            user.full_name = validated_data["full_name"]

        if "email" in validated_data:
            user.email = validated_data["email"]

        if "username" in validated_data:
            user.username = validated_data["username"]

        user.save()

        if "employee_id" in validated_data:
            instance.employee_id = validated_data["employee_id"]
            instance.save()

        return instance

    def validate(self, attrs):

        superintendent = self.instance
        user = superintendent.user

        if "employee_id" in attrs:
            if SuperintendentProfile.objects.filter(
                employee_id=attrs["employee_id"]
            ).exclude(
                id=superintendent.id
            ).exists():
                raise serializers.ValidationError({
                    "employee_id": "This Employee ID already exists."
                })

        if "username" in attrs:
            if User.objects.filter(
                username=attrs["username"]
            ).exclude(
                id=user.id
            ).exists():
                raise serializers.ValidationError({
                    "username": "This username already exists."
                })

        if "email" in attrs:
            if User.objects.filter(
                email=attrs["email"]
            ).exclude(
                id=user.id
            ).exists():
                raise serializers.ValidationError({
                    "email": "This email already exists."
                })

        return attrs

class SuperintendentDeactivateSerializer(serializers.Serializer):

    is_active = serializers.BooleanField()

    def update(self, instance, validated_data):

        user = instance.user

        user.is_active = validated_data["is_active"]

        user.save(update_fields=["is_active"])

        return instance

    def to_representation(self, instance):

        return {
            "id": instance.id,
            "employee_id": instance.employee_id,
            "is_active": instance.user.is_active,
        }