from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
    throttle_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework_simplejwt.tokens import RefreshToken
from userProfile.models import userProfile

from .email import verify_email
from .serializer import userSerializer
from .swagger import (
    VerifyAccount_request_body,
    logIn_request_body,
    logout_request_body,
    resendVerification_request_body,
    signUp_request_body,
)


# Custom throttle classes for auth endpoints
class SignUpThrottle(AnonRateThrottle):
    scope = "signup"


class LoginThrottle(AnonRateThrottle):
    scope = "login"


class VerifyThrottle(AnonRateThrottle):
    scope = "verify"


@swagger_auto_schema(
    method="post",
    operation_description=" endpoint: http://127.0.0.1:8000/api/account/signup/",
    request_body=signUp_request_body,
    responses={200: "Success", 400: "Bad Request"},
)
@api_view(["POST"])
@permission_classes([AllowAny])
@throttle_classes([SignUpThrottle])
def signUp(request):
    """view to signup users"""
    data = request.data
    serializer = userSerializer(
        data=data,
        context={
            "phone_number": data.get("phone_number"),
            "confirm_password": data.get("confirm_password"),
        },
    )

    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        code = verify_email(data.get("email"))
        user_profile = userProfile.objects.get(user=user)
        user_profile.verification_code = code
        user_profile.save()
        return Response(
            {"token": token.key, "user": serializer.data},
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="post",
    operation_description=" endpoint: http://127.0.0.1:8000/api/account/verify/",
    request_body=VerifyAccount_request_body,
    responses={200: "Success", 404: "Not Found"},
)
@api_view(["POST"])
@permission_classes([AllowAny])
@throttle_classes([VerifyThrottle])
def Verify_account(request):
    """resend verification code"""
    email = request.data.get("email")
    verification_code = request.data.get("verification_code")
    try:
        user = User.objects.get(username=email)
        user_profile = userProfile.objects.get(user=user)
        if user_profile.verification_code == verification_code:
            user_profile.is_verified = True
            user_profile.save()
            return Response({"success": "[profile verified]"})
        else:
            return Response(
                {
                    "error": "[incorrect verification code]",
                }
            )
    except (User.DoesNotExist, userProfile.DoesNotExist):
        return Response(
            {"error": "user with this email does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )


@swagger_auto_schema(
    method="post",
    operation_description=" endpoint: http://127.0.0.1:8000/api/account/verify/",
    request_body=resendVerification_request_body,
    responses={200: "Success", 404: "Not Found"},
)
@api_view(["POST"])
@permission_classes([AllowAny])
def resend_Verification_code(request):
    """resend verification code"""
    email = request.data.get("email")
    try:
        user = User.objects.get(username=email)
        user_profile = userProfile.objects.get(user=user)
        code = verify_email(email)
        user_profile.verification_code = code
        user_profile.save()
        return Response({"success": "[verification code sent successfully]"})
    except (User.DoesNotExist, userProfile.DoesNotExist):
        return Response(
            {"error": "user with this email does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )


@swagger_auto_schema(
    method="post",
    operation_description=" endpoint: http://127.0.0.1:8000/api/account/login/",
    request_body=logIn_request_body,
    responses={200: "Success", 401: "Unauthorized"},
)
@api_view(["POST"])
@permission_classes([AllowAny])
@throttle_classes([LoginThrottle])
def logIn(request):
    username = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    # If authentication fails, try to find user by email and use their username
    if user is None:
        try:
            user_by_email = User.objects.get(email=username)
            user = authenticate(username=user_by_email.username, password=password)
        except User.DoesNotExist:
            pass

    if user is not None:
        # Check if user's email is verified
        try:
            user_profile = userProfile.objects.get(user=user)
            if not user_profile.is_verified:
                return Response(
                    {"error": "Email not verified. Please verify your email before logging in."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except userProfile.DoesNotExist:
            if user.is_superuser:
                # Create profile automatically for superusers if missing
                user_profile = userProfile.objects.create(user=user, is_verified=True)
            else:
                return Response(
                    {"error": "User profile not found"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": userSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )
    return Response(
        {"error": "username and or password incorrect"},
        status=status.HTTP_401_UNAUTHORIZED,
    )


# class CustomTokenAuthentication(TokenAuthentication):
#     """ for custom authentication"""
#     def authenticate(self, request):
#         try:
#             return super().authenticate(request)
#         except AuthenticationFailed:
#             raise AuthenticationFailed('unauthorized. Please login to continue')


@swagger_auto_schema(
    method="post",
    request_body=logout_request_body,
    operation_description=" endpoint: http://127.0.0.1:8000/api/account/logout/",
    operation_summary="its Auth protected",
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes(["rest_framework_simplejwt.authentication.JWTAuthentication"])
def logout(request):
    try:
        # SimpleJWT logout usually involves blacklisting the token if rotation is enabled
        # For a basic logout, we just return success as the client should delete the token
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({"detail": "Please login"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
