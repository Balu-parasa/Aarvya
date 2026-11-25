'use client';

import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { RehabilitationItem } from '@/types';

interface RehabPipelineCardProps {
  pipeline: RehabilitationItem[];
}

export default function RehabPipelineCard({ pipeline }: RehabPipelineCardProps) {
  return (
    <div>
      <h2 className="text-xl font-serif font-normal text-[#142334] mb-4">Rehabilitation pipeline</h2>
      <div className="rounded-2xl bg-white border border-[#DBE2EB] shadow-xs divide-y divide-slate-100 overflow-hidden">
        {pipeline.map((item) => (
          <div key={item.id} className="p-5 hover:bg-slate-50/50 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#142334]">{item.id}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 font-mono">linked to {item.linked}</span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium self-start sm:self-auto ${
                  item.status === 'Delayed'
                    ? 'bg-[#FEE2E2] text-[#991B1B]'
                    : item.status === 'Near completion' || item.status === 'Completing'
                    ? 'bg-[#ECFDF5] text-[#065F46]'
                    : 'bg-[#F1F5F9] text-[#334155]'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="text-sm font-semibold text-[#142334] mb-3">{item.title}</div>

            {/* Progress Bar */}
            <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-[#0D9488] h-full rounded-full transition-all duration-500"
                style={{ width: `${item.progress}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span>Officer: {item.officer}</span>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Next: {item.nextAction}
                </span>
                <span className="text-slate-400">·</span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  {item.dueDays}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
