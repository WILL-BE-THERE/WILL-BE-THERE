# Backend Schema & Data Architecture — WILL-BE-THERE

## 1. Relational Entity ERD Overview

```
+----------------+       1:N       +------------------+
|      User      | ───────────────> |      Event       |
+----------------+                 +------------------+
| id (PK)        |                 | id (PK)          |
| email          |                 | host_id (FK)     |
| password       |                 | title            |
| first_name     |                 | date_time        |
| last_name      |                 | location         |
| is_active      |                 | image_url        |
+----------------+                 | max_capacity     |
                                   | ticket_price     |
                                   | is_full          |
                                   | display_guests   |
                                   | display_count    |
                                   | display_messages |
                                   +------------------+
                                             │ 1:N
             ┌───────────────────────────────┴───────────────────────────────┐
             ▼                                                               ▼
+------------------------+                                 +-------------------+
|       GuestRSVP        |                                 |     EventItem     |
+------------------------+                                 +-------------------+
| id (PK)                |                                 | id (PK)           |
| event_id (FK)          |                                 | event_id (FK)     |
| guest_name             |                                 | item_name         |
| email                  |                                 | target_quantity   |
| attending_status       |                                 | current_quantity  |
| plus_ones_count        |                                 +-------------------+
| plus_ones_names        |
+------------------------+
             │ 1:1
             ▼
+------------------------+
| CongratulatoryMessage  |
+------------------------+
| id (PK)                |
| rsvp_id (FK)           |
| message_text           |
| is_approved            |
+------------------------+
```

## 2. Security & Access Rules

- **Host Data:** Event mutation endpoints (`POST /api/events/`, `PUT /api/events/:id/`, `DELETE`) restricted to authenticated host via JWT.
- **Guest Access:** Public read for active event pages; public `POST /api/rsvps/` with email validation.
- **Location Privacy:** Location field hidden in public API payload until RSVP submission returns `attending=True`.
