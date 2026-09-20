# Technical Requirements Document (TRD) — WILL-BE-THERE

## 1. Stack Architecture Overview

- **Frontend SPA:** React 18, TypeScript 5, Vite, Tailwind CSS 3, Framer Motion.
- **Backend API:** Django 6.0, Django REST Framework (DRF), SimpleJWT Authentication.
- **Database:** PostgreSQL (Production / Docker), SQLite (Local Dev fallback).
- **Caching & Async:** Redis, Celery (for email dispatch & notifications).
- **Containerization & Hosting:** Docker Compose, Nginx reverse proxy.

## 2. Frontend Architecture & Design Token Integration

- **Component Paradigm:** Atomic Design (Atoms, Molecules, Organisms, Templates, Pages).
- **Design Tokens:** Shared via CSS Custom Properties (`:root` variables) and Tailwind CSS configuration tokens (`tailwind.config.js`).
- **State Management:** React Context API (`ProjectProvider`) + React Query / Axios hooks for API interaction.
- **Responsive Breakpoints:**
  - `sm`: 640px
  - `md`: 768px (Tablet)
  - `lg`: 1024px (Desktop-First Dashboard default)
  - `xl`: 1280px
  - `2xl`: 1536px

## 3. API Communication & Security

- **Endpoints:** RESTful API with JSON payload formats (`/api/v1/events/`, `/api/v1/auth/`, `/api/v1/rsvps/`).
- **Security:** JWT Bearer token headers, Fernet field encryption for sensitive fields, CORS protection, CSRF protection, rate limiting (`django-ratelimit`).
- **Accessibility Compliance:** WCAG 2.1 AA standard (minimum 4.5:1 contrast, keyboard focus rings, screen reader ARIA labels).
