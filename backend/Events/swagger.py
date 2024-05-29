from drf_yasg import openapi

createEvent_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=['picture', 'eventName', 'generalInfo', 'dateOfEvent',
              'eventClosingDate','time', 'country', 'state', 'city', 'street'],

    properties = {
    'picture': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_BINARY),
    'eventName': openapi.Schema(type=openapi.TYPE_STRING),
    'generalInfo': openapi.Schema(type=openapi.TYPE_STRING),
    'dateOfEvent': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
    'eventClosingDate': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
    'time': openapi.Schema(type=openapi.TYPE_STRING),
    'country': openapi.Schema(type=openapi.TYPE_STRING),
    'state': openapi.Schema(type=openapi.TYPE_STRING),
    'city': openapi.Schema(type=openapi.TYPE_STRING),
    'street': openapi.Schema(type=openapi.TYPE_STRING),
    'instagram': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI),
    'facebook': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI),
    'twitter': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI),
    'linkedIn': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI),
    'congratulatoryMessage': openapi.Schema(type=openapi.TYPE_STRING),
    }
)