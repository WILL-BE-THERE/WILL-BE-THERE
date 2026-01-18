import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from userProfile.models import userProfile


@pytest.mark.django_db
class TestAuthViews:
    def setup_method(self):
        self.client = APIClient()
        self.login_url = reverse("login")
        self.signup_url = reverse("signUp")

    def test_superuser_login_creates_profile(self):
        # Create superuser without profile
        user = User.objects.create_superuser(username="testadmin", email="admin@example.com", password="Password123!")

        # Verify no profile exists yet
        assert not userProfile.objects.filter(user=user).exists()

        # Attempt login
        response = self.client.post(
            self.login_url,
            {"email": "admin@example.com", "password": "Password123!"},
            format="json",
        )

        # Should succeed and create profile
        assert response.status_code == status.HTTP_200_OK
        assert "access" in response.data
        assert userProfile.objects.filter(user=user).exists()
        assert userProfile.objects.get(user=user).is_verified is True

    def test_invalid_login(self):
        response = self.client.post(
            self.login_url,
            {"email": "wrong@example.com", "password": "wrongpassword"},
            format="json",
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
