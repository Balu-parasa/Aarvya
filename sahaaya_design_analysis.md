# Sahaaya+ Design Analysis Report

**Generated:** 2026-11-21
**Target Application:** https://sahaaya.base44.app/

---

## 1. COLORS

### Primary Palette

| Token | Value (RGB) | Hex | Usage |
|-------|-------------|-----|-------|
| **Primary Background** | `rgb(248, 250, 252)` | `#F8FAFC` | Page background (slate-50) |
| **Card Background** | `rgb(255, 255, 255)` | `#FFFFFF` | Primary cards, forms |
| **Portal Card Background** | `rgb(248, 250, 252)` | `#F8FAFC` | Dashboard/portal cards (same as page bg) |
| **Primary Text** | `rgb(20, 35, 52)` | `#142334` | Headings, body text (slate-900) |
| **Secondary Text** | `rgb(51, 65, 85)` | `#334155` | Button text in portals (slate-700) |
| **Muted Text** | `rgb(100, 116, 139)` | `#64748B` | Placeholders, secondary labels (slate-500) |

### Accent Colors

| Token | Value (RGB) | Hex | Usage |
|-------|-------------|-----|-------|
| **Navy (Primary Brand)** | `rgb(15, 23, 42)` | `#0F172A` | Primary buttons, CTAs, active states (slate-950) |
| **Navy-700** | `rgb(51, 65, 85)` | `#334155` | Primary button hover |
| **Navy-200** | `rgb(203, 213, 225)` | `#CBD5E1` | Outline button borders |
| **Alert (Red)** | `rgb(220, 38, 38)` | `#DC2626` | Emergency/SOS buttons, critical alerts (red-600) |
| **Alert-700** | `rgb(185, 28, 28)` | `#B91C1C` | Alert button hover |
| **Alert-50** | `rgb(254, 242, 242)` | `#FEF2F2` | Alert card backgrounds |
| **Alert-100** | `rgb(254, 226, 226)` | `#FEE2E2` | Alert card borders |
| **Care (Teal/Green)** | `rgb(22, 163, 124)` | `#16A34C` | Success states, engagement metrics (emerald-600) |

### Border & Divider Colors

| Token | Value (RGB) | Hex | Usage |
|-------|-------------|-----|-------|
| **Primary Border** | `rgb(219, 226, 235)` | `#DBE2EB` | Card borders, input borders (slate-200) |
| **Input Border** | `rgb(209, 219, 230)` | `#D1DBE6` | Form input borders |
| **Portal Border** | `rgb(226, 232, 240)` | `#E2E8F0` | Portal button borders (slate-200) |

### Gradients

| Name | CSS | Colors |
|------|-----|--------|
| **Hero Gradient** | `linear-gradient(rgb(238, 243, 249), rgb(248, 250, 252))` | Navy-50 `#EEF3F9` → Background `#F8FAFC` |
| **Victim Portal Gradient** | `linear-gradient(rgba(238, 243, 249, 0.7), rgb(248, 250, 252), rgb(248, 250, 252))` | Navy-50/70 → Background → Background |
| **Onboarding Gradient** | `bg-gradient-to-b from-navy-50 to-background` | Navy-50 → Background |

---

## 2. TYPOGRAPHY

### Font Family
```
Figtree, "Noto Sans Devanagari", ui-sans-serif, system-ui, sans-serif
```

- **Primary:** Figtree (geometric sans-serif)
- **Fallback for Devanagari:** Noto Sans Devanagari
- **System fallbacks:** ui-sans-serif, system-ui, sans-serif

### Font Sizes (from computed styles)
| Element | Size | Usage |
|---------|------|-------|
| Base/Body | 16px | Default paragraph text |
| H1 | ~48px (3rem) | Page titles, hero headings |
| H2 | ~36px (2.25rem) | Section headings |
| H3 | ~24px (1.5rem) | Card titles, subsection headings |
| Button | 14px (0.875rem) | Button text (text-sm) |
| Small/Caption | 12px (0.75rem) | Labels, badges, metadata |

### Font Weights
- **Regular:** 400 (body text)
- **Medium:** 500 (buttons, labels)
- **Semibold:** 600 (headings, important numbers)
- **Bold:** 700 (hero numbers, critical alerts)

---

## 3. BORDER RADIUS

| Component | Radius | CSS Value |
|-----------|--------|-----------|
| **Standard Cards** | 16px | `rounded-2xl` / `rounded-[28px]` for feature cards |
| **Soft Cards (portals)** | 9999px (fully rounded) | `rounded-full` / `rounded-[9999px]` |
| **Buttons (primary)** | 9999px (pill) | `rounded-full` |
| **Buttons (secondary/outline)** | 16px | `rounded-2xl` / `rounded-full` for small |
| **Inputs** | 14px / 16px | `rounded-md` (14px) / `rounded-full` |
| **Badges/Tags** | 9999px | `rounded-full` |

---

## 4. SHADOWS

| Level | CSS | Usage |
|-------|-----|-------|
| **Card Shadow (default)** | `rgba(0, 0, 0, 0.05) 0px 1px 2px 0px` | Subtle elevation on cards |
| **Soft Card** | `none` (border only) | Portal dashboard cards |
| **Hover Transform** | `hover:-translate-y-1 transition-transform` | Feature cards on home page |
| **Focus Ring** | `focus-visible:ring-1 focus-visible:ring-ring` | Accessibility focus states |

---

## 5. COMPONENTS

### 5.1 Navigation

**Top Navigation (Landing Page)**
- Logo: "Sahaaya+" with tagline "Well-being support"
- Right side: Language selector (English), "Counsellor Login" (ghost), "Start Secure Check-in" (primary), "Emergency Support SOS" (alert)
- Mobile: Hamburger menu

**Sidebar Navigation (Portal Pages)**
- Fixed left sidebar (lg: visible, hidden on mobile)
- Logo + "Switch demo role" link at bottom
- Nav items with icons: Overview, Priority cases, My caseload, Alerts, Intervention logs, Referrals, Settings
- Additional links: Privacy & safety, Architecture

**Portal-Specific Nav**
- **Counsellor:** Overview, Priority cases, My caseload, Alerts, Intervention logs, Referrals, Settings
- **Legal:** Case coordination, Privacy & safety, Architecture
- **District:** Coordination, Privacy & safety, Architecture
- **State:** Policy insights, Privacy & safety, Architecture

### 5.2 Cards

**Soft Card (Primary Pattern)**
```css
.soft-card {
  background: white;
  border: 1px solid #DBE2EB;
  border-radius: 9999px;  /* or 16px for standard */
  padding: 1.5rem;  /* p-5/p-6 */
  box-shadow: none;  /* or subtle shadow */
}
```

**Variants:**
- **Feature Card (Home):** `rounded-[28px] p-6` with hover lift animation
- **KPI Card:** `soft-card p-5` with large number + label
- **Data Card:** `soft-card overflow-hidden` for tables
- **Alert Card:** `rounded-2xl bg-alert-50 border border-alert-100`
- **Portal Action Card:** `soft-card p-4 flex flex-col gap-3 hover:-translate-y-0.5`

### 5.3 Buttons

| Variant | Classes | Colors | Usage |
|---------|---------|--------|-------|
| **Primary (Navy)** | `bg-navy text-white hover:bg-navy-700 rounded-full h-9 px-4` / `h-14 px-7` | Navy `#0F172A` → `#334155` | Main CTAs |
| **Primary Large** | `py-2 h-14 px-7 rounded-full text-base` | Navy | Hero CTAs |
| **Alert (SOS)** | `bg-alert text-white hover:bg-alert-700 rounded-full h-9 px-4` | Red `#DC2626` → `#B91C1C` | Emergency actions |
| **Ghost/Secondary** | `border border-input bg-transparent hover:bg-accent rounded-full` | Transparent → Accent bg | "Counsellor Login" |
| **Outline** | `border border-navy-200 text-navy hover:bg-navy-50 rounded-full` | Navy border/text | "How it protects privacy" |
| **Small Action** | `h-8 px-3 text-xs rounded-full` | Various (alert, navy) | Table row actions |
| **Filter Tags** | `px-3 py-1.5 rounded-full text-xs font-semibold` | Active: `bg-navy text-white` / Inactive: `bg-navy-50 text-navy` | Filter pills |

### 5.4 Input Fields

```css
input {
  width: 100%;
  height: 48px (h-12);
  padding: 0 12px (pl-10 for icon);
  border: 1px solid #D1DBE6;
  border-radius: 14px (rounded-md);
  background: transparent;
  font-size: 16px (text-base);
  placeholder color: muted-foreground;
  focus: ring-1 ring-ring outline-none;
}
```

- Email: leading icon (mail)
- Password: leading icon (lock), trailing toggle
- Placeholder: "you@example.com", "••••••••"

### 5.5 Badges/Tags

| Type | Style | Example |
|------|-------|---------|
| **Risk Level** | `rounded-full px-3 py-1.5 text-xs font-semibold` | Critical (alert bg), High (navy bg), Active (navy-50) |
| **Status** | Same as above | All/Active/Urgent/Pending |
| **Language Selector** | `rounded-full bg-white border border-input h-10 w-[132px]` | Dropdown with flag |

### 5.6 Tables

- **Container:** `soft-card overflow-hidden`
- **Headers:** Not explicitly styled (uses native table)
- **Rows:** Hover states, action buttons inline
- **Columns:** Case ID, Risk level, Score, Trend, Top alert reasons, Last contact, Action

### 5.7 Charts

**Library:** Recharts (React)
- **Area Charts:** District trends, outcome trends (with gradients)
- **Bar Charts:** Counsellor workload, support demand heatmap
- **Line Charts:** High-risk trends by district
- **Composed Charts:** Multiple series with legends
- **Tooltips:** Custom `recharts-tooltip-wrapper` with label
- **Responsive:** `recharts-responsive-container` wrapper

### 5.8 Alerts/Notifications

- **Critical Alert Card:** Red border background (`bg-alert-50 border-alert-100`)
- **SOS Button:** Fixed position or prominent header button, red pill
- **Toast/Inline:** Not observed in exploration

### 5.9 Language Selector

- **Desktop:** `rounded-full bg-white border h-10 w-[132px]` dropdown
- **Mobile:** Full-width `rounded-full bg-white` at bottom
- **Options:** English, Hindi (हिंदी), Regional (Coming via Bhashini)

---

## 6. PAGES PER ROLE

### 6.1 Landing Page (`/`)

**Structure:**
1. **Hero Section**
   - H1: "You deserve support at every step."
   - H2: "Gentle, regular check-ins. Real people when it matters."
   - Dual CTA: "Start secure check-in" (primary navy) + "How it protects your privacy" (outline)
   - Emergency SOS button (alert red)

2. **Sahaaya Companion Demo**
   - Chat interface card (`rounded-[28px]`)
   - Distress score badge (52/100) with "Moderate — support available"
   - "Reviewed by trained counsellor" tag

3. **How It Works (5 Steps)**
   - 01 Consent-based check-in
   - 02 Chat, voice or symptom response
   - 03 AI-supported well-being analysis
   - 04 Dynamic Distress Score
   - 05 Human counsellor support
   - Each in `soft-card p-6 relative` with number badge

4. **Six Portals Grid**
   - Victim demo, Counsellor demo, Rehabilitation demo, Legal aid demo, District officer demo, State admin demo
   - `soft-card p-6 group hover:-translate-y-1`

5. **Footer**
   - "Built around dignity, choice and safety."
   - "Six portals, one support network."

### 6.2 Auth Pages

#### Login (`/login`)
- Centered card `bg-card rounded-2xl shadow-sm border border-border p-8` (max-w-md)
- "Welcome back" H1
- "Continue with Google" button (ghost, full width)
- Divider "or"
- Email + Password fields (with icons)
- "Forgot password?" link
- "Log in" button (primary navy, full width, h-12)

#### Register (`/register`)
- Same layout as login
- H1: "Create your account"
- "Create account" button (primary navy)
- Additional "Confirm Password" field

### 6.3 Victim Portal (`/victim`)

**Layout:** Single page, no sidebar, top bar with language + SOS

**Sections:**
1. **Greeting:** "Namaste, Asha. How are you feeling today?"
2. **Dynamic Distress Score Card** (large, prominent)
   - Score: 52/100
   - Label: "Moderate — Support available"
   - Trend: "increased slightly since last check-in"
   - Recharts area chart showing history
3. **"What would help right now?"** - Action grid (3 cols desktop)
   - Talk to Sahaaya chatbot
   - AI voice assistant
   - AI translator
   - Start voice check-in
   - Face detection wellness check
   - Tell us about body symptoms
   - Mind games for wellbeing
   - Start 2-minute calming exercise
   - Request counsellor call
   - My support plan
   - My case history
   - Find help near me
   - Care reminders
4. **Next Check-in Card:** "Tomorrow, 10:30 AM" + "Change time" button
5. **Emergency Banner:** "I feel unsafe / need urgent support" (alert-50 bg)

### 6.4 Counsellor Portal (`/counsellor`)

**Layout:** Full sidebar navigation + top header

**Tabs/Views (via query params):**
- `?view=overview` (default)
- `?view=priority`
- `?view=caseload`
- `?view=alerts`
- `?view=logs`
- `?view=referrals`
- `?view=settings`

**Overview Dashboard:**
1. **KPI Row (4 cards):**
   - 3 Critical alerts
   - 8 High-priority follow-ups due today
   - 5 Pending referrals
   - 42 Completed check-ins today

2. **Priority Cases Table:**
   - Columns: Case ID, Risk level, Score, Trend, Top alert reasons, Last contact, Action
   - Row actions: "Open case" (alert), "Contact" (navy), "Schedule" (navy)

3. **Live Alerts Panel:**
   - Real-time alert feed with timestamps

### 6.5 Legal Portal (`/legal`)

**Layout:** Sidebar + top tabs (all/active/urgent/pending)

**Sections:**
1. **KPI Row:**
   - 5 Active cases
   - 1 Urgent hearings
   - 3 Lawyers assigned
   - 4 Chargesheets filed

2. **Case Pipeline Table:**
   - Case ID, Status, Next hearing, Court, Lawyer

3. **Upcoming Hearings (7 days)**

4. **Legal-aid Compliance Metrics:**
   - Lawyer assigned within 24h: 91%
   - Chargesheet filed on time: 78%
   - Hearing attendance supported: 85%
   - Compensation petition filed: 64%

### 6.6 District Portal (`/district`)

**Layout:** Sidebar + coordination dashboard

**Sections:**
1. **KPI Row:**
   - 4 High/critical cases need action today
   - 87% Counsellor follow-up compliance
   - 11 Pending legal-aid referrals
   - 2 Protection concerns in queue

2. **Cases Requiring Action Today** (list with risk badges)

3. **Counsellor Follow-up Compliance** (horizontal bar chart - Recharts)

4. **Compensation/Rehabilitation Bottleneck Tracker** (funnel visualization)

5. **Protection Concern Queue**

6. **Aggregated District Trend** (area chart - Recharts)

7. **District Well-being Support Demand** (heatmap/choropleth - Recharts)

### 6.7 State Portal (`/state`)

**Layout:** Sidebar + policy insights dashboard

**Sections:**
1. **KPI Row:**
   - 6.4 hrs Avg referral-response time (↓ 1.2 hrs vs last quarter)
   - 78% Check-in engagement rate
   - 43 Avg counsellor caseload
   - 64% Improved after intervention

2. **High-risk Trend by District** (multi-line area chart)

3. **Counsellor Workload** (bar chart by district)

4. **Most Frequent Support Needs** (horizontal bar chart)

5. **Delayed Compensation/Rehabilitation** (district breakdown)

6. **Outcome Trend After Interventions** (cohort line chart)

### 6.8 Onboarding (`/onboarding`)

**Layout:** Centered card with gradient background (`from-navy-50 to-background`)

**Flow:**
1. **Language Selection** (3 cards: English, Hindi, Regional)
2. **H1:** "Your choice, your privacy"
3. **Actions:** "Exit securely" (ghost) + "Continue" (primary navy)

---

## 7. FEATURES PER ROLE

| Feature | Victim | Counsellor | Legal | District | State |
|---------|--------|------------|-------|----------|-------|
| Check-in (chat/voice/symptom) | ✅ | - | - | - | - |
| AI Chatbot | ✅ | - | - | - | - |
| AI Voice Assistant | ✅ | - | - | - | - |
| AI Translator | ✅ | - | - | - | - |
| Face Detection Wellness | ✅ | - | - | - | - |
| Calming Exercises | ✅ | - | - | - | - |
| Mind Games | ✅ | - | - | - | - |
| Distress Score | ✅ | ✅ (view) | - | ✅ (aggregated) | ✅ (trends) |
| Counsellor Call Request | ✅ | ✅ (receive) | - | - | - |
| Support Plan | ✅ | ✅ (manage) | - | - | - |
| Case History | ✅ | ✅ | ✅ | ✅ | ✅ |
| Priority Cases Table | - | ✅ | - | ✅ | - |
| Alerts Feed | - | ✅ | - | - | - |
| Intervention Logs | - | ✅ | - | - | - |
| Referrals Management | - | ✅ | - | ✅ | - |
| Case Coordination | - | - | ✅ | - | - |
| Hearing Tracking | - | - | ✅ | - | - |
| Legal-aid Compliance | - | - | ✅ | ✅ | - |
| Compensation Tracking | - | - | - | ✅ | ✅ |
| Protection Concerns | - | - | - | ✅ | - |
| District Trends | - | - | - | ✅ | ✅ |
| Policy Insights | - | - | - | - | ✅ |
| Resource Allocation | - | - | - | - | ✅ |
| Multi-language (EN/HI) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Emergency SOS | ✅ | ✅ | - | - | - |

---

## 8. SCREENSHOTS CAPTURED

| File | Description |
|------|-------------|
| `screenshots/01_landing_page.png` | Full landing page |
| `screenshots/02_login_page.png` | Login form |
| `screenshots/03_register_page.png` | Registration form |
| `screenshots/home_page.png` | Home page (authenticated) |
| `screenshots/counsellor_page.png` | Counsellor overview |
| `screenshots/onboarding_page.png` | Onboarding flow |
| `screenshots/portal__victim.png` | Victim portal dashboard |
| `screenshots/portal__counsellor_dashboard.png` | Counsellor dashboard (404) |
| `screenshots/portal__legal.png` | Legal case coordination |
| `screenshots/portal__district.png` | District coordination |
| `screenshots/portal__state.png` | State policy insights |

---

## 9. DESIGN SYSTEM SUMMARY

### Visual Language
- **Soft, approachable** - Fully rounded cards (9999px), generous padding
- **Calm color palette** - Slate/navy base with semantic accent colors (navy=primary, red=alert, emerald=care)
- **High readability** - Figtree font, 16px base, strong contrast ratios
- **Consistent spacing** - 4px grid (p-4, p-5, p-6, gap-3, gap-4)

### Interaction Patterns
- **Hover lift** on feature cards (`hover:-translate-y-1`)
- **Pill buttons** for primary actions
- **Full-width mobile buttons** (`w-full sm:w-auto`)
- **Focus-visible rings** for accessibility
- **Smooth transitions** (200ms default)

### Responsive Breakpoints
- **Mobile:** < 640px (hidden sidebar, stacked buttons, full-width)
- **Tablet:** 640px - 1024px (some sidebar items hidden)
- **Desktop:** > 1024px (full sidebar, multi-column grids)

### Accessibility Notes
- Semantic HTML (nav, aside, main, header)
- Focus-visible outlines
- ARIA labels on icon buttons
- Color + text for status (not color alone)
- Hindi/Devanagari font support

---

## 10. CSS CUSTOM PROPERTIES (Inferred)

```css
:root {
  --background: #F8FAFC;           /* slate-50 */
  --foreground: #142334;           /* slate-900 */
  --card: #FFFFFF;                 /* white */
  --card-foreground: #142334;
  --primary: #0F172A;              /* slate-950 (navy) */
  --primary-foreground: #FFFFFF;
  --secondary: #F1F5F9;            /* slate-100 */
  --secondary-foreground: #142334;
  --muted: #F1F5F9;
  --muted-foreground: #64748B;     /* slate-500 */
  --accent: #F1F5F9;
  --accent-foreground: #142334;
  --destructive: #DC2626;          /* red-600 (alert) */
  --destructive-foreground: #FFFFFF;
  --border: #DBE2EB;               /* slate-200 */
  --input: #D1DBE6;                /* slate-200 */
  --ring: #0F172A;                 /* focus ring */
  --radius: 0.5rem;                /* 8px base */
  --radius-lg: 1rem;               /* 16px */
  --radius-full: 9999px;           /* pill */
}
```

---

*End of Report*