from rest_framework import serializers
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from userProfile.models import userProfile
from rest_framework.exceptions import ValidationError


class userSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            "username": {"required": False},
            "email": {"required": True},
            "password": {"write_only": True, "required": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def validate(self, data):
        data['username'] = data['email']
        if len(data['password']) < 1:
            raise ValidationError("Password must be at least 8 characters")
        
        phone_number = self.context.get('phone_number')
        confirm_password = self.context.get('confirm_password')
        if not phone_number:
            raise ValidationError({'phone_number': ['phone Number is required']})
        
        if not confirm_password:
             raise ValidationError({'confirm_Password': ['Confirm Password is required']})
        
        if confirm_password != data['password']:
            raise ValidationError({'passwords':['passwords do not match']})
        return data
    
    def create(self, validated_data):
        phone_number = self.context.get('phone_number')
        validated_data['password'] = make_password(validated_data['password'])
        try:
            user = User.objects.create(**validated_data)
        except IntegrityError:
            raise serializers.ValidationError({'email': ['Email is already exists']})
        userProfile.objects.create(user=user, phone_number=phone_number)
        return user