from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from government.models import SuperintendentProfile


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "full_name",
            "username",
            "email",
            "password",
            "role",
        )

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user

class ProfileUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "full_name",
            "email",
            "profile_photo",
        ]

    def validate(self, attrs):

        user = self.context["request"].user

        # Superintendent cannot update any profile field
        if user.role == "superintendent":
            raise serializers.ValidationError(
                {
                    "detail": "Superintendent profile cannot be modified."
                }
            )

        allowed_fields = {
            "full_name",
            "email",
            "profile_photo",
        }

        submitted_fields = set(self.initial_data.keys())

        unknown_fields = submitted_fields - allowed_fields

        if unknown_fields:
            raise serializers.ValidationError(
                {
                    "detail": (
                        "These fields cannot be updated: "
                        + ", ".join(sorted(unknown_fields))
                    )
                }
            )

        return attrs

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "username",
            "full_name",
            "email",
            "profile_photo",
            "role",
        ]

        read_only_fields = [
            "username",
            "full_name",
            "email",
            "profile_photo",
            "role",
        ]

    def to_representation(self, instance):

        data = super().to_representation(instance)

        if instance.role == "superintendent":
            try:
                data["employee_id"] = (
                    instance.superintendent_profile.employee_id
                )
            except SuperintendentProfile.DoesNotExist:
                data["employee_id"] = None

        return data

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "full_name": self.user.full_name,
            "email": self.user.email,
            "role": self.user.role,
            "profile_photo": (
                self.user.profile_photo.url
                if self.user.profile_photo
                else None
            ),
        }

        if self.user.role == "superintendent":
            try:
                data["user"]["employee_id"] = (
                    self.user.superintendent_profile.employee_id
                )
            except SuperintendentProfile.DoesNotExist:
                data["user"]["employee_id"] = None

        return data