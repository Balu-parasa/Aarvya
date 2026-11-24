'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { PriorityCase } from '@/app/types';

interface PriorityCasesTableProps {
  cases: PriorityCase[];
  onSelectCase: (c: PriorityCase) => void;
}

export default function PriorityCasesTable({ cases, onSelectCase }: PriorityCasesTableProps) {
  return (
    <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs">
      <div className="mb-5">
        <h2 className="text-xl font-serif font-normal text-[#142334]">Priority cases</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-3 px-2">CASE ID</th>
              <th className="pb-3 px-2">RISK LEVEL</th>
              <th className="pb-3 px-2">SCORE</th>
              <th className="pb-3 px-2">TREND</th>
              <th className="pb-3 px-2">TOP ALERT REASONS</th>
              <th className="pb-3 px-2">LAST CONTACT</th>
              <th className="pb-3 px-2 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/70 transition">
                <td className="py-3.5 px-2 font-mono font-bold text-[#0F172A]">{c.id}</td>
                <td className="py-3.5 px-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                      c.risk === 'Critical'
                        ? 'bg-[#FEE2E2] text-[#991B1B]'
                        : c.risk === 'High'
                        ? 'bg-[#FEF3C7] text-[#92400E]'
                        : 'bg-[#EFF6FF] text-[#1E40AF]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{c.risk}</span>
                  </span>
                </td>
                <td className="py-3.5 px-2 font-bold text-[#142334] text-sm">{c.score}</td>
                <td className="py-3.5 px-2 font-medium text-slate-600">
                  {c.trend === 'Rising' ? (
                    <span className="flex items-center gap-1 text-[#D97706]">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Rising</span>
                    </span>
                  ) : (
                    <span>— Stable</span>
                  )}
                </td>
                <td className="py-3.5 px-2 text-slate-600 max-w-xs">{c.reasons}</td>
                <td className="py-3.5 px-2 text-slate-500 whitespace-nowrap">{c.lastContact}</td>
                <td className="py-3.5 px-2 text-right">
                  {c.risk === 'Critical' ? (
                    <button
                      onClick={() => onSelectCase(c)}
                      className="h-8 px-4 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white font-medium text-xs shadow-xs transition cursor-pointer"
                    >
                      Open case
                    </button>
                  ) : c.id === 'VCT-UP-00921' ? (
                    <button
                      onClick={() => onSelectCase(c)}
                      className="h-8 px-4 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white font-medium text-xs shadow-xs transition cursor-pointer"
                    >
                      Schedule
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectCase(c)}
                      className="h-8 px-4 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white font-medium text-xs shadow-xs transition cursor-pointer"
                    >
                      Contact
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
