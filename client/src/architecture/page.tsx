'use client';

import React from 'react';
import Link from '@/next-compat';
import AarvyaLogo from '@/components/ui/aarvya-logo';
import {
  Shield,
  User,
  Smartphone,
  Lock,
  Radio,
  ScanFace,
  Cpu,
  Gauge,
  Lightbulb,
  Users,
  ArrowDown,
} from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#142334] font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#DBE2EB] bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs flex items-center justify-center p-1 group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                <AarvyaLogo size={30} interactive={false} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-[#142334] tracking-tight group-hover:text-teal-900 transition-colors">Aarvya</span>
                </div>
                <span className="text-[9px] tracking-wider font-bold text-slate-400 uppercase -mt-1">
                  WELL-BEING SUPPORT
                </span>
              </div>
            </Link>

            {/* Demo Mode Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
              <span>🧪</span>
              <span>Demo Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Eyebrow & Title */}
        <div className="mb-10 text-left">
          <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block mb-2">
            TECHNICAL ARCHITECTURE
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#142334] tracking-tight mb-2">
            How Aarvya works under the hood
          </h1>
          <p className="text-sm text-[#64748B] leading-relaxed max-w-3xl">
            A consent-first pipeline where AI produces supportive indicators and trained people make every decision.
          </p>
        </div>

        {/* ================= PIPELINE FLOWCHART ================= */}
        <div className="max-w-2xl mx-auto space-y-3.5 mb-16">
          {/* 1. Victim / Complainant */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <User className="w-5 h-5 text-slate-700 shrink-0" />
            <span className="font-semibold text-sm text-[#142334]">Victim / Complainant</span>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 2. Channels */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4.5 space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Smartphone className="w-4 h-4 text-slate-700 shrink-0" />
              <span className="font-semibold text-sm text-[#142334]">Channels</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                Mobile App
              </span>
              <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                Web Portal
              </span>
              <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                Chatbot
              </span>
              <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                IVRS / SMS Follow-up
              </span>
            </div>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 3. Consent and secure data layer */}
          <div className="bg-[#16365C] text-white rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <Lock className="w-4 h-4 text-white shrink-0" />
            <span className="font-semibold text-sm text-white">Consent and secure data layer</span>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 4. Signals */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4.5 space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-slate-700 shrink-0" />
              <span className="font-semibold text-sm text-[#142334]">Signals</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                Text
              </span>
              <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                Voice
              </span>
              <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                Somatic Symptoms
              </span>
              <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                Engagement
              </span>
              <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                Case Events
              </span>
            </div>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 5. Optional Face-region Tracking + rPPG Physiological Support Module */}
          <div className="bg-white/90 border-2 border-dashed border-slate-300 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <ScanFace className="w-4 h-4 text-slate-700 shrink-0" />
            <span className="font-semibold text-xs sm:text-sm text-[#142334]">
              Optional Face-region Tracking + rPPG Physiological Support Module
            </span>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 6. AI Analysis Layer */}
          <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded bg-sky-700 text-white flex items-center justify-center text-xs">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-sm text-[#0C4A6E]">AI Analysis Layer</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-xs font-medium text-[#0369A1] shadow-2xs">
                NLP sentiment and emotion analysis
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-xs font-medium text-[#0369A1] shadow-2xs">
                Crisis keyword and safety classifier
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-xs font-medium text-[#0369A1] shadow-2xs">
                Voice acoustic feature extraction
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-xs font-medium text-[#0369A1] shadow-2xs">
                Somatic Distress Index
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-xs font-medium text-[#0369A1] shadow-2xs">
                Personal-baseline trend analysis
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-xs font-medium text-[#0369A1] shadow-2xs">
                Predictive risk model
              </span>
            </div>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 7. Dynamic Distress Score (0–100) */}
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <Gauge className="w-4 h-4 text-amber-800 shrink-0" />
            <span className="font-bold text-sm text-[#78350F]">Dynamic Distress Score (0–100)</span>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 8. Explainable Alert + Recommendation Engine */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <Lightbulb className="w-4 h-4 text-slate-700 shrink-0" />
            <span className="font-bold text-sm text-[#142334]">
              Explainable Alert + Recommendation Engine
            </span>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 9. Human responders */}
          <div className="bg-[#16365C] text-white rounded-2xl p-4.5 space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-white shrink-0" />
              <span className="font-semibold text-sm text-white">Human responders</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-full bg-white/15 text-xs font-medium text-white border border-white/20">
                Counsellor
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/15 text-xs font-medium text-white border border-white/20">
                District Support Team
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/15 text-xs font-medium text-white border border-white/20">
                State/National Aggregated Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* ================= TECH STACK SECTION ================= */}
        <div className="pt-6 border-t border-slate-200/80">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#142334] tracking-tight mb-6">
            Tech stack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. FRONTEND */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block mb-4">
                  FRONTEND
                </span>
                <div className="flex flex-col items-start gap-2.5">
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    React + TypeScript + Tailwind CSS
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Next.js 16 (Turbopack)
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Responsive mobile-first UI
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Recharts for charts
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Lucide icons
                  </span>
                </div>
              </div>
            </div>

            {/* 2. BACKEND / APPLICATION SERVICES */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider block mb-4">
                  BACKEND / APPLICATION SERVICES
                </span>
                <div className="flex flex-col items-start gap-2.5">
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Python 3.12 + Django 6.x
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Django REST Framework (DRF)
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    PostgreSQL / SQLite database
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Django ORM & Model Security
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Token Auth & CORS Middleware
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Role-based access control (3 Roles)
                  </span>
                </div>
              </div>
            </div>

            {/* 3. AI INTEGRATION ARCHITECTURE */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block mb-4">
                  AI INTEGRATION ARCHITECTURE
                </span>
                <div className="flex flex-col items-start gap-2.5">
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Gemini API via secure server-side function
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Bhashini API — Indian-language ASR/TTS/translation (placeholder)
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    IndicBERT / MuRIL — sentiment/emotion (placeholder)
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    Whisper / Vosk — speech-to-text (placeholder)
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    wav2vec2 + librosa — acoustic features (placeholder)
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    OpenCV / MediaPipe — face-region tracking (placeholder)
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    pyVHR / rPPG — pulse-related signal (placeholder)
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    XGBoost / time-series risk model (placeholder)
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1] text-xs font-medium">
                    SHAP-style explainability panel (placeholder)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#142334] text-white text-xs font-semibold hover:bg-[#0F172A] transition-colors"
          >
            ← Return to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
