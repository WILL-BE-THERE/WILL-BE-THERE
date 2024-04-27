from drf_yasg import openapi

createEvent_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=['picture', 'eventName', 'generalInfo', 'dateOfEvent',
              'eventClosingDate','time', 'country', 'state', 'city', 'street', 'bankName',
              'accountNumber', 'accountName', 'socialMedia',],

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
    'bankName': openapi.Schema(type=openapi.TYPE_STRING),
    'accountNumber': openapi.Schema(type=openapi.TYPE_STRING),
    'accountName': openapi.Schema(type=openapi.TYPE_STRING),
    'socialMedia': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI),
    'congratulatoryMessage': openapi.Schema(type=openapi.TYPE_STRING),
    }
)