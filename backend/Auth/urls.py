from django.urls import path
from. import views

urlpatterns = [
    path('signup/', views.signUp, name="signUp"),
    path('login/', views.logIn, name="login"),
    path('logout/', views.logout, name="logout"),
    path('resendVerification/', views.resend_Vserification_code, name="resendVerification")
]
