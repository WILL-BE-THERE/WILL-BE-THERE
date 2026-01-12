# SSL Certificate Issue - Troubleshooting & Workarounds

## The Problem
Your system cannot establish secure SSL connections to PyPI (Python Package Index).

```
SSLError(EOFError(8, '[SSL: UNEXPECTED_EOF_WHILE_READING]'))
```

This means the SSL handshake with `files.pythonhosted.org` is being interrupted.

---

## Root Causes (Most Likely)

1. **Network/ISP Interference** - Your ISP might be blocking or interfering with HTTPS connections to PyPI
2. **Corporate Firewall** - If on corporate network, SSL inspection could be breaking the connection
3. **Antivirus/Security Software** - Norton, McAfee, Avast, etc. that intercepts SSL
4. **VPN Conflicts** - Some VPN configurations break Python SSL
5. **System Certificates Outdated** - Windows root certificates haven't been updated

---

## Solution 1: Update System SSL Certificates (Quickest)

Run this in PowerShell as **Administrator**:

```powershell
# For Python 3.6+
python -m pip install --upgrade certifi

# Ensure certificates are in Python's database
python -c "import certifi; print(certifi.where())"
```

Then retry:
```powershell
pip install Django==5.0.7
```

---

## Solution 2: Use Alternative PyPI Index

PyPI has mirrors hosted worldwide. Try these:

### Option A: Tsinghua University (China - very reliable)
```powershell
pip config set global.index-url https://pypi.tsinghua.edu.cn/simple
pip install -r requirements.txt
```

### Option B: Aliyun Mirror (China - also good)
```powershell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
pip install -r requirements.txt
```

### Option C: Official PyPI (reset to default)
```powershell
pip config unset global.index-url
pip install -r requirements.txt
```

### Option D: Temporary per-command (don't persist)
```powershell
pip install -i https://pypi.tsinghua.edu.cn/simple -r requirements.txt
```

---

## Solution 3: Bypass SSL Verification (Last Resort)

⚠️ **WARNING**: Only use this for development. Never do this in production.

```powershell
# Create pip config file
mkdir -p $env:APPDATA\pip
@"
[global]
trusted-host = pypi.python.org
               pypi.org
               files.pythonhosted.org
"@ | Out-File -FilePath "$env:APPDATA\pip\pip.ini" -Encoding UTF8

# Then retry
pip install -r requirements.txt
```

Or per-command:
```powershell
pip install --trusted-host files.pythonhosted.org --trusted-host pypi.org Django==5.0.7
```

---

## Solution 4: Check Network/Firewall

Run these diagnostics:

```powershell
# Test DNS
nslookup files.pythonhosted.org

# Test HTTPS connectivity
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri "https://files.pythonhosted.org" -UseBasicParsing

# Check if proxy is interfering
netsh winhttp show proxy

# Test if antivirus is blocking
# Temporarily disable antivirus/VPN and retry pip install
```

---

## Solution 5: Docker (Complete Isolation)

If nothing else works, use Docker to avoid local environment issues:

```powershell
# Build container with all dependencies
docker build -t will-be-there-backend -f- . <<EOF
FROM python:3.13-slim

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
EOF

# Run container
docker run -p 8000:8000 will-be-there-backend
```

---

## Solution 6: GitHub Codespaces (Cloud IDE)

No local environment issues:
1. Go to https://github.com/WILL-BE-THERE/repo
2. Click "Code" → "Codespaces" → "Create"
3. Terminal already has working pip/Python
4. Run: `pip install -r backend/requirements.txt`

---

## Recommended Fix Order

1. **Try Solution 1** (Update certifi) - Takes 2 minutes
2. **Try Solution 2** (Alternative mirror) - Try Tsinghua, then Aliyun
3. **Try Solution 4** (Diagnostics) - Check if antivirus/VPN is blocking
4. **Try Solution 3** (Bypass SSL) - Only if desperate for development
5. **Try Solution 5/6** (Docker/Codespaces) - If local environment is broken

---

## Test After Each Solution

```powershell
# Quick test command
pip install --dry-run Django==5.0.7

# Or actually install
pip install Django==5.0.7

# If successful, install all:
pip install -r requirements.txt
```

---

## If You Get SSL Working, Test Everything

```powershell
# Backend
cd backend
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver &

# Frontend (in new PowerShell window)
cd Frontend-React
npm install
npm run dev
```

---

## Contact Support If Stuck

If none of these work:
- Check your corporate IT policies
- Ask your network admin about PyPI access
- Try from a different network (mobile hotspot)
- Contact Python community: https://stackoverflow.com/questions/tagged/python+ssl

---

**Status**: Investigation needed. The issue is system-level, not project-level.

**Next Step**: Run Solution 1 above and report which alternative mirror works.
