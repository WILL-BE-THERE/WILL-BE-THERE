# Application Flow (APP_FLOW) — WILL-BE-THERE

## 1. High-Level Flow Overview

```
[Guest Entry] ────► [Public Event Page] ───► [RSVP Form] ───► [Confirmation & Location]
                                                                  ▲
[Host Entry]  ────► [Login / Auth]      ───► [Host Dashboard] ───┴──► [Create / Edit Event]
                                                 │
                                                 ├──► [Guest List & Filter]
                                                 ├──► [Message Moderation]
                                                 └──► [Item List Manager]
```

## 2. Core User Flows

### Flow A: Guest RSVP (Public Journey)

1. Guest visits shared link `/event/:id`.
2. Views public details: Title, Host, Date/Time, Image, Item list, Congratulatory wall (if enabled by host).
3. Clicks "RSVP Now" modal/drawer:
   - Inputs Name & Email.
   - Selects Attending / Not Attending.
   - (If Attending) Option for Plus-Ones (count & names).
   - (If Attending) Selects items to bring.
   - (If Attending) Types optional congratulatory message.
4. Submits RSVP:
   - Receives instant on-screen confirmation card with exact event location & Add-to-Calendar triggers.
   - Automated email dispatched with location details.

### Flow B: Host Event Creation & Management (Dashboard Journey)

1. Host logs in at `/login` or registers at `/register`.
2. Redirects to `/dashboard` displaying event cards, active metrics, guest totals, and quick actions.
3. Clicks "+ Create Event":
   - Step 1: Basic details (Title, Description, Square Image Upload, Date/Time, Location).
   - Step 2: Capacity & Ticket price settings.
   - Step 3: Privacy & Display Toggles (Guest list visibility, Total count, Congratulatory wall).
   - Step 4: Items-to-bring checklist creation.
4. Publishes event -> Generates shareable link & QR Code.
5. Manages RSVPs in `/dashboard/events/:id`:
   - Filter guests by status.
   - Moderate congratulatory messages (Approve / Hide).
   - Export guest CSV.
