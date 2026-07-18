# UI/UX Design System & Brief — WILL-BE-THERE

## 1. Visual Design Identity & Principles

- **Aesthetic Direction:** Modern, vibrant, premium enterprise SaaS interface featuring sleek dark/light adaptive themes, high contrast elements, subtle card elevation, glassmorphism accents, and micro-animations.
- **Brand Palette:**
  - `Primary / Brand`: Royal Indigo (`#4F46E5`), Deep Emerald (`#059669`)
  - `Neutral Dark`: Slate 900 (`#0F172A`), Slate 800 (`#1E293B`)
  - `Neutral Light`: Slate 50 (`#F8FAFC`), Pure White (`#FFFFFF`)
  - `Semantic Colors`: Success Emerald (`#10B981`), Warning Amber (`#F59E0B`), Danger Rose (`#F43F5E`), Info Sky (`#0EA5E9`)

## 2. Typography Scale (Inter / Plus Jakarta Sans)

- `Display Headings`: 36px / 44px Line Height (Bold)
- `H1 / Page Titles`: 28px / 36px Line Height (Bold)
- `H2 / Section Headers`: 22px / 28px Line Height (SemiBold)
- `H3 / Card Titles`: 18px / 24px Line Height (SemiBold)
- `Body Large`: 16px / 24px Line Height (Regular / Medium)
- `Body Default`: 14px / 20px Line Height (Regular)
- `Caption / Subtext`: 12px / 16px Line Height (Medium)

## 3. Component Architecture & Design Tokens

- **Design Tokens:** Defined in `styles/tokens.json` and mirrored in `tailwind.config.js` and CSS variables (`--color-primary`, `--radius-lg`, `--shadow-md`).
- **Atoms:** Buttons (Primary, Secondary, Ghost, Danger), Input Fields, Checkboxes, Toggle Switches, Badges, Tooltips, Avatars.
- **Molecules:** Search Bar with Filters, RSVP Stat Cards, Message Cards, Item Checklist Row, Event Header.
- **Organisms:** Navigation Bar / Sidebar, Guest Table with Pagination & Bulk Actions, Event Wizard, Analytics Overview Charts.
- **Templates:** Dashboard Shell, Event Details Page, Public RSVP Landing Page.
