from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Event(models.Model):
    "model for creating events"
    username = models.CharField(max_length=200, default='will be gotten from request.user')
    picture =  models.ImageField(upload_to='events')
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

    def __str__(self):
        return self.eventName