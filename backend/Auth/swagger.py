from drf_yasg import openapi

signUp_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=['email', 'password', 'first_name', 'last_name', 'phone_number'],
    properties={
        'email': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL),
        'first_name': openapi.Schema(type=openapi.TYPE_STRING),
        'last_name': openapi.Schema(type=openapi.TYPE_STRING),
        'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
        'password': openapi.Schema(type=openapi.TYPE_STRING),
        'confirm_password': openapi.Schema(type=openapi.TYPE_STRING),
    },
)

logIn_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'email': openapi.Schema(type=openapi.TYPE_STRING),
        'password': openapi.Schema(type=openapi.TYPE_STRING),
    },
    required=['email', 'password']
)

logout_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={},
    required=[]
)
