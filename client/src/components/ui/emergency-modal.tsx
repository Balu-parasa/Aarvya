'use client';

import { useState } from 'react';
import { AlertTriangle, Phone, Shield, X, CheckCircle, MessageSquare } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  const [alertSent, setAlertSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-red-200 overflow-hidden">
        {/* Red Accent Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-rose-600 to-red-600" />

        <div className="flex items-start justify-between mb-4 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Urgent Support & Emergency SOS</h2>
              <p className="text-xs text-red-600 font-semibold tracking-wide uppercase">Immediate 24x7 Assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          If you are in immediate physical danger, please contact national emergency authorities directly. A trained Aarvya duty officer is also on standby to assist you.
        </p>

        {alertSent ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-900 text-sm">Emergency Alert Dispatched</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                A high-priority notification with your pseudonymous ID has been routed to the District Duty Counsellor. Expected callback within 5-10 minutes.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setAlertSent(true)}
              className="emergency-btn w-full flex items-center justify-between p-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white transition shadow-md group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-red-500/50 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Alert On-Duty Counsellor Now</p>
                  <p className="text-xs text-red-100">Flags your case as Critical Priority for immediate outreach</p>
                </div>
              </div>
              <span className="text-xs font-bold bg-white text-red-600 px-3 py-1 rounded-full uppercase tracking-wider group-hover:scale-105 transition">
                Send SOS
              </span>
            </button>

            {/* Direct Helpline 112 */}
            <a
              href="tel:112"
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">National Emergency Helpline</p>
                  <p className="text-xs text-slate-500">Police, Ambulance, Disaster (Toll-Free)</p>
                </div>
              </div>
              <span className="text-sm font-bold text-blue-600">Dial 112</span>
            </a>

            {/* Women Helpline 181 / 1091 */}
            <a
              href="tel:181"
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">Women Helpline (Domestic/Distress)</p>
                  <p className="text-xs text-slate-500">24x7 Confidential Support</p>
                </div>
              </div>
              <span className="text-sm font-bold text-rose-600">Dial 181</span>
            </a>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            I feel safe now / Close
          </button>
        </div>
      </div>
    </div>
  );
}
