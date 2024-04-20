from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class userProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=200)
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=50, editable=False, default='hftrg&dhdywezvxddjdd')

    def __str__(self) -> str:
        return self.user.username
