'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShieldAlert,
  Users,
  Bell,
  ClipboardList,
  GitFork,
  Settings,
  Shield,
  Cpu,
  LogOut,
  Briefcase,
  X,
} from 'lucide-react';
import { useAuth } from '@/app/context/auth-context';

interface SidebarProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export default function Sidebar({ currentView = 'overview', onViewChange }: SidebarProps) {
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const { setRole } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'priority', label: 'Priority cases', icon: ShieldAlert },
    { id: 'caseload', label: 'My caseload', icon: Users },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'logs', label: 'Intervention logs', icon: ClipboardList },
    { id: 'referrals', label: 'Referrals', icon: GitFork },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 border-r border-[#DBE2EB] bg-white h-screen fixed top-0 left-0 z-30">
        {/* Brand Header */}
        <div className="flex h-16 items-center px-6 border-b border-[#DBE2EB]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F2744] flex items-center justify-center text-white shadow-xs">
              <Shield className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
            </div>
            <div>
              <span className="text-lg font-bold text-[#142334] tracking-tight">Sahaaya+</span>
              <p className="text-[9px] tracking-wider font-bold text-slate-400 uppercase -mt-1">WELL-BEING SUPPORT</p>
            </div>
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col justify-between">
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              COUNSELLOR PORTAL
            </p>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange && onViewChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      isActive
                        ? 'bg-[#0F172A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Governance Section */}
          <div className="pt-4 border-t border-slate-200">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              GOVERNANCE
            </p>

            <div className="space-y-1">
              <Link
                href="/privacy"
                className="flex items-center gap-3 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
              >
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Privacy & safety</span>
              </Link>
              <Link
                href="/architecture"
                className="flex items-center gap-3 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
              >
                <Cpu className="w-4 h-4 text-slate-400" />
                <span>Architecture</span>
              </Link>
              <button
                type="button"
                onClick={() => setRoleModalOpen(true)}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-slate-400" />
                <span>Switch demo role</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Switch Demo Role Modal (Strictly 3 roles) */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-[#142334]">Switch Demo Persona</h3>
              <button onClick={() => setRoleModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">Choose one of the 3 supported roles:</p>
            <div className="space-y-2">
              <Link
                href="/victim"
                onClick={() => {
                  setRole('victim');
                  setRoleModalOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition"
              >
                <Users className="w-4 h-4 text-emerald-600" />
                <span>1. Victim (Asha)</span>
              </Link>
              <Link
                href="/counsellor"
                onClick={() => {
                  setRole('counsellor');
                  setRoleModalOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition"
              >
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                <span>2. Counsellor (Balu Parasa)</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => {
                  setRole('admin');
                  setRoleModalOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl bg-[#0F243E] text-white text-xs font-semibold transition"
              >
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>3. Admin (Rehabilitation & District Oversight)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
