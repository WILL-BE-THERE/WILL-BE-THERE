# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project
COPY . /app/
COPY src/ /app/src/

# Add src to PYTHONPATH so Django can find the apps
ENV PYTHONPATH=/app/src

# Expose port
EXPOSE 8000

# Run gunicorn
# Note: Adjust module path based on your wsgi.py location.
# Since wsgi.py is in src/backend/wsgi.py, and we promoted src/ contents or need to reach it:
# If PYTHONPATH is /app/src, then `backend.wsgi` should be importable if `backend` package is in `src`.
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
