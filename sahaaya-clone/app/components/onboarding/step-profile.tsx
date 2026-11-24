'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut, ArrowLeft, ArrowRight } from 'lucide-react';

interface StepProfileProps {
  name: string;
  setName: (name: string) => void;
  ageRange: string;
  setAgeRange: (age: string) => void;
  reachMethod: string;
  setReachMethod: (method: string) => void;
  checkinTime: string;
  setCheckinTime: (time: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function StepProfile({
  name,
  setName,
  ageRange,
  setAgeRange,
  reachMethod,
  setReachMethod,
  checkinTime,
  setCheckinTime,
  onBack,
  onContinue,
}: StepProfileProps) {
  return (
    <div className="space-y-6">
      <div className="soft-card p-6 sm:p-8 rounded-2xl bg-white border border-[#DBE2EB] space-y-6 shadow-xs">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-[#142334] uppercase tracking-wider mb-2">
            What should we call you? (any name, optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Asha"
            className="w-full h-12 px-4 rounded-xl border border-[#D1DBE6] bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm font-medium transition"
          />
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-xs font-bold text-[#142334] uppercase tracking-wider mb-2">
            Age range
          </label>
          <div className="flex flex-wrap gap-2.5">
            {['18–25', '26–40', '41–60', '60+'].map((age) => (
              <button
                key={age}
                type="button"
                onClick={() => setAgeRange(age)}
                className={`h-10 px-5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                  ageRange === age
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* Reach Method */}
        <div>
          <label className="block text-xs font-bold text-[#142334] uppercase tracking-wider mb-2">
            How should we reach you?
          </label>
          <div className="flex flex-wrap gap-2.5">
            {['App only', 'SMS', 'Phone call (IVRS)'].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setReachMethod(method)}
                className={`h-10 px-5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                  reachMethod === method
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Checkin Time */}
        <div>
          <label className="block text-xs font-bold text-[#142334] uppercase tracking-wider mb-2">
            Best time for check-ins
          </label>
          <div className="flex flex-wrap gap-2.5">
            {['Morning', 'Afternoon', 'Evening'].map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setCheckinTime(time)}
                className={`h-10 px-5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                  checkinTime === time
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
          You&apos;ll be identified by a pseudonymous case ID. We never ask for your address or FIR number here.
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
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
