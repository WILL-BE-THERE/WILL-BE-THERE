from django.core.mail import send_mail
from django.conf import settings 
import random

def generate_verification_code():
    """Generate a random 4-digit verification code."""
    return ''.join(str(random.randint(0, 9)) for _ in range(4))

def verify_email(email):
    subject = 'Verify Your Account'
    verification_code = generate_verification_code()
    message = f'Your verification code is: {verification_code}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    
    send_mail(subject, message, email_from, recipient_list)
    return verification_code
