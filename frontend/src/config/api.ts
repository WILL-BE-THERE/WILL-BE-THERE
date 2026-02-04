/**
 * API Configuration
 * This file centralizes all API endpoints and can be updated at build time via environment variables.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    SIGNUP: `${API_BASE_URL}/api/account/signup/`,
    LOGIN: `${API_BASE_URL}/api/account/login/`,
    LOGOUT: `${API_BASE_URL}/api/account/logout/`,
    VERIFY: `${API_BASE_URL}/api/account/verify/`,
    RESEND_VERIFICATION: `${API_BASE_URL}/api/account/resend-verification/`,
    PASSWORD_RESET_REQUEST: `${API_BASE_URL}/api/account/password-reset-request/`,
    PASSWORD_RESET_CONFIRM: `${API_BASE_URL}/api/account/password-reset-confirm/`,
  },
  // Events endpoints
  EVENTS: {
    LIST: `${API_BASE_URL}/api/events/event/`,
    GET: (id: string | number) => `${API_BASE_URL}/api/events/event/${id}/`,
    CREATE: `${API_BASE_URL}/api/events/create/`,
    UPDATE: (id: string | number) => `${API_BASE_URL}/api/events/event/${id}/update/`,
    DELETE: (id: string | number) => `${API_BASE_URL}/api/events/event/${id}/delete/`,
    RSVP_CREATE: `${API_BASE_URL}/api/events/rsvp/create/`,
    GUESTS: (id: string | number) => `${API_BASE_URL}/api/events/event/${id}/guests/`,
    MY_EVENTS: `${API_BASE_URL}/api/events/my-events/`,
    MY_TICKETS: `${API_BASE_URL}/api/events/my-tickets/`,
    CHECK_IN: `${API_BASE_URL}/api/events/rsvp/check-in/`,
    DASHBOARD_SUMMARY: `${API_BASE_URL}/api/events/dashboard-summary/`,
    ANNOUNCEMENT_CREATE: `${API_BASE_URL}/api/events/announcements/create/`,
    ANNOUNCEMENT_GET: (id: string | number) => `${API_BASE_URL}/api/events/announcements/${id}/`,
  },
}

export default API_ENDPOINTS
