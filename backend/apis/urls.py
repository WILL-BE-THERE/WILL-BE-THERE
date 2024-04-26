from django.urls import path, include

urlpatterns = [
    path('account/', include('Auth.urls')),
    path('events/', include('Events.urls')),
]
