from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    " serializer for events"
    class Meta:
        model = Event
        fields = '__all__'
    
    def create(self, validated_data):
        """ creating a new event"""
        username = self.context['username']
        validated_data['username'] = username
        return Event.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """ update an event given validated data"""
        instance.picture = validated_data.get('picture', instance.picture )
        instance.eventName = validated_data.get('eventName', instance.eventName)
        instance.generalInfo = validated_data.get('generalInfo', instance.generalInfo)
        instance.dateOfEvent = validated_data.get('dateOfEvent', instance.dateOfEvent)
        instance.eventClosingDate = validated_data.get('eventClosingDate', instance.eventClosingDate)
        instance.time = validated_data.get('time', instance.time)
        instance.country = validated_data.get('country', instance.country)
        instance.state = validated_data.get('state', instance.state)
        instance.city = validated_data.get('city', instance.city)
        instance.street = validated_data.get('street', instance.street)
        instance.instagram = validated_data.get('instagram', instance.instagram)
        instance.facebook = validated_data.get('facebook', instance.facebook)
        instance.twitter = validated_data.get('twitter', instance.twitter)
        instance.linkedIn = validated_data.get('linkedIn', instance.linkedIn)
        instance.congratulatoryMessage = validated_data.get('congratulatoryMessage', instance.congratulatoryMessage)