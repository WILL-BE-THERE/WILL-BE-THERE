# PowerShell & SSL Installation Guide

## Issue Summary

You've encountered two problems:

1. **PowerShell Syntax Error**: PowerShell uses `;` instead of `&&` to chain commands
2. **SSL Certificate Error**: pip cannot download packages due to network/SSL issues

## Fix #1: PowerShell Command Syntax

**Wrong (Bash/Linux syntax):**

```powershell
cd backend && pip install -r requirements.txt && python manage.py migrate
```

**Correct (PowerShell syntax):**

```powershell
cd backend; C:\Users\lenovo\AJ\WILL-BE-THERE\.venv\Scripts\python.exe -m pip install -r requirements.txt; python manage.py migrate; python manage.py runserver
```

Or use the ampersand for background processes:

```powershell
python manage.py runserver &  # Run in background
```

---

## Fix #2: SSL Certificate Error (Persistent Issue)

The error `SSLError(EOFError(8, '[SSL: UNEXPECTED_EOF_WHILE_READING]')` indicates:

- PyPI server connection is being interrupted
- Your network, firewall, or ISP may be blocking/interfering with SSL
- Antivirus/VPN could be intercepting SSL handshakes

### Option A: Use Alternative PyPI Index (Recommended)

Try installing from Aliyun mirror or official PyPI backup:

```powershell
# Using Aliyun mirror (faster, more stable)
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/

# Then retry
pip install -r requirements-minimal.txt
```

### Option B: Disable SSL Verification (Not Recommended for Production)

```powershell
# ONLY for development/testing
pip install --trusted-host pypi.python.org --trusted-host pypi.org --trusted-host files.pythonhosted.org -r requirements.txt
```

### Option C: Use a Different Network

Try:

- Different WiFi network
- Hotspot from phone
- Company VPN instead of home network
- Coffee shop WiFi

### Option D: Clear pip cache and retry

```powershell
pip cache purge
pip install -r requirements.txt --no-cache-dir
```

---

## Recommended Setup Script

Create a file called `setup.ps1` in your project root:

```powershell
# setup.ps1 - Full backend setup for PowerShell

Write-Host "Starting WILL-BE-THERE Backend Setup..." -ForegroundColor Green

# Navigate to backend
Set-Location backend

# Create/activate virtual environment
if (-Not (Test-Path ".\.venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv .venv
}

Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& ".\.venv\Scripts\Activate.ps1"

# Upgrade pip
Write-Host "Upgrading pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
python manage.py migrate

# Create superuser (optional)
Write-Host "Setup complete! Starting development server..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
python manage.py runserver
```

Run it:

```powershell
.\setup.ps1
```

---

## Manual Step-by-Step Commands

If the script doesn't work, run these one-by-one:

```powershell
# 1. Navigate to backend
cd C:\Users\lenovo\AJ\WILL-BE-THERE\backend

# 2. Activate virtual environment
& "C:\Users\lenovo\AJ\WILL-BE-THERE\.venv\Scripts\Activate.ps1"

# 3. Install dependencies (with retry logic)
python -m pip install --upgrade pip setuptools wheel

# Try minimal packages first
python -m pip install Django==5.0.7 djangorestframework==3.15.2 psycopg2-binary==2.9.10 pillow==10.4.0

# 4. Then add the rest
python -m pip install django-cors-headers==4.4.0 django-environ==0.11.2 django-ratelimit==4.1.0 drf-yasg==1.21.7 whitenoise==6.7.0

# 5. Run migrations
python manage.py migrate

# 6. Start server
python manage.py runserver
```

---

## Frontend Setup (React/Vite)

Once backend is ready, in another PowerShell window:

```powershell
# 1. Navigate to frontend
cd C:\Users\lenovo\AJ\WILL-BE-THERE\Frontend-React

# 2. Install dependencies
npm install

# 3. Create .env.local
cp .env.example .env.local

# 4. Start dev server
npm run dev
```

---

## Verify Everything Works

Once both servers are running:

✅ Backend: `http://127.0.0.1:8000/api/`
✅ Frontend: `http://localhost:5173/`
✅ Swagger: `http://127.0.0.1:8000/api/docs/swagger/` (admin only)

---

## If SSL Persists

Contact your network administrator about:

- Checking firewall rules for PyPI domains
- Verifying SSL certificate chain is complete
- Checking antivirus/VPN settings

Alternative: Use Docker or cloud IDE (GitHub Codespaces) to bypass local network issues.

---

**Last Updated**: January 12, 2026
