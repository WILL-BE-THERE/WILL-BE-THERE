"""
Environment variable validation module.
Ensures all required secrets and config are present before app startup.
"""

import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Required environment variables for production
REQUIRED_ENV_VARS = [
    "SECRET_KEY",
    "DEBUG",
    "ALLOWED_HOSTS",
    "EMAIL_HOST",
    "EMAIL_PORT",
    "EMAIL_HOST_USER",
    "EMAIL_HOST_PASSWORD",
]

# Optional but recommended for production
RECOMMENDED_ENV_VARS = [
    "CORS_ALLOWED_ORIGINS",
    "DATABASE_URL",
    "SENTRY_DSN",
]


def validate_env_vars():
    """
    Validate that all required environment variables are set.
    Raises SystemExit if any required vars are missing.
    """
    missing_vars = []

    for var_name in REQUIRED_ENV_VARS:
        if not os.environ.get(var_name):
            missing_vars.append(var_name)

    if missing_vars:
        print("\n" + "=" * 70)
        print("ERROR: Missing required environment variables:")
        for var in missing_vars:
            print(f"  - {var}")
        print("\nPlease set these variables in your .env file or environment.")
        print("See .env.example for reference.")
        print("=" * 70 + "\n")
        sys.exit(1)

    # Warn about recommended vars in production
    if os.environ.get("DEBUG") == "False":
        missing_recommended = []
        for var_name in RECOMMENDED_ENV_VARS:
            if not os.environ.get(var_name):
                missing_recommended.append(var_name)

        if missing_recommended:
            print("\n" + "=" * 70)
            print("WARNING: Missing recommended environment variables for production:")
            for var in missing_recommended:
                print(f"  - {var}")
            print("=" * 70 + "\n")


if __name__ == "__main__":
    validate_env_vars()
