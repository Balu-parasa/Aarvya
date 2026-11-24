'use client';

import React from 'react';
import { CompensationRecord } from '@/app/types';

interface CompensationTableProps {
  records?: CompensationRecord[];
}

export default function CompensationTable({ records }: CompensationTableProps) {
  const defaultItems = [
    {
      caseId: 'VCT-UP-00921',
      instalment: '2nd instalment',
      amount: '₹1,20,000',
      status: 'Overdue 47 days',
      statusColor: 'text-[#DC2626]',
    },
    {
      caseId: 'VCT-UP-00808',
      instalment: '1st instalment',
      amount: '₹85,000',
      status: 'Overdue 63 days',
      statusColor: 'text-[#DC2626]',
    },
    {
      caseId: 'VCT-UP-00733',
      instalment: 'Final settlement',
      amount: '₹2,50,000',
      status: 'Received',
      statusColor: 'text-[#16A34C]',
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#D97706] font-bold">₹</span>
        <h3 className="font-semibold text-sm text-[#142334]">Compensation tracking</h3>
      </div>

      <div className="space-y-4 divide-y divide-slate-100">
        {records && records.length > 0
          ? records.map((rec) => (
              <div key={rec.id} className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#142334]">{rec.caseId}</span>
                  <p className="text-[11px] text-slate-500">{rec.instalment}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#142334]">{rec.amount}</span>
                  <p
                    className={`text-[11px] font-medium ${
                      rec.statusType === 'disbursed' ? 'text-[#16A34C]' : 'text-[#DC2626]'
                    }`}
                  >
                    {rec.statusLabel}
                  </p>
                </div>
              </div>
            ))
          : defaultItems.map((item, idx) => (
              <div key={idx} className={`${idx === 0 ? 'pt-2' : 'pt-3'} flex items-center justify-between`}>
                <div>
                  <span className="font-mono text-xs font-bold text-[#142334]">{item.caseId}</span>
                  <p className="text-[11px] text-slate-500">{item.instalment}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#142334]">{item.amount}</span>
                  <p className={`text-[11px] font-medium ${item.statusColor}`}>{item.status}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
