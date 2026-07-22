from datetime import date, timedelta

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from Events.models import Event
from userProfile.models import userProfile


class EventCreateTestCase(APITestCase):
    """Test cases for event creation"""

    def setUp(self):
        self.event_create_url = "/api/events/event/"

        # Create authenticated user
        self.user = User.objects.create_user(
            username="eventuser", email="eventuser@example.com", password="TestPass123!"
        )
        self.profile = userProfile.objects.create(user=self.user, phone_number="+1234567890", is_verified=True)
        self.token = Token.objects.create(user=self.user)

        # Prepare event data
        self.tomorrow = (date.today() + timedelta(days=1)).isoformat()
        self.next_week = (date.today() + timedelta(days=7)).isoformat()
        self.valid_event_data = {
            "eventName": "Test Event",
            "generalInfo": "This is a test event",
            "dateOfEvent": self.next_week,
            "eventClosingDate": self.tomorrow,
            "time": "14:00",
            "country": "USA",
            "state": "California",
            "city": "San Francisco",
            "street": "123 Main St",
            "instagram": "https://instagram.com/test",
            "facebook": "https://facebook.com/test",
            "twitter": "https://twitter.com/test",
            "linkedIn": "https://linkedin.com/in/test",
            "congratulatoryMessage": "Thanks for coming!",
        }

    def test_create_event_authenticated(self):
        """Test creating event as authenticated user"""
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response = self.client.post(self.event_create_url, data=self.valid_event_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), 1)
        event = Event.objects.first()
        self.assertEqual(event.user, self.user)
        self.assertEqual(event.eventName, "Test Event")

    def test_create_event_unauthenticated(self):
        """Test creating event without authentication"""
        response = self.client.post(self.event_create_url, data=self.valid_event_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_event_missing_required_fields(self):
        """Test creating event with missing required fields"""
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        incomplete_data = {"eventName": "Test Event"}
        response = self.client.post(self.event_create_url, data=incomplete_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class EventListTestCase(APITestCase):
    """Test cases for listing events"""

    def setUp(self):
        self.event_list_url = "/api/events/event/"

        # Create two users with events
        self.user1 = User.objects.create_user(username="user1", email="user1@example.com", password="TestPass123!")
        self.profile1 = userProfile.objects.create(user=self.user1, phone_number="+1111111111", is_verified=True)
        self.token1 = Token.objects.create(user=self.user1)

        self.user2 = User.objects.create_user(username="user2", email="user2@example.com", password="TestPass123!")
        self.profile2 = userProfile.objects.create(user=self.user2, phone_number="+2222222222", is_verified=True)
        self.token2 = Token.objects.create(user=self.user2)

        # Create events
        tomorrow = date.today() + timedelta(days=1)
        next_week = date.today() + timedelta(days=7)

        self.event1 = Event.objects.create(
            user=self.user1,
            eventName="User1 Event",
            generalInfo="Test event 1",
            dateOfEvent=next_week,
            eventClosingDate=tomorrow,
            time="14:00",
            country="USA",
            state="CA",
            city="SF",
            street="123 Main",
        )

        self.event2 = Event.objects.create(
            user=self.user2,
            eventName="User2 Event",
            generalInfo="Test event 2",
            dateOfEvent=next_week,
            eventClosingDate=tomorrow,
            time="15:00",
            country="USA",
            state="NY",
            city="NYC",
            street="456 Park",
        )

    def test_list_events_all_visible(self):
        """Test that all events are visible to authenticated users"""
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token1.key}")
        response = self.client.get(self.event_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_list_events_unauthenticated(self):
        """Test listing events without authentication"""
        response = self.client.get(self.event_list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class EventPermissionsTestCase(APITestCase):
    """Test cases for event-level permissions"""

    def setUp(self):
        # Create two users
        self.owner_user = User.objects.create_user(username="owner", email="owner@example.com", password="TestPass123!")
        self.owner_profile = userProfile.objects.create(
            user=self.owner_user, phone_number="+1111111111", is_verified=True
        )
        self.owner_token = Token.objects.create(user=self.owner_user)

        self.other_user = User.objects.create_user(username="other", email="other@example.com", password="TestPass123!")
        self.other_profile = userProfile.objects.create(
            user=self.other_user, phone_number="+2222222222", is_verified=True
        )
        self.other_token = Token.objects.create(user=self.other_user)

        # Create event
        tomorrow = date.today() + timedelta(days=1)
        next_week = date.today() + timedelta(days=7)
        self.event = Event.objects.create(
            user=self.owner_user,
            eventName="Owner Event",
            generalInfo="Test event",
            dateOfEvent=next_week,
            eventClosingDate=tomorrow,
            time="14:00",
            country="USA",
            state="CA",
            city="SF",
            street="123 Main",
        )

    def test_owner_can_update_event(self):
        """Test that event owner can update their event"""
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.owner_token.key}")
        update_url = f"/api/events/event/{self.event.id}/"
        update_data = {"eventName": "Updated Event Name"}
        response = self.client.patch(update_url, data=update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.event.refresh_from_db()
        self.assertEqual(self.event.eventName, "Updated Event Name")

    def test_non_owner_cannot_update_event(self):
        """Test that non-owner cannot update event"""
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.other_token.key}")
        update_url = f"/api/events/event/{self.event.id}/"
        update_data = {"eventName": "Hacked Event Name"}
        response = self.client.patch(update_url, data=update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_owner_can_delete_event(self):
        """Test that event owner can delete their event"""
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.owner_token.key}")
        delete_url = f"/api/events/event/{self.event.id}/"
        response = self.client.delete(delete_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Event.objects.filter(id=self.event.id).exists())

    def test_non_owner_cannot_delete_event(self):
        """Test that non-owner cannot delete event"""
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.other_token.key}")
        delete_url = f"/api/events/event/{self.event.id}/"
        response = self.client.delete(delete_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(Event.objects.filter(id=self.event.id).exists())
