from rest_framework import serializers
from .models import User


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