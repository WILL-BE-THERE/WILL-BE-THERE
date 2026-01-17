# Backend Setup Script for PowerShell
# Run from project root: .\backend-setup.ps1

Write-Host "`n=== WILL-BE-THERE Backend Setup ===" -ForegroundColor Green

# Check if venv exists
if (-Not (Test-Path "backend\.venv")) {
    Write-Host "`n[1/5] Creating Python virtual environment..." -ForegroundColor Yellow
    Set-Location backend
    python -m venv .venv
    Set-Location ..
} else {
    Write-Host "`n[1/5] Virtual environment found (skipping creation)" -ForegroundColor Green
}

# Activate venv
Write-Host "`n[2/5] Activating virtual environment..." -ForegroundColor Yellow
& "backend\.venv\Scripts\Activate.ps1"

# Upgrade pip
Write-Host "`n[3/5] Upgrading pip (this may take a moment)..." -ForegroundColor Yellow
python -m pip install --upgrade pip setuptools wheel 2>$null

# Install dependencies - try main requirements first
Write-Host "`n[4/5] Installing dependencies..." -ForegroundColor Yellow

# Install core packages one by one for better error handling
$packages = @(
    "Django==5.0.7",
    "djangorestframework==3.15.2",
    "django-cors-headers==4.4.0",
    "django-environ==0.11.2",
    "django-ratelimit==4.1.0",
    "drf-yasg==1.21.7",
    "psycopg2-binary==2.9.10",
    "pillow==10.4.0",
    "whitenoise==6.7.0",
    "gunicorn==22.0.0",
    "pytz==2024.1",
    "PyYAML==6.0.1",
    "uritemplate==4.1.1"
)

foreach ($package in $packages) {
    Write-Host "  Installing $package..." -ForegroundColor Cyan
    python -m pip install $package 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "    ⚠️  Warning: Could not install $package" -ForegroundColor Red
    } else {
        Write-Host "    ✓ Installed" -ForegroundColor Green
    }
}

# Run migrations
Write-Host "`n[5/5] Running database migrations..." -ForegroundColor Yellow
Set-Location backend
python manage.py migrate
Set-Location ..

Write-Host "`n=== Setup Complete! ===" -ForegroundColor Green
Write-Host "`nYou can now run the Django dev server with:`n" -ForegroundColor Cyan
Write-Host "  cd backend`n  python manage.py runserver" -ForegroundColor Yellow
Write-Host "`nBackend will be available at: http://127.0.0.1:8000" -ForegroundColor Green
