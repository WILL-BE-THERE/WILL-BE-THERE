import os
from datetime import timedelta
from pathlib import Path

import environ
import django
import django.utils.encoding

from .env_validation import validate_env_vars

# MONKEY PATCH: django-fernet-fields uses 'force_text' which was removed in Django 4.0
# We map it to 'force_str' to make the library work with Django 6.x.
setattr(django.utils.encoding, "force_text", django.utils.encoding.force_str)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# Initialize environment variables
env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)
