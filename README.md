# Aarvya | Victim Well-Being & Support Network

A multi-role, trauma-informed well-being monitoring platform aligned with NHAA (14566) & Integrated National Portal standards.

---

## The 2 Executive Aesthetic Themes

Aarvya features two distinct, executive-grade light-mode themes with instant live preview & persistence:

1. **🌿 Botanical Eucalyptus (Main / Flagship Theme)**
   - *Digital Therapeutics Calm (Headspace Health & Apple Health inspired)*
   - **Primary Canvas**: Warm Alabaster (`#FAF9F6`) with organic ambient radial mesh gradients.
   - **Card Surfaces**: Pure Linen (`#FFFFFF`) with `1px solid #EAE6DF` hairline borders and diffused soft shadows.
   - **Primary Brand & CTAs**: Deep Eucalyptus (`#134E4A`) (Hover: `#0F3F3C`).
   - **Secondary Accent**: Soft Sage Mist (`#E6F2EF`) for incoming chat bubbles, status pills, and positive tags.
   - **Typography**: Charcoal Ink (`#182220`) for high-contrast, glare-free readability.
   - **Moderate Alert**: Warm Ochre / Sand (`#D97706` / `#FEF3C7`).
   - **Critical Escalation**: Muted Terracotta (`#B91C1C` / `#FEE2E2`).

2. **🧭 Royal Indigo & Cashmere (Executive Trust Theme)**
   - *Authoritative Serenity & Clinical Precision*
   - **Primary Canvas**: Cashmere Silk (`#F8FAFD`) with celestial azure radial mesh gradients.
   - **Card Surfaces**: Crisp Porcelain (`#FFFFFF`) with `1px solid #DCE4EF` ice-slate hairline borders.
   - **Primary Brand & CTAs**: Deep Royal Indigo (`#1D3A8A`) (Hover: `#172E6E`).
   - **Secondary Accent**: Soft Glacier Azure (`#E8F0FE`) for incoming chat bubbles and cool status tags.
   - **Typography**: Midnight Ink (`#0F1D30`) for authoritative executive contrast.
   - **Moderate Alert**: Amber Gold (`#D97706` / `#FEF3C7`).
   - **Critical Escalation**: Crimson Coral (`#DC2626` / `#FEE2E2`).

---

## Project Structure

```
Aarvya/
├── client/                     # Frontend (Next.js 16 + React 19 + TypeScript + Tailwind CSS)
│   ├── app/                    # Portals: /victim, /counsellor, /admin, /onboarding, /login
│   ├── components/             # Reusable UI, Layout & Portal Components
│   ├── context/                # ThemeProvider & AuthProvider
│   ├── hooks/                  # Custom React Hooks
│   ├── lib/                    # API service client
│   ├── public/                 # Static assets & icons
│   ├── types/                  # Shared TypeScript interfaces
│   ├── package.json
│   └── tsconfig.json
│
├── server/                     # Backend (Python 3.12 + Django 6.1 + DRF)
│   ├── core/                   # Models, Serializers, Views, URLs, and Tests
│   ├── Aarvya_backend/          # Django Project Settings & Configuration
│   ├── db.sqlite3              # Pre-seeded SQLite Database
│   ├── manage.py               # Django Management CLI
│   └── requirements.txt        # Python Dependencies
│
├── .gitignore
└── README.md
```

---

## User Roles & Demo Credentials

| Role | Demo Credentials | Primary Purpose | Landing Portal |
| :--- | :--- | :--- | :--- |
| **Victim** | `asha@aarvya.gov.in` / `Asha@123` | Self-care check-ins, AI companion chat, multi-language assistance | `/victim` |
| **Counsellor** | `baluparasa239@gmail.com` / `Balu@123` | Priority case triage, live explainable alerts, IVRS outbound calls | `/counsellor` |
| **Admin** | `admin@aarvya.gov.in` / `Admin@123` | District oversight, vocational training pipelines, compensation tracking | `/admin` |

*(Legacy emails `asha@sahaaya.gov.in` and `admin@sahaaya.gov.in` also remain fully supported).*

---

## Quickstart Guide

### 1. Run the Backend (`server`)

```powershell
cd server
python manage.py runserver 127.0.0.1:8000
```

- API Base: `http://127.0.0.1:8000/api/`
- Test Suite: `python manage.py test`

### 2. Run the Frontend (`client`)

```powershell
cd client
npm run dev
```

- Web Portal: `http://localhost:3000`
