from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("account/", include("Auth.urls")),
    path("events/", include("Events.urls")),
]
