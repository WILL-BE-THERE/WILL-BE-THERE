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

from .models import Event
from .serializer import EventSerializer, RSVPSerializer
from .swagger import createEvent_request_body

# Create your views here.


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
    """view for creating an RSVP"""
    serializer = RSVPSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
