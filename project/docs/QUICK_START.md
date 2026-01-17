# WILL-BE-THERE: Developer Quick Start Guide

After recent security and quality improvements, follow these steps to get the project running locally.

## Prerequisites

- Python 3.8+
- Node.js 18+
- Git
- A code editor (VS Code recommended)

## Backend Setup (Django)

### 1. Clone & Enter Backend Directory

```bash
cd backend
```

### 2. Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

### 3. Set Up Environment Variables

```bash
# Copy the template
cp .env.example .env

# Edit .env with your values:
# SECRET_KEY=your-secret-key (or generate one)
# DEBUG=True
# EMAIL_HOST=smtp.gmail.com
# EMAIL_HOST_USER=your-email@gmail.com
# EMAIL_HOST_PASSWORD=your-app-password
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Run Migrations

```bash
python manage.py migrate
```

### 6. Start Django Development Server

```bash
python manage.py runserver
# Server runs on http://127.0.0.1:8000
```

**Key Endpoints:**

- API: `http://127.0.0.1:8000/api/`
- Admin Panel: `http://127.0.0.1:8000/admin/`
- Swagger Docs: `http://127.0.0.1:8000/api/docs/swagger/` (admin only)

---

## Frontend Setup (React + Vite)

### 1. Enter Frontend Directory

```bash
cd Frontend-React
```

### 2. Set Up Environment Variables

```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local:
# VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
# Server runs on http://127.0.0.1:5173 (or 3000)
```

**Available Commands:**

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## Testing Your Setup

### Backend Testing

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test Auth
python manage.py test Events

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend Testing

```bash
# Run linter
npm run lint

# Run type checking
npm run build  # (includes TypeScript check)
```

---

## Important Security Notes

### 🔐 Never Commit `.env` or `.env.local`

These files contain secrets and should be in `.gitignore`. Only `.env.example` and `.env.example` templates should be versioned.

### 📧 Email Configuration

For local development, use a test email service:

- **Gmail:** Generate App Password (not regular password)
- **Mailtrap:** Free service for testing emails
- **Console Backend:** `EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend'` (logs emails to console)

### 🔑 Secret Key

Generate a new one:

```bash
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

---

## API Testing

### Using curl

```bash
# Signup
curl -X POST http://127.0.0.1:8000/api/account/signup/ \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"securepass123",
    "confirm_password":"securepass123",
    "first_name":"John",
    "last_name":"Doe",
    "phone_number":"+1234567890"
  }'

# Login
curl -X POST http://127.0.0.1:8000/api/account/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"securepass123"
  }'
```

### Using Postman/Insomnia

1. Import API from Swagger: `http://127.0.0.1:8000/api/docs/swagger/`
2. Set variables:
   - `base_url`: `http://127.0.0.1:8000`
   - `token`: (obtained from login response)

---

## Common Issues

### Django Migrations Failed

```bash
# Check migration status
python manage.py showmigrations

# Force recreate migrations (careful in production!)
python manage.py migrate Auth zero
python manage.py migrate
```

### Port Already in Use

```bash
# Use a different port
python manage.py runserver 8001
```

### Missing Dependencies

```bash
# Reinstall from scratch
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### CORS Errors in Frontend

- Ensure `VITE_API_BASE_URL` matches backend `ALLOWED_HOSTS`
- Check `CORS_ALLOWED_ORIGINS` in `backend/.env`
- Default: `http://127.0.0.1:5173` should work for Vite

---

## Recent Changes (P0/P1 Security Improvements)

✅ **CORS hardened** — Only configured origins allowed
✅ **Rate limiting** — 5 login, 3 signup, 10 verify attempts per hour
✅ **Email verification required** — Must verify before login
✅ **Debug logging removed** — No console.log/print in production
✅ **Centralized API config** — Use `Frontend-React/src/config/api.ts`
✅ **Environment validation** — App fails to start if required vars missing
✅ **Swagger protected** — Admin access only (prevents info leakage)

See `IMPLEMENTATION_SUMMARY.md` for full details.

---

## Next Steps

1. **Implement unit tests** (target 70%+ coverage)
2. **Add upload validation** (file types, sizes, virus scanning)
3. **Complete password reset flow**
4. **Set up CI/CD** (GitHub Actions already configured)
5. **Deploy to staging** and test end-to-end

---

## Need Help?

- **Audit Report:** See `AUDIT_REPORT.md`
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md`
- **Django Docs:** https://docs.djangoproject.com
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev

---

**Last Updated:** January 12, 2026
**Status:** ✅ All P0/P1 items implemented and tested
