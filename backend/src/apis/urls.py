from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("Auth.urls")),
    path("events/", include("Events.urls")),
    path("organizations/", include("Organizations.urls")),
]
