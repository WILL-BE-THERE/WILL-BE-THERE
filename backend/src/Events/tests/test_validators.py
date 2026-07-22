from unittest.mock import MagicMock

from django.core.exceptions import ValidationError
from django.test import TestCase

from Events.validators import MAX_FILE_SIZE, validate_image_file


class ValidateImageFileTestCase(TestCase):
    def test_valid_image(self):
        """Test with a valid image file."""
        mock_file = MagicMock()
        mock_file.size = 1024  # 1KB
        mock_file.content_type = "image/jpeg"
        mock_file.name = "test_image.jpg"

        result = validate_image_file(mock_file)
        self.assertEqual(result, mock_file)

    def test_no_file(self):
        """Test with no file provided."""
        with self.assertRaises(ValidationError) as context:
            validate_image_file(None)

        self.assertEqual(str(context.exception.message), "No file provided.")

    def test_file_size_exceeds_limit(self):
        """Test with a file exceeding the maximum size."""
        mock_file = MagicMock()
        mock_file.size = MAX_FILE_SIZE + 1
        mock_file.content_type = "image/png"
        mock_file.name = "large_image.png"

        with self.assertRaises(ValidationError) as context:
            validate_image_file(mock_file)

        self.assertIn("File size exceeds maximum allowed size of 5MB", str(context.exception.message))

    def test_invalid_mime_type(self):
        """Test with an invalid MIME type."""
        mock_file = MagicMock()
        mock_file.size = 1024
        mock_file.content_type = "application/pdf"
        mock_file.name = "test.jpg"

        with self.assertRaises(ValidationError) as context:
            validate_image_file(mock_file)

        self.assertIn("Invalid file type: application/pdf", str(context.exception.message))

    def test_invalid_extension(self):
        """Test with an invalid file extension."""
        mock_file = MagicMock()
        mock_file.size = 1024
        mock_file.content_type = "image/jpeg"
        mock_file.name = "test.txt"

        with self.assertRaises(ValidationError) as context:
            validate_image_file(mock_file)

        self.assertIn("Invalid file extension", str(context.exception.message))

    def test_case_insensitive_extension(self):
        """Test with an upper case valid extension."""
        mock_file = MagicMock()
        mock_file.size = 1024
        mock_file.content_type = "image/jpeg"
        mock_file.name = "test_image.JPG"

        result = validate_image_file(mock_file)
        self.assertEqual(result, mock_file)
