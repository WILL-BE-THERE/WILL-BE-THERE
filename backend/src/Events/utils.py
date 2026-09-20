import base64
from datetime import datetime

import requests
from django.conf import settings


def get_access_token():
    consumer_key = settings.MPESA_CONSUMER_KEY
    consumer_secret = settings.MPESA_CONSUMER_SECRET
    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"  # Use sandbox for dev

    try:
        r = requests.get(api_url, auth=(consumer_key, consumer_secret))
        r.raise_for_status()
        token = r.json()['access_token']
        return token
    except Exception as e:
        print(f"Error generating M-Pesa Access Token: {str(e)}")
        return None

def initiate_stk_push(phone_number, amount, account_reference, transaction_desc="Ticket Purchase"):
    access_token = get_access_token()
    if not access_token:
        return {"error": "Failed to get access token"}

    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    business_short_code = settings.MPESA_SHORTCODE
    passkey = settings.MPESA_PASSKEY
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')

    password = base64.b64encode((business_short_code + passkey + timestamp).encode('utf-8')).decode('utf-8')

    # Format phone number: Replace 0 with 254 if needed, assumes Kenya format
    if phone_number.startswith('0'):
        phone_number = '254' + phone_number[1:]

    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }

    payload = {
        "BusinessShortCode": business_short_code,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": int(amount),
        "PartyA": phone_number,
        "PartyB": business_short_code,
        "PhoneNumber": phone_number,
        "CallBackURL": settings.MPESA_CALLBACK_URL,
        "AccountReference": account_reference,
        "TransactionDesc": transaction_desc
    }

    try:
        response = requests.post(api_url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        return {"error": f"M-Pesa HTTP Error: {e.response.text}"}
    except Exception as e:
        return {"error": f"M-Pesa Error: {str(e)}"}
