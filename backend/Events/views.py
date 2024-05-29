from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .swagger import createEvent_request_body
from .serializer import EventSerializer
from .models import Event

# Create your views here.

@swagger_auto_schema(
    method='get',
    operation_description="endpoint: http://127.0.0.1:8000/api/events/event/",
    operation_summary = 'gets all created events',
    responses={200: 'Success', 400: 'BadRequest'}
)

@api_view(['GET'])
def getEvents(request):
    """ view for fetching all events"""
    try:
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': e}, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='get',
    operation_description="endpoint: http://127.0.0.1:8000/api/events/event/id",
    operation_summary = 'get particular event created events',
    responses={200: 'Success', 404: 'Not Found'}
)

@api_view(['GET'])
def getEvent(request, id):
    """ view for fetching single event"""
    try:
        event = Event.objects.get(id=id)
        serializer = EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response({'error': 'event not Found or may have been deleted'}, status=status.HTTP_404_NOT_FOUND)


@swagger_auto_schema(
    method='post',
    operation_description="endpoint: http://127.0.0.1:8000/api/events/create/",
    operation_summary="its Auth protected",
    request_body=createEvent_request_body,
    responses={201: 'Success', 401: 'Unauthorized'}
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def createEvents(request):
    """ view for events"""
    user = request.user
    serializer = EventSerializer(data=request.data, context={'username': user.username})
    if serializer.is_valid():
        serializer.save()
        return Response({'event': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

