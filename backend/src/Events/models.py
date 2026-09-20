import uuid

from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Event(models.Model):
    "model for creating events"

    # NEW: Organization-based ownership (multi-tenant)
    organization = models.ForeignKey(
        'Organizations.Organization',
        on_delete=models.CASCADE,
        related_name="events",
        null=True,  # Temporarily nullable for migration
        blank=True,
        help_text="Organization that owns this event"
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_events",
        help_text="User who created this event (for audit trail)"
    )

    # DEPRECATED: Keep for backward compatibility during migration
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="events_legacy",
        null=True,
        blank=True,
        help_text="DEPRECATED: Use organization instead"
    )

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

    # Pricing fields (Deprecated - moving to TicketType)
    is_paid = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default="GHS")
    inclusions = models.TextField(blank=True, null=True, help_text="What the cost covers")
    is_redeemable = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when event was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when event was last updated")

    def __str__(self):
        return self.eventName


class TicketType(models.Model):
    """Model for different types of tickets (e.g., VIP, Regular, Early Bird)"""

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="ticket_types")
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default="GHS")
    quantity = models.PositiveIntegerField(help_text="Total number of tickets available for this type")
    sold = models.PositiveIntegerField(default=0, help_text="Number of tickets sold")
    sale_start_date = models.DateTimeField(null=True, blank=True)
    sale_end_date = models.DateTimeField(null=True, blank=True)

    def is_available(self):
        return self.sold < self.quantity

    def __str__(self):
        return f"{self.name} - {self.event.eventName}"


class RSVP(models.Model):
    "model for event RSVPs"

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="rsvps")
    ticket_type = models.ForeignKey(TicketType, on_delete=models.SET_NULL, null=True, blank=True, related_name="rsvps")
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
        choices=[("Pending", "Pending"), ("Paid", "Paid"), ("Refunded", "Refunded"), ("Cancelled", "Cancelled"), ("N/A", "Not Applicable")],
    )
    stripe_payment_intent = models.CharField(max_length=255, blank=True, null=True)
    mpesa_receipt_number = models.CharField(max_length=50, blank=True, null=True)
    checkout_request_id = models.CharField(max_length=100, blank=True, null=True)
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
