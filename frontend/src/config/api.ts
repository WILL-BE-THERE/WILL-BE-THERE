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
  },
  // Events endpoints
  EVENTS: {
    LIST: `${API_BASE_URL}/api/events/event/`,
    GET: (id: string | number) => `${API_BASE_URL}/api/events/event/${id}/`,
    CREATE: `${API_BASE_URL}/api/events/create/`,
    UPDATE: (id: string | number) => `${API_BASE_URL}/api/events/event/${id}/update/`,
    DELETE: (id: string | number) => `${API_BASE_URL}/api/events/event/${id}/delete/`,
    RSVP_CREATE: `${API_BASE_URL}/api/events/rsvp/create/`,
  },
}

export default API_ENDPOINTS
