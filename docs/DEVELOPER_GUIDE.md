# Developer Guide - WILL-BE-THERE

Welcome to the **WILL-BE-THERE** project! This guide will help you get started with development, understand the architecture, and follow our coding standards.

## Tech Stack

- **Backend**: Django 6.0, Django REST Framework, SimpleJWT (Auth), Fernet (Encryption).
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Framer Motion.
- **Database**: PostgreSQL (Production/Docker), SQLite (Local fallback).
- **Caching**: Redis.
- **Infrastructure**: Docker, GitHub Actions (CI/CD).

## Getting Started

### Prerequisites

- Docker Desktop
- Python 3.12+ (for local linting/type-checking)
- Node.js 18+ (for local frontend development)

### One-Command Setup (Docker)

The easiest way to start is using Docker Compose:

```bash
docker compose up --build
```

- **Backend API**: `http://localhost:8000`
- **Frontend App**: `http://localhost:5173`
- **API Documentation**: `http://localhost:8000/api/docs/swagger/`

### local Development Setup

#### Backend
1. Create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or .\venv\Scripts\activate on Windows
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   pip install -r requirements-dev.txt
   ```
3. Run migrations:
   ```bash
   python manage.py migrate
   ```

#### Frontend
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```

## Coding Standards

### Quality Gates (CI/CD)
Every pull request is automatically checked for:
- **Linting**: Ruff (Backend), ESLint (Frontend).
- **Type Safety**: Mypy (Backend), TSC (Frontend).
- **Build Verification**: Docker build status.

You can run these locally before pushing:
- **Backend**: `ruff check src`, `mypy src`.
- **Frontend**: `npm run lint`, `npm run build`.

### Security
- **Never** commit `.env` files.
- Sensitive fields (like `phone_number`) are encrypted using `django-fernet-fields`.
- Use `Bearer` tokens for authorized API calls.

## Deployment

The project is configured for deployment via CI/CD. Ensure all secrets (like `SECRET_KEY`, `FERNET_KEY`, `DATABASE_URL`) are configured in your deployment environment.
