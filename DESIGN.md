# MashiniKa Design System

**MashiniKa** is a Kenyan automotive technology and roadside-assistance platform.

> Tagline: **YOUR CAR. OUR EXPERTISE.**

This document defines the design system implemented across the product. Every screen — marketing, customer, technician, dispatch, fleet, academy, admin — shares these tokens, components and rules so that a user always knows they are inside MashiniKa.

---

## 1. Brand

- **Personality**: Professional automotive expertise delivered through modern technology. Confident, calm, reassuring, practical, human.
- **What it is not**: a generic mechanic website, a flashy dealership, a template SaaS, a cyberpunk UI.
- **Core promise**: "When your car has a problem, these are the people I trust."

---

## 2. Design principles

1. **Usability** — the primary action must always be obvious.
2. **Trust** — verified credentials only; never invent ratings or guarantees.
3. **Clarity** — hierarchy answers: Where am I → What is happening → What do I need to know → What do I do next.
4. **Performance** — marketing pages stay light; dashboards stay dense but fast.
5. **Accessibility** — WCAG 2.2 AA target.
6. **Calm under pressure** — emergency flows are simple, immediate and never burdened by decoration or animation delays.

---

## 3. Design tokens

Tokens are implemented as CSS variables in `src/app/globals.css` under a Tailwind v4 `@theme inline` block.

### 3.1 Color

Light-first system. Orange is a **signal color** (actions, emergency, active states), never a flood.

| Token                | Value     | Usage                                         |
| -------------------- | --------- | --------------------------------------------- |
| `--background`       | `#F7F8FA` | Primary page background                       |
| `--card`             | `#FFFFFF` | Surface                                       |
| `--subtle`           | `#F1F3F5` | Secondary surface, muted fills                |
| `--foreground`       | `#111827` | Primary text                                  |
| `--muted-foreground` | `#667085` | Secondary text                                |
| `--border`           | `#E5E7EB` | Borders, dividers                             |
| `--primary`          | `#EA580C` | MashiniKa orange — primary actions, emergency |
| `--primary-hover`    | `#C2410C` | Orange hover                                  |
| `--success`          | `#16A34A` | Healthy, verified, active, completed          |
| `--danger`           | `#DC2626` | Danger, failure, destructive                  |
| `--warning`          | `#F59E0B` | Caution, attention                            |

Dark mode (`prefers-color-scheme`/class `.dark`): navy surfaces (`#111827` base), same orange primary.

### 3.2 Typography

- **Font family**: Geist, fallback Inter / system-ui / sans-serif.
- Headings: confident, not decorative. Use tracking-tight, balanced (`text-balance`).
- Avoid excessive uppercase. Uppercase is reserved for emergency actions, short labels, navigation emphasis and status.

**Scale** (Tailwind classes): display `text-5xl/6xl`, H1 `text-4xl/5xl`, H2 `text-2xl/3xl`, H3 `text-base`, body `text-sm/text-base`, label `text-xs uppercase tracking-wide text-muted-foreground`, caption `text-xs text-muted-foreground`.

### 3.3 Spacing

Base scale: `4 8 12 16 20 24 32 40 48 64 80 96`. Sections use a rhythm of `pt-16 pb-16 lg:pt-20 lg:pb-20` inside `max-w-7xl` containers with `px-4 sm:px-6 lg:px-8`. Marketing sections breathe; dashboards compress to `gap-3/4`.

### 3.4 Radius

| Token         | Value  | Usage                                    |
| ------------- | ------ | ---------------------------------------- |
| `--radius-sm` | `8px`  | Inputs, tables, compact controls         |
| `--radius`    | `12px` | Default cards, buttons                   |
| `--radius-lg` | `16px` | Hero cards, major panels, map containers |

Pills are reserved for statuses, tags, filters and compact metadata — never default buttons or cards.

### 3.5 Shadows

Restrained. Prefer `border + surface contrast + spacing` over floating shadows. Use `shadow-sm` at the card level and `shadow-2xl` only on hero maps/imagery.

### 3.6 Icons

Lucide-style: simple, consistent, functional. Automotive iconography (towing, engine, battery, tyre, diagnostics, fuel, inspection, maintenance) is allowed. No random decorative icons.

---

## 4. Core components

### 4.1 Buttons (`src/components/ui/button.tsx`)

- Variants: `default` (orange), `outline`, `ghost`, `destructive`.
- Sizes: `sm`, `default`, `lg`, plus `icon-sm`/`icon`.
- Base UI `render` prop is used for links: `<Button render={<Link href="..." />}>`.
- Emergency CTAs always use `default` with at least `sm` size; big touch targets on mobile.
- Never stack two primary buttons in one view.

### 4.2 Cards

`border border-border bg-card rounded-xl p-5 shadow-sm`. Hover interactions are color-only (`hover:border-primary/30`), never scale/skew.

### 4.3 Status system (`src/components/ui/status-badge.tsx`)

Tones wrap semantic states — never rely on color alone (always include text):

- `neutral`, `info`, `success`, `warning`, `danger`, `primary`
- `pulse` for live states (searching, en route)
- Domain statuses mapped in `SERVICE_REQUEST_STATUS_CONFIG` (`src/features/roadside/status.ts`).

### 4.4 Forms

Inputs: `rounded-lg border` with visible focus ring (`outline-ring/50`). Labels always present; descriptive error text below fields; never track only color.

### 4.5 Tables

Dense, readable: `text-sm`, compact padding, sticky headers where needed, `border-b` dividers. Used in dispatch, fleet and admin surfaces.

### 4.6 Navigation

- **Desktop**: logo left; brand links center/right (Services, Rescue, Care, Inspect, Buy, Trade, Fleet, Academy); right: Login + **GET HELP NOW** (dominant orange). Sticky, backdrop blur, `border-b`.
- **Mobile**: compact logo, theme toggle, emergency action always visible. Sheet menu for the rest. A fixed **bottom navigation** for the logged-in surface (Home, Services, Rescues, Academy, Help).
- Emergency action must remain reachable without scrolling.

### 4.7 Feedback

- Toasts via Sonner for quick confirmations.
- Loading skeletons, empty states (`EmptyState`) and error/retry states for every major screen.
- Motion: subtle and purposeful (scroll-reveal, pulses, progress transitions). No animation may delay an emergency action.

---

## 5. Layouts

### 5.1 Marketing

- Max width `max-w-7xl`; spacious 12-col grids on large screens with generous outer margins.
- Section rhythm: alternate transparent and `bg-subtle/60` bands separated by `border-t`.
- Primary CTAs: `GET HELP NOW`, `BOOK A MECHANIC`, `INSPECT A CAR`.
- Footer: dark, multi-column (Services, Company, Support, Legal, Contact) with emergency contact.

### 5.2 Operations / dashboards

- Dense `gap-3` card grids, metric rows, tables and live maps.
- Live tracking: map dominates (60–70%) with a dense side panel (30–40%) for status, ETA, technician, vehicle, contact, timeline.
- Dispatcher: map/table hybrid with KPI band.

---

## 6. Emergency UX rules

1. A stressed user must request help in seconds.
2. Steps: What happened → Location (USE MY LOCATION / ENTER MANUALLY) → Vehicle → Description → Photos → Review → **REQUEST HELP**.
3. Everything pre-filled from saved vehicle and location data; typing minimized.
4. Statuses are machine-driven: CREATED → LOCATION_CONFIRMED → SEARCHING_FOR_TECHNICIAN → TECHNICIAN_ASSIGNED → TECHNICIAN_EN_ROUTE → TECHNICIAN_ARRIVED → DIAGNOSING → REPAIRING → (TOW_REQUIRED/TOWING) → COMPLETED | CANCELLED.
5. Live tracking must feel trustworthy: technician identity, verified badge, rating, call/chat, timeline.

---

## 7. Content rules

- Realistic Kenyan copy (KES, M-Pesa, +254 numbers, local registration patterns, town names).
- **No lorem ipsum, no fake testimonials/ratings/stats/certifications.**
- Demo data is clearly labelled; system-generated vs technician-verified vs customer-provided data is kept separate.

---

## 8. Accessibility (WCAG 2.2 AA)

- Keyboard navigation and visible focus everywhere.
- Semantic HTML, proper labels, accessible dialogs/sheets.
- Status not conveyed by color alone; sufficient contrast; large touch targets; readable typography.
- Respect `prefers-reduced-motion` (global CSS media query).

---

## 9. Performance

- Optimized images, lazy loading, code splitting, marketing pages stay static when possible.
- No video backgrounds, no heavy client bundles on public pages.
- Designed for Kenyan mobile networks and lower-end Android devices.

---

## 10. Motion

- Durations 150–700ms; easings `easeOut`; scroll-reveal via `Reveal` component (`src/components/marketing/reveal.tsx`).
- Pulse for live status; progress transitions for request flow; `map-ping` for map markers.
- Reduced-motion is always honored.
