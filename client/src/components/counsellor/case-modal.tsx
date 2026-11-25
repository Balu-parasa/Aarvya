'use client';

import React from 'react';
import { X, Check, Phone, GitFork } from 'lucide-react';
import { PriorityCase } from '@/types';

interface CaseModalProps {
  selectedCase: PriorityCase | null;
  actionDone: string | null;
  onClose: () => void;
  onInitiateCall: () => void;
  onDispatchReferral: () => void;
}

export default function CaseModal({
  selectedCase,
  actionDone,
  onClose,
  onInitiateCall,
  onDispatchReferral,
}: CaseModalProps) {
  if (!selectedCase) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="font-mono text-sm font-bold text-[#0F172A]">{selectedCase.id}</span>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  selectedCase.risk === 'Critical'
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {selectedCase.risk} Priority
              </span>
              <span className="text-xs text-slate-500">Distress Score: {selectedCase.score}/100</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-5 space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-800 mb-1">Top AI Sentinel Reasons</p>
            <p className="text-slate-600 leading-relaxed">{selectedCase.reasons}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-800 mb-1">Counsellor Oversight</p>
            <p className="text-slate-600">
              Assigned Officer: <span className="font-semibold text-slate-800">{selectedCase.assignedCounsellor}</span> · Last verified contact {selectedCase.lastContact}
            </p>
          </div>

          {actionDone && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{actionDone}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-slate-100">
          <button
            onClick={onInitiateCall}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#0F172A] hover:bg-[#334155] text-white text-xs font-bold transition cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Initiate Outbound Call</span>
          </button>
          <button
            onClick={onDispatchReferral}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            <GitFork className="w-4 h-4" />
            <span>Dispatch Referral</span>
          </button>
        </div>
      </div>
    </div>
  );
}
