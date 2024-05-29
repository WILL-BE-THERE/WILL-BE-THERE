from django.urls import path
from. import views

urlpatterns = [
    path('event/', views.getEvents, name="getevents"),
    path('event/<int:id>', views.getEvent, name="getevent"),
    path('create/', views.createEvents, name="event"),
]
