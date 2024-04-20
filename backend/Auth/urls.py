from django.urls import path
from. import views

urlpatterns = [
    path('signup/', views.signUp, name="signUp"),
    path('login/', views.logIn, name="login"),
    path('logout/', views.logout, name="logout"),
    path('verify/', views.Verify_account, name="verify"),
    path('resendVerification/', views.resend_Verification_code, name="resendVerification")
]
