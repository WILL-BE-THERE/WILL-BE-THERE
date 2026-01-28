import uuid

from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Event(models.Model):
    "model for creating events"

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events")
    picture = models.ImageField(upload_to="events")
    eventName = models.CharField(max_length=200)
    generalInfo = models.TextField()
    dateOfEvent = models.DateField()
    eventClosingDate = models.DateField()
    time = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
    instagram = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    linkedIn = models.URLField(blank=True, null=True)
    congratulatoryMessage = models.TextField(blank=True, null=True)

    # Pricing fields
    is_paid = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default="GHS")
    inclusions = models.TextField(blank=True, null=True, help_text="What the cost covers")
    is_redeemable = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when event was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when event was last updated")

    def __str__(self):
        return self.eventName


class RSVP(models.Model):
    "model for event RSVPs"

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="rsvps")
    guestName = models.CharField(max_length=200)
    guestEmail = models.EmailField()
    isAttending = models.CharField(max_length=10, default="Yes")
    isFriendsComing = models.CharField(max_length=10, default="No")
    message = models.TextField(blank=True, null=True)

    # Verification & Payment fields
    rsvp_token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    payment_status = models.CharField(
        max_length=20,
        default="Pending",
        choices=[("Pending", "Pending"), ("Paid", "Paid"), ("Refunded", "Refunded"), ("N/A", "Not Applicable")],
    )
    checked_in = models.BooleanField(default=False)
    parent_rsvp = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True, related_name="plus_ones")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.guestName} - {self.event.eventName}"


class Announcement(models.Model):
    """model for event-specific announcements"""

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="announcements")
    message = models.TextField()
    is_sent_as_email = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Announcement for {self.event.eventName} at {self.created_at}"
