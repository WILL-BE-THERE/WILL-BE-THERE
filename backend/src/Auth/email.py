import random

from .tasks import send_email_task


def generate_verification_code():
    """Generate a random 4-digit verification code."""
    return "".join(str(random.randint(0, 9)) for _ in range(4))


def verify_email(email):
    subject = "Verify Your Account"
    verification_code = generate_verification_code()
    message = f"Your verification code is: {verification_code}"
    recipient_list = [email]

    # Trigger Async Task
    send_email_task.delay(subject, message, recipient_list)
    return verification_code
