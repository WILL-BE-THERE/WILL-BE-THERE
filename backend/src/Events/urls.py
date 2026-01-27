from django.urls import path

from . import views

urlpatterns = [
    path("event/", views.getEvents, name="getevents"),
    path("event/<int:id>/", views.getEvent, name="getevent"),
    path("event/<int:id>/update/", views.updateEvent, name="updateEvent"),
    path("event/<int:id>/delete/", views.deleteEvent, name="deleteEvent"),
    path("create/", views.createEvents, name="event"),
    path("rsvp/create/", views.createRSVP, name="createRSVP"),
]
