"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

# Custom permission class for Swagger access
class IsAdminOrLocalhost(permissions.BasePermission):
    """
    Allow access to Swagger only for admins or localhost (development).
    """
    def has_permission(self, request, view):
        # Allow localhost in development
        if settings.DEBUG and request.META.get('REMOTE_ADDR') in ('127.0.0.1', 'localhost'):
            return True
        # Allow authenticated admin users
        return request.user and request.user.is_staff

schema_view = get_schema_view(
   openapi.Info(
      title="API Documentation",
      default_version='v1',
      description="Application Api - PROTECTED: Requires admin access or localhost",
   ),
   public=False,  # Changed from public=True to protect documentation
   permission_classes=(IsAdminOrLocalhost,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apis.urls')),
    # Swagger protected endpoint - moved to /api/docs/
    re_path(r'^api/docs/swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^api/docs/redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc-ui'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)