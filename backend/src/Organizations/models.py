from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify


class Organization(models.Model):
    """Multi-tenant organization (e.g., 'Acme Events Inc')"""

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=200)
    owner = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='owned_organizations',
        help_text="Primary owner who created this organization"
    )
    description = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    # Billing fields
    subscription_tier = models.CharField(
        max_length=20,
        default='free',
        choices=[
            ('free', 'Free'),
            ('starter', 'Starter'),
            ('professional', 'Professional'),
            ('enterprise', 'Enterprise'),
        ]
    )
    stripe_customer_id = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1

            # Ensure unique slug
            while Organization.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1

            self.slug = slug
        super().save(*args, **kwargs)


class OrganizationMember(models.Model):
    """Team member with role-based permissions"""

    ROLE_CHOICES = [
        ('owner', 'Owner'),
        ('admin', 'Admin'),
        ('finance', 'Finance'),
        ('marketing', 'Marketing'),
        ('staff', 'Staff'),
        ('volunteer', 'Volunteer'),
    ]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name='members'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='memberships'
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    invited_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='invitations_sent'
    )
    joined_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('organization', 'user')
        ordering = ['-joined_at']

    def __str__(self):
        return f"{self.user.username} - {self.role} at {self.organization.name}"

    def can_manage_events(self):
        """Check if member can create/edit events"""
        return self.role in ['owner', 'admin']

    def can_view_finances(self):
        """Check if member can view revenue data"""
        return self.role in ['owner', 'admin', 'finance']

    def can_check_in(self):
        """Check if member can check in guests"""
        return self.role in ['owner', 'admin', 'staff', 'volunteer']


class EventTeamMember(models.Model):
    """Per-event role assignment for granular permissions"""

    event = models.ForeignKey(
        'Events.Event',
        on_delete=models.CASCADE,
        related_name='team_members'
    )
    member = models.ForeignKey(
        OrganizationMember,
        on_delete=models.CASCADE,
        related_name='event_assignments'
    )
    role = models.CharField(
        max_length=20,
        choices=OrganizationMember.ROLE_CHOICES
    )
    assigned_at = models.DateTimeField(auto_now_add=True)
    assigned_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='team_assignments_made'
    )

    class Meta:
        unique_together = ('event', 'member')
        ordering = ['-assigned_at']

    def __str__(self):
        return f"{self.member.user.username} - {self.role} for {self.event.eventName}"
