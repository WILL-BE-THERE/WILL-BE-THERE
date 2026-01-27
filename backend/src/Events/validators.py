from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import UploadedFile

# File size limit in bytes (5MB)
MAX_FILE_SIZE = 5 * 1024 * 1024

# Allowed MIME types for images
ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/x-icon",
]

# Allowed file extensions
ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".ico"]


def validate_image_file(file: UploadedFile):
    """
    Validate image file:
    - Check file size (max 5MB)
    - Check MIME type
    - Check file extension
    """
    if not file:
        raise ValidationError("No file provided.")

    # Check file size
    if file.size > MAX_FILE_SIZE:
        raise ValidationError(
            f"File size exceeds maximum allowed size of 5MB. Uploaded file size: {file.size / (1024 * 1024):.2f}MB"
        )

    # Check MIME type
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise ValidationError(f"Invalid file type: {file.content_type}. Allowed types: {', '.join(ALLOWED_MIME_TYPES)}")

    # Check file extension
    file_name = file.name.lower()
    has_valid_extension = any(file_name.endswith(ext) for ext in ALLOWED_EXTENSIONS)
    if not has_valid_extension:
        raise ValidationError(f"Invalid file extension. Allowed extensions: {', '.join(ALLOWED_EXTENSIONS)}")

    return file
