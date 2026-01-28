from django.urls import path

from . import views

urlpatterns = [
    path("my-events/", views.getMyEvents, name="getMyEvents"),
    path("event/", views.getEvents, name="getevents"),
    path("event/<int:id>/", views.getEvent, name="getevent"),
    path("event/<int:id>/update/", views.updateEvent, name="updateEvent"),
    path("event/<int:id>/delete/", views.deleteEvent, name="deleteEvent"),
    path("create/", views.createEvents, name="event"),
    path("rsvp/create/", views.createRSVP, name="createRSVP"),
    path("event/<int:id>/guests/", views.getEventGuests, name="getEventGuests"),
    path("rsvp/check-in/", views.checkInGuest, name="checkInGuest"),
    path("dashboard-summary/", views.getDashboardSummary, name="getDashboardSummary"),
    path("announcements/create/", views.createAnnouncement, name="createAnnouncement"),
    path("announcements/<int:event_id>/", views.getAnnouncements, name="getAnnouncements"),
]
