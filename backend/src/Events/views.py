from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import RSVP, Event
from .serializer import (
    AnnouncementSerializer,
    EventSerializer,
    RSVPSerializer,
)
from .swagger import createEvent_request_body

# Create your views here.


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getDashboardSummary(request):
    """view for host dashboard aggregate statistics"""
    user = request.user
    events = Event.objects.filter(user=user)
    total_events = events.count()

    rsvps = RSVP.objects.filter(event__user=user)
    total_rsvps = rsvps.count()

    # Revenue calculation (sum price of Paid RSVPs for current user's events)
    total_revenue = 0
    paid_rsvps = rsvps.filter(payment_status="Paid")
    for rsvp in paid_rsvps:
        total_revenue += float(rsvp.event.price)

    checked_in_count = rsvps.filter(checked_in=True).count()

    # Recent activity: last 5 RSVPs
    recent_rsvps = rsvps.order_by("-created_at")[:5]

    return Response(
        {
            "total_events": total_events,
            "total_rsvps": total_rsvps,
            "total_revenue": total_revenue,
            "checked_in_count": checked_in_count,
            "recent_activity": RSVPSerializer(recent_rsvps, many=True).data,
            "event_breakdown": [{"id": e.id, "name": e.eventName, "rsvps": e.rsvps.count()} for e in events[:5]],
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def createAnnouncement(request):
    """view for creating an announcement for an event"""
    event_id = request.data.get("event")
    event = get_object_or_404(Event, id=event_id)

    if event.user != request.user:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = AnnouncementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([AllowAny])
def getAnnouncements(request, event_id):
    """view for fetching announcements for an event"""
    event = get_object_or_404(Event, id=event_id)
    announcements = event.announcements.all().order_by("-created_at")
    serializer = AnnouncementSerializer(announcements, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    operation_description="endpoint: http://127.0.0.1:8000/api/events/event/",
    operation_summary="gets all created events",
    responses={200: "Success", 400: "BadRequest"},
)
@api_view(["GET"])
@permission_classes([AllowAny])
def getEvents(request):
    """view for fetching all events"""
    try:
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getMyEvents(request):
    """view for fetching events created by the current user"""
    try:
        events = Event.objects.filter(user=request.user).order_by("-created_at")
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="get",
    operation_description="endpoint: http://127.0.0.1:8000/api/events/event/id",
    operation_summary="get particular event created events",
    responses={200: "Success", 404: "Not Found"},
)
@api_view(["GET"])
@permission_classes([AllowAny])
def getEvent(request, id):
    """view for fetching single event"""
    try:
        event = Event.objects.get(id=id)
        serializer = EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response(
            {"error": "event not Found or may have been deleted"},
            status=status.HTTP_404_NOT_FOUND,
        )


@swagger_auto_schema(
    method="post",
    operation_description="endpoint: http://127.0.0.1:8000/api/events/create/",
    operation_summary="its Auth protected",
    request_body=createEvent_request_body,
    responses={201: "Success", 401: "Unauthorized"},
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def createEvents(request):
    """view for events"""
    user = request.user
    serializer = EventSerializer(data=request.data, context={"user": user})
    if serializer.is_valid():
        serializer.save()
        return Response({"event": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def updateEvent(request, id):
    """view for updating an event"""
    try:
        event = Event.objects.get(id=id)
        # Check if the user owns the event
        if event.user != request.user:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = EventSerializer(event, data=request.data, partial=True, context={"user": request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def deleteEvent(request, id):
    """view for deleting an event"""
    try:
        event = Event.objects.get(id=id)
        if event.user != request.user:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        event.delete()
        return Response({"message": "Event deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([AllowAny])
def createRSVP(request):
    """view for creating an RSVP along with structured plus-ones"""
    data = request.data.copy()
    plus_one_names = data.pop("plus_ones", [])

    serializer = RSVPSerializer(data=data)
    if serializer.is_valid():
        parent_rsvp = serializer.save()

        # Create structured child records for each plus-one
        for name in plus_one_names:
            if name.strip():
                RSVP.objects.create(
                    event=parent_rsvp.event,
                    guestName=name.strip(),
                    guestEmail=parent_rsvp.guestEmail,  # Linked to primary contact
                    parent_rsvp=parent_rsvp,
                    isAttending="Yes",
                    payment_status=parent_rsvp.payment_status,  # Matches parent's status
                )

        # Return the primary RSVP data (which now includes plus_ones via SerializerMethodField)
        return Response(RSVPSerializer(parent_rsvp).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def checkInGuest(request):
    """view for checking in a guest via token"""
    token = request.data.get("token")
    if not token:
        return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

    rsvp = get_object_or_404(RSVP, rsvp_token=token)

    # Check if the current user owns the event
    if rsvp.event.user != request.user:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    if rsvp.checked_in:
        return Response({"message": f"{rsvp.guestName} is already checked in"}, status=status.HTTP_200_OK)

    rsvp.checked_in = True
    rsvp.save()

    return Response(
        {
            "message": f"Successfully checked in {rsvp.guestName}",
            "guestName": rsvp.guestName,
            "checked_in": rsvp.checked_in,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getEventGuests(request, id):
    """view for fetching all guests for a specific event"""
    event = get_object_or_404(Event, id=id)

    # Check if the current user owns the event
    if event.user != request.user:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    # Get all primary RSVPs (those without parents)
    rsvps = RSVP.objects.filter(event=event, parent_rsvp=None).order_by("-created_at")
    serializer = RSVPSerializer(rsvps, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
