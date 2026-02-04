from django.contrib import admin
from .models import Organization, OrganizationMember, EventTeamMember


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'subscription_tier', 'created_at')
    list_filter = ('subscription_tier', 'created_at')
    search_fields = ('name', 'owner__username', 'owner__email')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')


@admin.register(OrganizationMember)
class OrganizationMemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'organization', 'role', 'is_active', 'joined_at')
    list_filter = ('role', 'is_active', 'joined_at')
    search_fields = ('user__username', 'user__email', 'organization__name')
    readonly_fields = ('joined_at',)


@admin.register(EventTeamMember)
class EventTeamMemberAdmin(admin.ModelAdmin):
    list_display = ('member', 'event', 'role', 'assigned_at')
    list_filter = ('role', 'assigned_at')
    search_fields = ('member__user__username', 'event__eventName')
    readonly_fields = ('assigned_at',)
