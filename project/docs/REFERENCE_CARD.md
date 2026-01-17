# Quick Reference Card

## 🚨 Current Blocking Issue

**DNS Resolution Failing** - Cannot reach any Python package server
Error: `getaddrinfo failed`

**Immediate Action**: Run diagnostics in NETWORK_ISSUE.md

---

## ✅ What's Done (All Code Ready)

| Item                   | Status | Details                                  |
| ---------------------- | ------ | ---------------------------------------- |
| CORS Security          | ✅     | Whitelist-based, env-configurable        |
| Rate Limiting          | ✅     | 5/hr login, 3/hr signup, 10/hr verify    |
| Email Verification     | ✅     | 403 if not verified                      |
| Swagger Protected      | ✅     | Admin/localhost only at `/api/docs/`     |
| Debug Logging Removed  | ✅     | ~15 console.log/print statements cleaned |
| API Config Centralized | ✅     | `Frontend-React/src/config/api.ts`       |
| Environment Validation | ✅     | App fails if required vars missing       |
| Object Permissions     | ✅     | Users can only edit their own events     |
| Model Timestamps       | ✅     | created_at, updated_at on models         |
| .env Documentation     | ✅     | Templates for backend and frontend       |

---

## 📖 Which Guide To Read

| Situation                       | Read This                   |
| ------------------------------- | --------------------------- |
| "How do I set this up?"         | `QUICK_START.md`            |
| "I'm getting SSL errors"        | `SSL_TROUBLESHOOTING.md`    |
| "pip install is failing"        | `NETWORK_ISSUE.md`          |
| "I don't understand PowerShell" | `SETUP_HELP.md`             |
| "What was implemented?"         | `IMPLEMENTATION_SUMMARY.md` |
| "What's the current status?"    | `STATUS.md` (this folder)   |

---

## 🎯 Fix Network in 3 Steps

```powershell
# Step 1: Diagnose
nslookup google.com

# Step 2: Try different network
# (Use mobile hotspot)

# Step 3: Check for interference
Get-VpnConnection
netsh winhttp show proxy
```

---

## 🚀 Once Network Is Fixed

```powershell
# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver &

# Frontend (new PowerShell window)
cd Frontend-React
npm install
npm run dev
```

Then:

- Frontend: http://localhost:5173
- Backend API: http://127.0.0.1:8000/api
- Swagger: http://127.0.0.1:8000/api/docs/swagger (admin)

---

## 📋 Before Deploying

```powershell
# Run tests
cd backend
python manage.py test Auth Events

# Check migrations
python manage.py showmigrations

# Collect static files
python manage.py collectstatic --noinput
```

See `IMPLEMENTATION_SUMMARY.md` for full checklist.

---

## 💬 Key Commands

### PowerShell Syntax (NOT bash/Linux)

```powershell
# ❌ Wrong - Linux syntax
cd backend && pip install -r requirements.txt

# ✅ Correct - PowerShell syntax
cd backend; pip install -r requirements.txt

# ✅ Also correct - separate commands
cd backend
pip install -r requirements.txt
```

### Virtual Environment

```powershell
# Create
python -m venv .venv

# Activate
.\.venv\Scripts\Activate.ps1

# Deactivate
deactivate
```

### Django

```powershell
# Migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test

# Run server
python manage.py runserver
```

### React/Vite

```powershell
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview
npm run preview
```

---

## 🔧 Environment Variables

### Backend (backend/.env)

```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DATABASE_URL=postgresql://user:password@localhost:5432/will_be_there
```

### Frontend (Frontend-React/.env.local)

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

Copy templates from `.env.example` files.

---

## 🔐 Security Notes

- 🔴 **NEVER commit `.env` or `.env.local`** — They contain secrets!
- ✅ **Commit `.env.example`** — It's just documentation
- 🔴 **NEVER run pip with `--trusted-host` in production** — Only for development
- ✅ **Always use HTTPS in production** — Never expose API over HTTP
- 🔴 **NEVER set DEBUG=True in production** — Exposes internal info

---

## 📞 Common Issues & Fixes

| Error                             | Cause                     | Fix                               |
| --------------------------------- | ------------------------- | --------------------------------- |
| `ModuleNotFoundError: django`     | Missing packages          | `pip install -r requirements.txt` |
| `Port 8000 in use`                | Another process on port   | `python manage.py runserver 8001` |
| `getaddrinfo failed`              | DNS broken                | See NETWORK_ISSUE.md              |
| `SSLError`                        | SSL certificate issue     | See SSL_TROUBLESHOOTING.md        |
| `ERR_MODULE_NOT_FOUND` (frontend) | Missing node_modules      | `npm install`                     |
| `CORS error`                      | Frontend/backend mismatch | Check `CORS_ALLOWED_ORIGINS`      |

---

## 🎓 Learning Resources

- **Django**: https://docs.djangoproject.com
- **Django REST Framework**: https://www.django-rest-framework.org
- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Python**: https://python.org/doc

---

## ✨ Files Added/Modified

**New Files**:

- STATUS.md (this folder)
- NETWORK_ISSUE.md
- SSL_TROUBLESHOOTING.md
- SETUP_HELP.md
- backend-setup.ps1
- requirements-minimal.txt

**Existing Files Updated**:

- All P0/P1 security features in backend & frontend
- See IMPLEMENTATION_SUMMARY.md for details

---

## 🎯 Project Status

```
✅ Code Ready          (all 10 P0/P1 items done)
⏳ Deployment Blocked  (waiting on network fix)
📚 Documentation Done  (4 guides + this card)
🧪 Testing Pending     (ready once network fixed)
🚀 Production Ready    (after testing)
```

---

**Created**: January 12, 2026
**Status**: Network fix needed, then ready to deploy
**Questions**: See guides above or check IMPLEMENTATION_SUMMARY.md

Print this page as a desk reference! 📋
