from django.shortcuts import get_object_or_404
from django.db import transaction
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination

from .models import RSVP, Event, TicketType
from .serializer import (
    AnnouncementSerializer,
    EventSerializer,
    RSVPSerializer,
)
from django.conf import settings
from .swagger import createEvent_request_body

# Organizations & Permissions
from Organizations.models import OrganizationMember
from Organizations.permissions import CanManageEvent, CanViewFinances

# Initialize Stripe
import stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

# M-Pesa Utils
from .utils import initiate_stk_push
import json

# Create your views here.


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getDashboardSummary(request):
    """view for host dashboard aggregate statistics (organization-filtered)"""
    user = request.user
    
    # Get organization from query param (optional, defaults to all user's orgs)
    org_id = request.query_params.get('organization_id')
    
    # Filter events by organizations where user is a member
    user_orgs = OrganizationMember.objects.filter(
        user=user,
        is_active=True
    ).values_list('organization_id', flat=True)
    
    events = Event.objects.filter(organization_id__in=user_orgs)
    
    # Further filter by specific org if provided
    if org_id:
        events = events.filter(organization_id=org_id)
    
    total_events = events.count()
    rsvps = RSVP.objects.filter(event__in=events)
    total_rsvps = rsvps.count()

    # Revenue calculation (only for users with finance permissions)
    total_revenue = 0
    can_view_revenue = False
    
    if org_id:
        member = OrganizationMember.objects.filter(
            user=user,
            organization_id=org_id,
            is_active=True
        ).first()
        can_view_revenue = member and member.can_view_finances()
    
    if can_view_revenue or not org_id:  # Show revenue if no specific org or has permission
        paid_rsvps = rsvps.filter(payment_status="Paid")
        for rsvp in paid_rsvps:
            price = rsvp.ticket_type.price if rsvp.ticket_type else rsvp.event.price
            total_revenue += float(price)

    checked_in_count = rsvps.filter(checked_in=True).count()
    recent_rsvps = rsvps.order_by("-created_at")[:5]

    return Response(
        {
            "total_events": total_events,
            "total_rsvps": total_rsvps,
            "total_revenue": total_revenue if can_view_revenue or not org_id else None,
            "checked_in_count": checked_in_count,
            "recent_activity": RSVPSerializer(recent_rsvps, many=True).data,
            "event_breakdown": [{"id": e.id, "name": e.eventName, "rsvps": e.rsvps.count()} for e in events[:5]],
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def createAnnouncement(request):
    """view for creating an announcement for an event"""
    event_id = request.data.get("event")
    event = get_object_or_404(Event, id=event_id)

    if event.user != request.user:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = AnnouncementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([AllowAny])
def getAnnouncements(request, event_id):
    """view for fetching announcements for an event"""
    event = get_object_or_404(Event, id=event_id)
    announcements = event.announcements.all().order_by("-created_at")
    serializer = AnnouncementSerializer(announcements, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    operation_description="endpoint: http://127.0.0.1:8000/api/events/event/",
    operation_summary="gets all created events",
    responses={200: "Success", 400: "BadRequest"},
)
@api_view(["GET"])
@permission_classes([AllowAny])
def getEvents(request):
    """view for fetching all events"""
    try:
        events = Event.objects.all().order_by("-created_at")
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(events, request)
        serializer = EventSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getMyEvents(request):
    """view for fetching events from user's organizations"""
    try:
        # Get organizations where user is a member
        user_orgs = OrganizationMember.objects.filter(
            user=request.user,
            is_active=True
        ).values_list('organization_id', flat=True)
        
        events = Event.objects.filter(organization_id__in=user_orgs).order_by("-created_at")
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(events, request)
        serializer = EventSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getMyTickets(request):
    """view for fetching RSVPs for the current user (My Tickets)"""
    try:
        # Fetch RSVPs made by the user
        rsvps = RSVP.objects.filter(guestEmail=request.user.email).order_by("-created_at")
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(rsvps, request)
        serializer = RSVPSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="get",
    operation_description="endpoint: http://127.0.0.1:8000/api/events/event/id",
    operation_summary="get particular event created events",
    responses={200: "Success", 404: "Not Found"},
)
@api_view(["GET"])
@permission_classes([AllowAny])
def getEvent(request, id):
    """view for fetching single event"""
    try:
        event = Event.objects.get(id=id)
        serializer = EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response(
            {"error": "event not Found or may have been deleted"},
            status=status.HTTP_404_NOT_FOUND,
        )


@swagger_auto_schema(
    method="post",
    operation_description="endpoint: http://127.0.0.1:8000/api/events/create/",
    operation_summary="its Auth protected",
    request_body=createEvent_request_body,
    responses={201: "Success", 401: "Unauthorized"},
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def createEvents(request):
    """view for events"""
    user = request.user
    data = request.data.copy()
    ticket_types_data = data.pop("ticket_types", [])
    
    # If using form-data, ticket_types might need parsing from JSON string if sent that way
    import json
    if isinstance(ticket_types_data, list) and len(ticket_types_data) > 0 and isinstance(ticket_types_data[0], str):
         # Try parsing if it's a list of strings (happens with FormData sometimes)
         try:
             ticket_types_data = [json.loads(t) for t in ticket_types_data]
         except:
             pass

    serializer = EventSerializer(data=data, context={"user": user})
    
    if serializer.is_valid():
        try:
            with transaction.atomic():
                event = serializer.save()
                
                # Create Ticket Types
                for ticket_data in ticket_types_data:
                    # Sanitize basic fields
                    TicketType.objects.create(
                        event=event,
                        name=ticket_data.get("name"),
                        description=ticket_data.get("description", ""),
                        price=ticket_data.get("price", 0.00),
                        quantity=ticket_data.get("quantity", 0),
                        currency=ticket_data.get("currency", "GHS")
                    )
                    
            # Reload event to include new ticket types in serializer
            return Response({"event": EventSerializer(event).data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": f"Failed to create event tickets: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
            
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def updateEvent(request, id):
    """view for updating an event"""
    try:
        event = Event.objects.get(id=id)
        # Check if the user owns the event
        if event.user != request.user:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = EventSerializer(event, data=request.data, partial=True, context={"user": request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def deleteEvent(request, id):
    """view for deleting an event"""
    try:
        event = Event.objects.get(id=id)
        if event.user != request.user:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        event.delete()
        return Response({"message": "Event deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def createRSVP(request):
    """view for creating an RSVP along with structured plus-ones"""
    data = request.data.copy()
    plus_one_names = data.pop("plus_ones", [])
    ticket_type_id = data.get("ticket_type")
    
    # 1. Validation & Inventory Check with Locking
    ticket_type = None
    if ticket_type_id:
        try:
            # Lock the ticket type row until this transaction finishes
            ticket_type = TicketType.objects.select_for_update().get(id=ticket_type_id)
            
            # Check availability including the main guest + plus ones
            total_tickets_needed = 1 + len(plus_one_names)
            
            if (ticket_type.sold + total_tickets_needed) > ticket_type.quantity:
                return Response(
                    {"error": f"Not enough tickets available. Remaining: {ticket_type.quantity - ticket_type.sold}"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        except TicketType.DoesNotExist:
             return Response({"error": "Invalid ticket type"}, status=status.HTTP_400_BAD_REQUEST)

    
    serializer = RSVPSerializer(data=data)
    if serializer.is_valid():
        parent_rsvp = serializer.save()
        
        # Link ticket type
        if ticket_type:
            parent_rsvp.ticket_type = ticket_type
            parent_rsvp.save()

        # Create structured child records for each plus-one
        for name in plus_one_names:
            if name.strip():
                RSVP.objects.create(
                    event=parent_rsvp.event,
                    ticket_type=ticket_type, # Plus one gets same ticket type
                    guestName=name.strip(),
                    guestEmail=parent_rsvp.guestEmail,  # Linked to primary contact
                    parent_rsvp=parent_rsvp,
                    isAttending="Yes",
                    payment_status=parent_rsvp.payment_status,
                )
        
        # Increment Sold Count
        if ticket_type:
            total_sold_now = 1 + len(plus_one_names)
            ticket_type.sold += total_sold_now
            ticket_type.save()
            
        # Payment Integration (M-Pesa STK Push)
        checkout_request_id = None
        if ticket_type and ticket_type.price > 0:
            # Assume guestName or a separate field has phone number for now, 
            # OR expect it in request.data. In real app, we need a dedicated phone field.
            # Ideally frontend sends "phone_number".
            phone_number = request.data.get("phone_number")
            
            if phone_number:
                try:
                    response = initiate_stk_push(
                        phone_number=phone_number,
                        amount=ticket_type.price,
                        account_reference=f"Ticket-{parent_rsvp.rsvp_token}"
                    )
                    
                    if "CheckoutRequestID" in response:
                        checkout_request_id = response["CheckoutRequestID"]
                        parent_rsvp.checkout_request_id = checkout_request_id
                        parent_rsvp.save()
                    elif "error" in response:
                         return Response({"error": response["error"]}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        # Log unexpected response but don't fail RSVP creation?
                        # Or fail it? Let's return error to user so they try again.
                         return Response({"error": "Failed to initiate M-Pesa payment"}, status=status.HTTP_400_BAD_REQUEST)

                except Exception as e:
                    return Response({"error": f"Payment initiation failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                 return Response({"error": "Phone number required for payment"}, status=status.HTTP_400_BAD_REQUEST)

        # Return the primary RSVP data
        response_data = RSVPSerializer(parent_rsvp).data
        if checkout_request_id:
            response_data["checkout_request_id"] = checkout_request_id
            response_data["message"] = "STK Push sent. Please check your phone."
            
        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def checkInGuest(request):
    """view for checking in a guest via token"""
    token = request.data.get("token")
    if not token:
        return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

    rsvp = get_object_or_404(RSVP, rsvp_token=token)

    # Check if the current user owns the event
    if rsvp.event.user != request.user:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    if rsvp.checked_in:
        return Response({"message": f"{rsvp.guestName} is already checked in"}, status=status.HTTP_200_OK)

    rsvp.checked_in = True
    rsvp.save()

    return Response(
        {
            "message": f"Successfully checked in {rsvp.guestName}",
            "guestName": rsvp.guestName,
            "checked_in": rsvp.checked_in,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getEventGuests(request, id):
    """view for fetching all guests for a specific event"""
    event = get_object_or_404(Event, id=id)

    # Check if the current user owns the event
    if event.user != request.user:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    # Get all primary RSVPs (those without parents)
    rsvps = RSVP.objects.filter(event=event, parent_rsvp=None).order_by("-created_at")
    serializer = RSVPSerializer(rsvps, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@csrf_exempt
def stripe_webhook(request):
    """Webhook to handle Stripe payment events"""
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        # Locate the RSVP and mark as paid
        try:
            rsvp = RSVP.objects.get(stripe_payment_intent=payment_intent['id'])
            rsvp.payment_status = "Paid"
            rsvp.save()
            print(f"Payment confirmed for RSVP {rsvp.id}")
        except RSVP.DoesNotExist:
            print(f"RSVP not found for payment intent: {payment_intent['id']}")

    return HttpResponse(status=200)

@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def mpesa_callback(request):
    """Callback for M-Pesa STK Push"""
    data = request.data
    
    # Log the callback data (In production use proper logging)
    print("M-Pesa Callback:", json.dumps(data))
    
    try:
        body = data.get("Body", {}).get("stkCallback", {})
        result_code = body.get("ResultCode")
        checkout_request_id = body.get("CheckoutRequestID")
        
        if result_code == 0:
            # Payment Successful
            metadata = body.get("CallbackMetadata", {}).get("Item", [])
            receipt_number = next((item.get("Value") for item in metadata if item.get("Name") == "MpesaReceiptNumber"), None)
            
            try:
                rsvp = RSVP.objects.get(checkout_request_id=checkout_request_id)
                rsvp.payment_status = "Paid"
                rsvp.mpesa_receipt_number = receipt_number
                rsvp.save()
                return Response({"message": "Payment confirmed"}, status=status.HTTP_200_OK)
            except RSVP.DoesNotExist:
                return Response({"error": "RSVP not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Payment Failed/Cancelled
            try:
                rsvp = RSVP.objects.get(checkout_request_id=checkout_request_id)
                rsvp.payment_status = "Cancelled" 
                rsvp.save()
            except:
                pass
            return Response({"message": "Payment failed or cancelled"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
