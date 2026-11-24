'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface StepResultsProps {
  name: string;
  currentResult: {
    score: number;
    label: string;
    desc: string;
  };
  sparklineData: { checkin: string; score: number }[];
  onComplete: () => void;
}

export default function StepResults({
  name,
  currentResult,
  sparklineData,
  onComplete,
}: StepResultsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#142334] tracking-tight">
          Namaste, {name || 'Asha'}. How are you feeling today?
        </h1>
      </div>

      {/* Result Distress Score Card matching result_victim.png */}
      <div className="soft-card p-6 sm:p-8 rounded-[28px] bg-white border border-[#DBE2EB] shadow-md">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Circular Gauge */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E2E8F0"
                  strokeWidth="10"
                  fill="transparent"
                />
                {/* Active arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#0F2744"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * currentResult.score) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-extrabold text-[#0F172A]">{currentResult.score}</span>
                <span className="text-xs text-slate-400 font-medium -mt-1">/100</span>
              </div>
            </div>
          </div>

          {/* Score Summary & Guidance */}
          <div className="md:col-span-8 space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              DYNAMIC DISTRESS SCORE
            </span>
            <h3 className="text-2xl font-bold text-[#142334]">{currentResult.label}</h3>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-xl">
              {currentResult.desc}
            </p>
          </div>
        </div>

        {/* Sparkline Trend Chart */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="h-28 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <XAxis dataKey="checkin" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#0D5C58"
                  strokeWidth={2.5}
                  fill="#0D5C58"
                  fillOpacity={0.08}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
            <span>Supportive indicator only — not a diagnosis. Reviewed by trained counsellors.</span>
          </div>
        </div>
      </div>

      {/* Next Steps CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          ← Return to Home
        </Link>

        <button
          type="button"
          onClick={onComplete}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-[#0F172A] hover:bg-[#334155] text-white font-semibold text-sm shadow-md transition group cursor-pointer"
        >
          <span>Go to Victim Support Dashboard</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
