from django.urls import path

from . import views

urlpatterns = [
    # Organization management
    path('my/', views.listMyOrganizations, name='list-my-organizations'),
    path('create/', views.createOrganization, name='create-organization'),
    path('<int:org_id>/', views.getOrganization, name='get-organization'),

    # Team management
    path('<int:org_id>/members/', views.listMembers, name='list-members'),
    path('<int:org_id>/invite/', views.inviteMember, name='invite-member'),
    path('<int:org_id>/members/<int:member_id>/role/', views.updateMemberRole, name='update-member-role'),
    path('<int:org_id>/members/<int:member_id>/remove/', views.removeMember, name='remove-member'),
]
