'use client';

import React from 'react';
import { LiveAlert } from '@/types';

interface LiveAlertsPanelProps {
  alerts: LiveAlert[];
  onToggleAcknowledge: (alertId: number | string) => void;
}

export default function LiveAlertsPanel({ alerts, onToggleAcknowledge }: LiveAlertsPanelProps) {
  return (
    <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-slate-700">🔔</span>
          <h3 className="text-base font-semibold text-[#142334]">Live alerts</h3>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition bg-white"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-xs text-[#0F172A]">{alert.caseId}</span>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    alert.risk === 'Critical' || alert.risk === 'critical'
                      ? 'bg-[#FEE2E2] text-[#991B1B]'
                      : 'bg-[#FEF3C7] text-[#92400E]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{alert.risk}</span>
                </span>
              </div>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">{alert.message}</p>
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                <span className="text-[10px] text-slate-400">{alert.time}</span>
                <button
                  type="button"
                  onClick={() => onToggleAcknowledge(alert.id)}
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition cursor-pointer ${
                    alert.acknowledged
                      ? 'bg-[#ECFDF5] text-[#065F46]'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {alert.acknowledged ? '✓ Acknowledged' : 'Acknowledge'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-slate-400 mt-5 pt-4 border-t border-slate-100">
        Alerts are prompts for human review, not decisions.
      </p>
    </div>
  );
}
