from rest_framework import serializers

from .models import RSVP, Event


class EventSerializer(serializers.ModelSerializer):
    "serializer for events"

    noOfRsvp = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = "__all__"
        read_only_fields = ["user", "noOfRsvp"]

    def get_noOfRsvp(self, obj):
        return obj.rsvps.count()

    def format_url(self, url):
        if url and not url.startswith(("http://", "https://")):
            return f"https://{url}"
        return url

    def create(self, validated_data):
        """creating a new event"""
        user = self.context["user"]
        validated_data["user"] = user

        # Auto-format URLs
        for field in ["instagram", "facebook", "twitter", "linkedIn"]:
            if field in validated_data:
                validated_data[field] = self.format_url(validated_data[field])

        return Event.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """update an event given validated data"""
        instance.picture = validated_data.get("picture", instance.picture)
        instance.eventName = validated_data.get("eventName", instance.eventName)
        instance.generalInfo = validated_data.get("generalInfo", instance.generalInfo)
        instance.dateOfEvent = validated_data.get("dateOfEvent", instance.dateOfEvent)
        instance.eventClosingDate = validated_data.get("eventClosingDate", instance.eventClosingDate)
        instance.time = validated_data.get("time", instance.time)
        instance.country = validated_data.get("country", instance.country)
        instance.state = validated_data.get("state", instance.state)
        instance.city = validated_data.get("city", instance.city)
        instance.street = validated_data.get("street", instance.street)

        # Auto-format and update social URLs
        instance.instagram = self.format_url(validated_data.get("instagram", instance.instagram))
        instance.facebook = self.format_url(validated_data.get("facebook", instance.facebook))
        instance.twitter = self.format_url(validated_data.get("twitter", instance.twitter))
        instance.linkedIn = self.format_url(validated_data.get("linkedIn", instance.linkedIn))

        instance.congratulatoryMessage = validated_data.get("congratulatoryMessage", instance.congratulatoryMessage)
        instance.save()
        return instance


class RSVPSerializer(serializers.ModelSerializer):
    "serializer for RSVPs"

    class Meta:
        model = RSVP
        fields = "__all__"
