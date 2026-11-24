'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ActionItem {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface VictimActionsGridProps {
  actions: ActionItem[];
  onSelectAction: (id: string) => void;
}

export default function VictimActionsGrid({ actions, onSelectAction }: VictimActionsGridProps) {
  return (
    <div className="mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-[#142334] mb-5">
        What would help right now?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onSelectAction(action.id)}
              className="soft-card p-4 rounded-2xl flex flex-col justify-between text-left hover:-translate-y-0.5 hover:border-slate-400 transition-all duration-200 min-h-[120px] bg-white group shadow-xs cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-[#0F172A] group-hover:text-white transition">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#142334] group-hover:text-slate-900">{action.title}</h3>
                <p className="text-xs text-[#64748B] mt-0.5">{action.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
