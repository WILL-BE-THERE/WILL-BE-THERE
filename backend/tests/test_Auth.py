import json

from django.contrib.auth.models import User
from django.test import Client
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from userProfile.models import userProfile


class UserSignUpTestCase(APITestCase):
    """Test cases for user signup endpoint"""

    def setUp(self):
        self.client = Client()
        self.signup_url = "/api/account/signup/"
        self.valid_signup_data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "TestPass123!",
            "confirm_password": "TestPass123!",
            "phone_number": "+1234567890",
        }

    def test_successful_signup(self):
        """Test successful user signup"""
        response = self.client.post(self.signup_url, self.valid_signup_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.json())
        self.assertIn("refresh", response.json())
        self.assertIn("user", response.json())
        self.assertIn("user", response.json())

        # Verify user was created in database
        self.assertTrue(User.objects.filter(username="testuser").exists())

    def test_signup_duplicate_username(self):
        """Test signup with duplicate username"""
        User.objects.create_user(username="testuser", email="existing@example.com", password="TestPass123!")
        response = self.client.post(self.signup_url, self.valid_signup_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_signup_password_mismatch(self):
        """Test signup with mismatched passwords"""
        data = self.valid_signup_data.copy()
        data["confirm_password"] = "DifferentPass123!"
        response = self.client.post(self.signup_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_signup_missing_required_fields(self):
        """Test signup with missing required fields"""
        incomplete_data = {"username": "testuser", "email": "test@example.com"}
        response = self.client.post(self.signup_url, incomplete_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_signup_creates_user_profile(self):
        """Test that signup creates a userProfile entry"""
        response = self.client.post(
            self.signup_url,
            data=json.dumps(self.valid_signup_data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username="testuser")
        self.assertTrue(userProfile.objects.filter(user=user).exists())


class UserLoginTestCase(APITestCase):
    """Test cases for user login endpoint"""

    def setUp(self):
        self.client = Client()
        self.login_url = "/api/account/login/"

        # Create a test user
        self.user = User.objects.create_user(username="testuser", email="testuser@example.com", password="TestPass123!")

        # Create associated profile and mark as verified
        self.profile = userProfile.objects.create(user=self.user, phone_number="+1234567890", is_verified=True)

        # Create token
        self.token = Token.objects.create(user=self.user)

    def test_successful_login(self):
        """Test successful login with verified email"""
        login_data = {"email": "testuser@example.com", "password": "TestPass123!"}
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.json())
        self.assertIn("refresh", response.json())
        self.assertIn("user", response.json())

    def test_login_unverified_email(self):
        """Test login fails with unverified email"""
        self.profile.is_verified = False
        self.profile.save()

        login_data = {"email": "testuser@example.com", "password": "TestPass123!"}
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_login_wrong_password(self):
        """Test login fails with wrong password"""
        login_data = {"email": "testuser@example.com", "password": "WrongPassword123!"}
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_nonexistent_user(self):
        """Test login with non-existent user"""
        login_data = {"email": "nonexistent@example.com", "password": "TestPass123!"}
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class EmailVerificationTestCase(APITestCase):
    """Test cases for email verification endpoint"""

    def setUp(self):
        self.client = Client()
        self.verify_url = "/api/account/verify/"

        # Create a test user
        self.user = User.objects.create_user(username="testuser", email="testuser@example.com", password="TestPass123!")

        # Create profile with verification code
        self.profile = userProfile.objects.create(
            user=self.user,
            phone_number="+1234567890",
            is_verified=False,
            verification_code="123456",
        )

    def test_successful_email_verification(self):
        """Test successful email verification"""
        verify_data = {"email": "testuser@example.com", "verification_code": "123456"}
        response = self.client.post(self.verify_url, verify_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify profile is now marked as verified
        self.profile.refresh_from_db()
        self.assertTrue(self.profile.is_verified)

    def test_verification_wrong_code(self):
        """Test verification with wrong code"""
        verify_data = {
            "email": "testuser@example.com",
            "verification_code": "wrong_code",
        }
        response = self.client.post(self.verify_url, verify_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_verification_with_distinct_username_and_email(self):
        """Test verification succeeds when username differs from email"""
        distinct_user = User.objects.create_user(
            username="different_username",
            email="different@example.com",
            password="TestPass123!",
        )
        userProfile.objects.create(
            user=distinct_user,
            phone_number="+1987654321",
            is_verified=False,
            verification_code="654321",
        )

        verify_data = {"email": "different@example.com", "verification_code": "654321"}
        response = self.client.post(self.verify_url, verify_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        verified_profile = userProfile.objects.get(user=distinct_user)
        self.assertTrue(verified_profile.is_verified)

    def test_verification_nonexistent_email(self):
        """Test verification with non-existent email"""
        verify_data = {
            "email": "nonexistent@example.com",
            "verification_code": "123456",
        }
        response = self.client.post(self.verify_url, verify_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class LogoutTestCase(APITestCase):
    """Test cases for logout endpoint"""

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username="testuser", email="testuser@example.com", password="TestPass123!")
        self.token = Token.objects.create(user=self.user)
        self.logout_url = "/api/account/logout/"

    def test_successful_logout(self):
        """Test successful logout with valid token"""
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response = self.client.post(self.logout_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify token was deleted
        self.assertFalse(Token.objects.filter(key=self.token.key).exists())

    def test_logout_unauthenticated(self):
        """Test logout without authentication"""
        response = self.client.post(self.logout_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
