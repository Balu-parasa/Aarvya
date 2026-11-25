'use client';

import React from 'react';
import Link from '@/next-compat';
import {
  MessageSquare,
  Mic,
  Camera,
  Pill,
  Smartphone,
  Info,
  LogOut,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

export interface ConsentState {
  textChat: boolean;
  voiceCalls: boolean;
  cameraCheck: boolean;
  medicationReminder: boolean;
  smsReminders: boolean;
}

interface StepConsentProps {
  consent: ConsentState;
  onChangeConsent: (newConsent: ConsentState) => void;
  onBack: () => void;
  onSkip: () => void;
  onContinue: () => void;
}

export default function StepConsent({
  consent,
  onChangeConsent,
  onBack,
  onSkip,
  onContinue,
}: StepConsentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Consent 1: Text */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DBE2EB] flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
              <MessageSquare className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-medium text-[#142334]">Analyse text/chat responses</h4>
                <span className="text-[10px] font-medium text-slate-600 bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                  Required for chatbot check-in
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                We read what you type to the companion so we can notice if you may need support.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChangeConsent({ ...consent, textChat: !consent.textChat })}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer shrink-0 ${
              consent.textChat ? 'bg-[#0D9488]' : 'bg-slate-200'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-200 ${
                consent.textChat ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Consent 2: Voice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DBE2EB] flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
              <Mic className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-medium text-[#142334]">Analyse voice messages/calls</h4>
                <span className="text-[10px] font-medium text-slate-600 bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                We look at how you speak — pauses and pace — only in messages you choose to record.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChangeConsent({ ...consent, voiceCalls: !consent.voiceCalls })}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer shrink-0 ${
              consent.voiceCalls ? 'bg-[#0D9488]' : 'bg-slate-200'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-200 ${
                consent.voiceCalls ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Consent 3: Camera */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DBE2EB] flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
              <Camera className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-medium text-[#142334]">Optional camera-based wellness check</h4>
                <span className="text-[10px] font-medium text-slate-600 bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                A 60-second check using your front camera. You can always skip it.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChangeConsent({ ...consent, cameraCheck: !consent.cameraCheck })}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer shrink-0 ${
              consent.cameraCheck ? 'bg-[#0D9488]' : 'bg-slate-200'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-200 ${
                consent.cameraCheck ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Consent 4: Medication */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DBE2EB] flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
              <Pill className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-medium text-[#142334]">Medication/therapy reminder support</h4>
                <span className="text-[10px] font-medium text-slate-600 bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                Gentle reminders for care plans a professional has already given you.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChangeConsent({ ...consent, medicationReminder: !consent.medicationReminder })}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer shrink-0 ${
              consent.medicationReminder ? 'bg-[#0D9488]' : 'bg-slate-200'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-200 ${
                consent.medicationReminder ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Consent 5: SMS */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DBE2EB] flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
              <Smartphone className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-medium text-[#142334]">Receive SMS/IVRS check-in reminders</h4>
                <span className="text-[10px] font-medium text-slate-600 bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                A short message or call reminding you to check in. No personal details are included.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChangeConsent({ ...consent, smsReminders: !consent.smsReminders })}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer shrink-0 ${
              consent.smsReminders ? 'bg-[#0D9488]' : 'bg-slate-200'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-200 ${
                consent.smsReminders ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Info Notice Box */}
      <div className="rounded-2xl bg-[#F8FAFC] border border-[#DBE2EB] p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-[#142334]">About the camera check</p>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            Optional camera analysis uses face-region tracking and video signal quality to estimate pulse-related wellness indicators. It does not identify emotions, measure cortisol, or diagnose any mental-health condition.
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-wrap items-center justify-between pt-6 border-t border-slate-200 gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit securely</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 h-12 px-5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="inline-flex items-center h-12 px-5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
          >
            Skip optional features
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs sm:text-sm font-semibold shadow transition group cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
