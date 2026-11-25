'use client';

import React from 'react';
import Link from '@/next-compat';
import TopNavigation from '@/components/layout/top-navigation';
import { Shield, Lock, EyeOff, UserCheck, HardDrive, CheckCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <TopNavigation />

      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Privacy Architecture & Data Safeguards</span>
        </div>

        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0F243E] mb-3">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Digital Personal Data Protection (DPDP) Act 2023 Aligned</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#142334] tracking-tight mb-3">
            Privacy by Design Architecture
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Aarvya is engineered around a core tenet: technology must protect, never surveil. Every layer—from edge voice scoring to inter-agency escalation—is built with strict cryptographic boundaries and human oversight.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0F243E] text-white flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#142334] mb-2">Zero-Knowledge Emotion Inference</h2>
            <p className="text-xs leading-relaxed text-slate-600 mb-4">
              Micro-acoustic voice features (jitter, shimmer, speaking pitch) and check-in inputs are processed locally or through non-persistent edge compute. Raw voice recordings are discarded immediately after computing the distress vector.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-lg w-fit">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>No audio storage on servers</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0F243E] text-white flex items-center justify-center mb-4">
              <EyeOff className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#142334] mb-2">Pseudonymous Case Pseudonyms</h2>
            <p className="text-xs leading-relaxed text-slate-600 mb-4">
              In inter-departmental portals (District, Legal, Rehabilitation), victims are represented solely through rotating tokens (e.g., <code className="text-xs font-mono bg-slate-100 px-1 py-0.5 rounded">VCT-UP-00124</code>). Real identities are unmasked only by authorized designated officers during physical emergency response.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-lg w-fit">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Role-Based Access Control (RBAC)</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0F243E] text-white flex items-center justify-center mb-4">
              <UserCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#142334] mb-2">Human-in-the-Loop Safeguards</h2>
            <p className="text-xs leading-relaxed text-slate-600 mb-4">
              No algorithmic score ever triggers an automated legal sanction, police dispatch, or psychiatric intervention without explicit verification by a certified human duty counsellor. Automated flags are strictly decision-support advisories.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-lg w-fit">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Certified Counsellor Verification</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0F243E] text-white flex items-center justify-center mb-4">
              <HardDrive className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#142334] mb-2">Automated Ephemeral Purging</h2>
            <p className="text-xs leading-relaxed text-slate-600 mb-4">
              Non-critical daily check-in traces and companion conversation transcripts are automatically sanitized after 7 days. At any point, users retain the right to download their care history or initiate full data purging.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-lg w-fit">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>7-Day Ephemeral Lifecycle</span>
            </div>
          </div>
        </div>

        {/* Detailed Compliance Section */}
        <div className="bg-[#0F243E] text-white rounded-3xl p-8 sm:p-10 mb-10">
          <h2 className="text-2xl font-serif font-bold mb-3">Statutory & Ethical Compliance</h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
            Designed under the statutory guidelines of the Ministry of Women and Child Development (MWCD) and National Health Systems Resource Centre (NHSRC).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-semibold text-blue-300 mb-1">Consent Revocability</div>
              <p className="text-slate-400 text-[11px]">Users can revoke check-in permissions or opt into anonymous mode at any moment.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-semibold text-blue-300 mb-1">Encrypted In-Transit & At-Rest</div>
              <p className="text-slate-400 text-[11px]">AES-256 at rest and TLS 1.3 in transit with isolated keys per jurisdiction.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-semibold text-blue-300 mb-1">Immutable Audit Trail</div>
              <p className="text-slate-400 text-[11px]">Tamper-evident logs of every counsellor escalation and access event.</p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#142334] text-white text-xs font-semibold hover:bg-[#0F172A] transition-colors"
          >
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
