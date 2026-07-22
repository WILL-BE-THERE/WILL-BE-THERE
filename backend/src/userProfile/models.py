from django.contrib.auth.models import User
from django.db import models
from fernet_fields import EncryptedCharField


# Create your models here.
class userProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = EncryptedCharField(max_length=200)
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=50, editable=False, default="hftrg&dhdywezvxddjdd")
    reset_password_code = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when profile was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when profile was last updated")

    def __str__(self) -> str:
        return str(self.user.username)
