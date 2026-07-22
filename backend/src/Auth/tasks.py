import logging

from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)

@shared_task(name="send_email_task")
def send_email_task(subject, message, recipient_list):
    """
    Async task to send email via SMTP.
    """
    try:
        email_from = settings.EMAIL_HOST_USER
        logger.info(f"Sending email '{subject}' to {recipient_list}")
        send_mail(subject, message, email_from, recipient_list)
        return f"Email sent to {len(recipient_list)} recipients"
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return f"Failed: {str(e)}"
