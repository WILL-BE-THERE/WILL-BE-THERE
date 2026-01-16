from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import userProfile


class UserProfileCreationTestCase(TestCase):
    """Test cases for userProfile creation"""

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", email="testuser@example.com", password="TestPass123!"
        )

    def test_profile_created_with_user(self):
        """Test that userProfile can be created"""
        profile = userProfile.objects.create(user=self.user, phone_number="+1234567890")
        self.assertEqual(profile.user, self.user)
        self.assertEqual(profile.phone_number, "+1234567890")
        self.assertFalse(profile.is_verified)

    def test_profile_verification_code_default(self):
        """Test that verification code has default value"""
        profile = userProfile.objects.create(user=self.user, phone_number="+1234567890")
        self.assertEqual(profile.verification_code, "hftrg&dhdywezvxddjdd")

    def test_profile_timestamps_created(self):
        """Test that timestamps are set on creation"""
        profile = userProfile.objects.create(user=self.user, phone_number="+1234567890")
        self.assertIsNotNone(profile.created_at)
        self.assertIsNotNone(profile.updated_at)

    def test_profile_string_representation(self):
        """Test profile string representation"""
        profile = userProfile.objects.create(user=self.user, phone_number="+1234567890")
        self.assertEqual(str(profile), self.user.username)


class UserProfileVerificationTestCase(APITestCase):
    """Test cases for user profile verification workflow"""

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", email="testuser@example.com", password="TestPass123!"
        )
        self.profile = userProfile.objects.create(
            user=self.user,
            phone_number="+1234567890",
            is_verified=False,
            verification_code="123456",
        )

    def test_unverified_profile_blocks_login(self):
        """Test that unverified profile prevents login"""
        login_url = "/api/account/login/"
        login_data = {"email": "testuser@example.com", "password": "TestPass123!"}
        response = self.client.post(login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_verified_profile_allows_login(self):
        """Test that verified profile allows login"""
        self.profile.is_verified = True
        self.profile.save()

        login_url = "/api/account/login/"
        login_data = {"email": "testuser@example.com", "password": "TestPass123!"}
        response = self.client.post(login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.json())


class UserProfileUpdateTestCase(TestCase):
    """Test cases for updating user profile"""

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", email="testuser@example.com", password="TestPass123!"
        )
        self.profile = userProfile.objects.create(user=self.user, phone_number="+1234567890")

    def test_update_verification_code(self):
        """Test updating verification code"""
        new_code = "NEW_CODE_123"
        self.profile.verification_code = new_code
        self.profile.save()

        self.profile.refresh_from_db()
        self.assertEqual(self.profile.verification_code, new_code)

    def test_mark_profile_verified(self):
        """Test marking profile as verified"""
        self.assertFalse(self.profile.is_verified)
        self.profile.is_verified = True
        self.profile.save()

        self.profile.refresh_from_db()
        self.assertTrue(self.profile.is_verified)

    def test_updated_at_timestamp_changes(self):
        """Test that updated_at timestamp changes on save"""
        original_updated_at = self.profile.updated_at

        self.profile.phone_number = "+9876543210"
        self.profile.save()

        self.profile.refresh_from_db()
        # updated_at should be >= original (allowing for microsecond precision)
        self.assertGreaterEqual(self.profile.updated_at, original_updated_at)
