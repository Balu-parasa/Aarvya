'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut, ArrowRight } from 'lucide-react';

interface StepLanguageProps {
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  onContinue: () => void;
}

export default function StepLanguage({
  selectedLanguage,
  onSelectLanguage,
  onContinue,
}: StepLanguageProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* English */}
        <button
          type="button"
          onClick={() => onSelectLanguage('English')}
          className={`p-6 rounded-2xl bg-white text-left transition shadow-xs hover:border-slate-400 cursor-pointer ${
            selectedLanguage === 'English'
              ? 'border-2 border-[#0D9488] shadow-sm'
              : 'border border-[#DBE2EB]'
          }`}
        >
          <h3 className="text-xl font-serif font-normal text-[#142334]">English</h3>
          <p className="text-xs text-[#64748B] mt-1">English</p>
        </button>

        {/* Hindi */}
        <button
          type="button"
          onClick={() => onSelectLanguage('Hindi')}
          className={`p-6 rounded-2xl bg-white text-left transition shadow-xs hover:border-slate-400 cursor-pointer ${
            selectedLanguage === 'Hindi'
              ? 'border-2 border-[#0D9488] shadow-sm'
              : 'border border-[#DBE2EB]'
          }`}
        >
          <h3 className="text-xl font-serif font-normal text-[#142334]">हिंदी</h3>
          <p className="text-xs text-[#64748B] mt-1">Hindi</p>
        </button>

        {/* Regional */}
        <button
          type="button"
          onClick={() => onSelectLanguage('Regional')}
          className={`p-6 rounded-2xl bg-white text-left transition shadow-xs hover:border-slate-400 cursor-pointer ${
            selectedLanguage === 'Regional'
              ? 'border-2 border-[#0D9488] shadow-sm'
              : 'border border-[#DBE2EB]'
          }`}
        >
          <h3 className="text-xl font-serif font-normal text-[#142334]">Regional</h3>
          <p className="text-xs text-[#64748B] mt-1">Coming via Bhashini</p>
        </button>
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
  );
}
