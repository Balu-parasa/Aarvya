'use client';

import React from 'react';
import Link from '@/next-compat';
import { LogOut, ArrowLeft, ArrowRight } from 'lucide-react';

interface StepBaselineProps {
  feeling: string;
  setFeeling: (feeling: string) => void;
  onBack: () => void;
  onFinish: () => void;
}

export default function StepBaseline({
  feeling,
  setFeeling,
  onBack,
  onFinish,
}: StepBaselineProps) {
  return (
    <div className="space-y-8">
      <div className="soft-card p-6 sm:p-8 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs">
        <h3 className="text-xl font-serif font-normal text-[#142334]">How have you been feeling this week?</h3>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          This becomes your personal starting point. There is no wrong answer.
        </p>

        {/* 5 Feeling Cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {[
            { key: 'Good', emoji: '😊', label: 'Good' },
            { key: 'Okay', emoji: '😐', label: 'Okay' },
            { key: 'Unsure', emoji: '😶', label: 'Unsure' },
            { key: 'Worried', emoji: '😟', label: 'Worried' },
            { key: 'Very low', emoji: '😢', label: 'Very low' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFeeling(item.key)}
              className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-3 transition cursor-pointer ${
                feeling === item.key
                  ? 'bg-amber-50/50 border-amber-400 ring-2 ring-amber-400/30 scale-105 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <span className="text-4xl">{item.emoji}</span>
              <span className="text-xs font-semibold text-[#142334]">{item.label}</span>
            </button>
          ))}
        </div>
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
            onClick={onFinish}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs sm:text-sm font-semibold shadow transition group cursor-pointer"
          >
            <span>Finish</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
