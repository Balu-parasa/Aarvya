# Sahaaya+ | Victim Well-Being & Support Network

> **A multi-role trauma-informed well-being monitoring platform aligned with NHAA & Integrated National Portal.**

---

## Architecture Overview

The system is cleanly separated into two distinct layers:

```
sahaaya-clone/
├── app/                                # Frontend (Next.js 16 + React 19 + TypeScript + Tailwind CSS)
│   ├── (portals)
│   │   ├── admin/                      # Rehabilitation & District Oversight Portal
│   │   ├── counsellor/                 # Counsellor Command Centre & Live Alerts
│   │   └── victim/                     # Victim Confidential Wellness & Companion Hub
│   ├── (auth & onboarding)
│   │   ├── login/                      # Exact Base44 Authenticated Login View
│   │   ├── register/                   # User Registration View
│   │   ├── reset-password/             # Password Recovery View
│   │   └── onboarding/                 # 4-Step Animated Check-In & Baseline Setup
│   ├── (information & safeguards)
│   │   ├── architecture/               # Consent-first Technical Architecture & Tech Stack
│   │   └── privacy/                    # Privacy By Design & Algorithmic Safeguards
│   ├── components/                     # Modular Reusable UI Components
│   │   ├── admin/                      # Rehab Pipeline & Compensation Components
│   │   ├── auth/                       # Route Guards & Role Pickers
│   │   ├── charts/                     # Recharts Visualizations & Trend Analytics
│   │   ├── counsellor/                 # Priority Cases Table, Live Alerts Panel & Case Modal
│   │   ├── layout/                     # TopNavigation, Sidebar, Footer
│   │   ├── onboarding/                 # Step-by-Step Onboarding Components (Language, Consent, Profile, Baseline, Results)
│   │   ├── ui/                         # Atomic Design Badges, Buttons, Inputs, Modals
│   │   └── victim/                     # Actions Grid & Interactive Resource Modals
│   ├── context/                        # Global Authentication & Role Context
│   ├── hooks/                          # Reusable React Hooks (e.g. useIsMounted)
│   ├── lib/                            # API Client & Backend Service Integrations
│   ├── types/                          # Shared TypeScript Interfaces & Types
│   ├── globals.css                     # Editorial Typography & Keyframe Animations
│   └── page.tsx                        # Main Landing Page (3 Unified Portals)
│
├── backend/                            # Backend (Python 3.12 + Django 6.x + Django REST Framework)
│   ├── core/                           # Primary Application Module
│   │   ├── management/commands/        # Database Seed Commands (seed_data.py)
│   │   ├── migrations/                 # Schema Migrations
│   │   ├── models.py                   # User, PriorityCase, LiveAlert, Rehabilitation, Compensation, Checkin
│   │   ├── serializers.py              # DRF Model & Data Serializers
│   │   ├── tests.py                    # Comprehensive Automated Test Suite (9/9 Passed)
│   │   ├── urls.py                     # API Routing Endpoints (/api/...)
│   │   └── views.py                    # RESTful View Controllers with Auth & Fallbacks
│   ├── sahaaya_backend/                # Django Project Settings & ASGI/WSGI Config
│   ├── db.sqlite3                      # SQLite Database Engine
│   ├── manage.py                       # Django CLI Command Manager
│   └── requirements.txt                # Python Dependencies
│
└── public/                             # Static Assets & Icons
```

---

## The 3 Supported Roles

| Role | Demo Credentials | Primary Purpose | Landing Destination |
| :--- | :--- | :--- | :--- |
| **Victim** | `asha@sahaaya.gov.in` / `Asha@123` | Gentle self-care, AI companion chat, translator, somatic check-in | `/victim` |
| **Counsellor** | `baluparasa239@gmail.com` / `Balu@123` | Case priority triage, live explainable alerts, IVRS outbound calls | `/counsellor` |
| **Admin** | `admin@sahaaya.gov.in` / `Admin@123` | Vocational training pipelines, state compensation disbursements, metrics | `/admin` |

---

## Quickstart

### 1. Run the Python / Django Backend
```powershell
cd backend
python manage.py runserver 127.0.0.1:8000
```
Backend API will be accessible at `http://127.0.0.1:8000/api/`.

To run backend tests:
```powershell
cd backend
python manage.py test
```

### 2. Run the Next.js / React Frontend
```powershell
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## Features & Highlights

- **Zero Breaking UI Changes**: Editorial serif `Newsreader` font paired with modern clean sans-serif typography, rounded cards, and smooth CSS transitions.
- **Slide-and-Fade Step Transitions**: Smooth directional animated transitions for each step of the victim onboarding check-in.
- **Dual Layer Resilience**: The frontend automatically connects to the live Django REST backend, with instant graceful client demo fallback if the backend service is offline.
- **Modular Component Separation**: Monolithic view files decomposed into clean, single-responsibility components under `app/components/`.
