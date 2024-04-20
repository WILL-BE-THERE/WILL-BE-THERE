from django.urls import path, include

urlpatterns = [
    path('account/', include('Auth.urls')),
]
