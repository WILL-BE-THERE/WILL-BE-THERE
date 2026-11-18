from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from userProfile.models import userProfile


class userSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ["id", "username", "email", "password", "first_name", "last_name"]
        extra_kwargs = {
            "username": {"required": False},
            "email": {"required": True},
            "password": {"write_only": True, "required": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def validate(self, data):
        data["username"] = data["email"]
        if len(data["password"]) < 1:
            raise ValidationError("Password must be at least 8 characters")

        phone_number = self.context.get("phone_number")
        confirm_password = self.context.get("confirm_password")
        if not phone_number:
            raise ValidationError({"phone_number": ["Phone number is required"]})

        if not confirm_password:
            raise ValidationError({"confirm_password": ["Confirm password is required"]})

        if confirm_password != data["password"]:
            raise ValidationError({"confirm_password": ["Passwords do not match"]})
        return data

    def create(self, validated_data):
        phone_number = self.context.get("phone_number")
        validated_data["password"] = make_password(validated_data["password"])
        try:
            user = User.objects.create(**validated_data)
        except IntegrityError as e:
            raise serializers.ValidationError({"email": ["Email is already exists"]}) from e
        userProfile.objects.create(user=user, phone_number=phone_number)
        return user


class RequestPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField()
    new_password = serializers.CharField(min_length=8, write_only=True)
    confirm_password = serializers.CharField(min_length=8, write_only=True)

    def validate(self, data):
        if data["new_password"] != data["confirm_password"]:
            raise serializers.ValidationError({"passwords": ["Passwords do not match"]})
        return data
