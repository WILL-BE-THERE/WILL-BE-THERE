from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.response import Response
from .serializer import userSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from .email import verify_email
from userProfile.models import userProfile
from drf_yasg.utils import swagger_auto_schema
from .swagger import signUp_request_body, logIn_request_body, logout_request_body, resendVerification_request_body, VerifyAccount_request_body

@swagger_auto_schema(
    method='post',
    operation_description=" endpoint: http://127.0.0.1:8000/api/account/signup/",
    request_body=signUp_request_body,
    responses={200: 'Success', 400: 'Bad Request'}
)
@api_view(['POST'])
def signUp(request):
    """ view to signup users"""
    data = request.data
    serializer = userSerializer(data=data, context={
        'phone_number': data.get('phone_number'),
        'confirm_password': data.get('confirm_password')
        })
    
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        code = verify_email(data.get('email'))
        user_profile = userProfile.objects.get(user=user)
        user_profile.verification_code = code
        user_profile.save()
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='post',
    operation_description=" endpoint: http://127.0.0.1:8000/api/account/verify/",
    request_body= VerifyAccount_request_body,
    responses={200: 'Success', 404: 'Not Found'}
)

@api_view(['POST'])
def Verify_account(request):
    """resend verification code"""
    email = request.data.get('email')
    verification_code = request.data.get('verification_code')
    try:
        user = User.objects.get(username=email)
        user_profile = userProfile.objects.get(user=user)
        if user_profile.verification_code == verification_code:
            user_profile.is_verified = True
            user_profile.save()
            return Response({'success': '[profile verified]'})
        else:
            return Response({'error': '[incorrect verification code]',})
    except User.DoesNotExist or userProfile.DoesNotExist:
        return Response({'error': 'user with this email dose not exit'}, status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(
    method='post',
    operation_description=" endpoint: http://127.0.0.1:8000/api/account/verify/",
    request_body= resendVerification_request_body,
    responses={200: 'Success', 404: 'Not Found'}
)
@api_view(['POST'])
def resend_Verification_code(request):
    """resend verification code"""
    email = request.data.get('email')
    try:
        user = User.objects.get(username=email)
        user_profile = userProfile.objects.get(user=user)
        code = verify_email(email)
        user_profile.verification_code = code
        user_profile.save()
        return Response({'success': '[verification code sent successfully]', 'verification code': [code]})
    except User.DoesNotExist or userProfile.DoesNotExist:
        return Response({'error': 'user with this email dose not exit'}, status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(
    method='post',
    operation_description=" endpoint: http://127.0.0.1:8000/api/account/login/",
    request_body=logIn_request_body,
    responses={200: 'Success', 401: 'Unauthorized'}
)
@api_view(['POST'])
def logIn(request):
    username = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        print(user)
        return Response({'token': token.key, 'user': userSerializer(user).data}, status=status.HTTP_200_OK)
    print("incorrect details")
    return Response({'error': 'username and or password incorrect'}, status=status.HTTP_401_UNAUTHORIZED)

# class CustomTokenAuthentication(TokenAuthentication):
#     """ for custom authentication"""
#     def authenticate(self, request):
#         try:
#             return super().authenticate(request)
#         except AuthenticationFailed:
#             raise AuthenticationFailed('unauthorized. Please login to continue')

@swagger_auto_schema(
    method='post',
    request_body=logout_request_body,
    operation_description=" endpoint: http://127.0.0.1:8000/api/account/logout/",
    operation_summary="its Auth protected"
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def logout(request):
    try:
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({'detail': 'Please login'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        print(str(e))
        return Response({'detail': str(e)}, status=status.HTTP_401_UNAUTHORIZED)