'use client';

import React, { useState, useEffect } from 'react';
import Link from '@/next-compat';
import {
  Shield,
  Users,
  GraduationCap,
  Briefcase,
  AlertCircle,
  Clock,
  Home,
  Lock,
  Cpu,
  LogOut,
} from 'lucide-react';
import AuthGuard from '@/components/auth/auth-guard';
import { useAuth } from '@/context/auth-context';
import RehabPipelineCard from '@/components/admin/rehab-pipeline-card';
import CompensationTable from '@/components/admin/compensation-table';
import AarvyaLogo from '@/components/ui/aarvya-logo';
import { api } from '@/lib/api';

export default function AdminPage() {
  const { setRole } = useAuth();
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const [pipeline, setPipeline] = useState([
    {
      id: 'RHB-001',
      linked: 'VCT-UP-00124',
      title: 'Vocational training — Tailoring course',
      progress: 60,
      officer: 'R. Sharma',
      nextAction: 'Complete module 3',
      dueDays: '5 days',
      status: 'In progress',
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'RHB-002',
      linked: 'VCT-UP-00387',
      title: 'Job placement — Local shop assistant',
      progress: 85,
      officer: 'M. Verma',
      nextAction: 'Interview scheduled',
      dueDays: '2 days',
      status: 'Near completion',
      badgeColor: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'RHB-003',
      linked: 'VCT-UP-00921',
      title: 'Compensation tracking — 2nd instalment pending',
      progress: 30,
      officer: 'R. Sharma',
      nextAction: 'Treasury follow-up required',
      dueDays: 'Overdue',
      status: 'Delayed',
      badgeColor: 'bg-red-50 text-red-700',
    },
    {
      id: 'RHB-004',
      linked: 'VCT-UP-00612',
      title: 'Counselling — Weekly sessions',
      progress: 45,
      officer: 'R. Sharma',
      nextAction: 'Session 4 of 8',
      dueDays: '3 days',
      status: 'In progress',
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'RHB-005',
      linked: 'VCT-UP-00733',
      title: 'Reintegration — Community support group',
      progress: 95,
      officer: 'M. Verma',
      nextAction: 'Final review',
      dueDays: '1 day',
      status: 'Completing',
      badgeColor: 'bg-emerald-50 text-emerald-700',
    },
  ]);

  useEffect(() => {
    const fetchRehab = async () => {
      try {
        const res = await api.getRehabilitation();
        if (res && res.length > 0) {
          setPipeline(
            res.map((item: any) => ({
              id: item.pipeline_id || item.id,
              linked: item.case_id || item.linked,
              title: item.title,
              progress: item.progress,
              officer: item.assigned_officer || item.officer,
              nextAction: item.next_action || item.nextAction,
              dueDays: item.due_days || item.dueDays,
              status: item.status,
              badgeColor:
                item.status === 'Delayed'
                  ? 'bg-red-50 text-red-700'
                  : item.status === 'Completed' || item.status === 'Near completion'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-100 text-slate-700',
            }))
          );
        }
      } catch {}
    };
    fetchRehab();
  }, []);

  const kpis = [
    { label: 'Active cases', value: 5, icon: Users },
    { label: 'In training', value: 3, icon: GraduationCap },
    { label: 'Placed', value: 1, icon: Briefcase },
    { label: 'Delayed', value: 1, icon: AlertCircle },
    { label: 'Initial assessment', value: 2, icon: Clock },
    { label: 'Vocational training', value: 3, icon: GraduationCap },
    { label: 'Job placement', value: 1, icon: Briefcase },
    { label: 'Reintegration', value: 2, icon: Home },
  ];

  return (
    <AuthGuard allowedRoles={['admin']}>
      <div className="flex min-h-screen bg-[#F8FAFC] text-[#142334] font-sans">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-[#DBE2EB] flex flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30 hidden lg:flex">
          <div className="p-6">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-9 h-9 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs flex items-center justify-center p-1 group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                <AarvyaLogo size={30} interactive={false} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[#142334] tracking-tight group-hover:text-teal-900 transition-colors">Aarvya</span>
                <span className="text-[9px] tracking-wider font-bold text-slate-400 uppercase -mt-1">
                  WELL-BEING SUPPORT
                </span>
              </div>
            </Link>

            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
              ADMIN PORTAL
            </span>

            <nav className="space-y-1.5">
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#0F243E] text-white text-xs font-semibold shadow-xs">
                <Briefcase className="w-4 h-4" />
                <span>Reintegration</span>
              </button>
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                GOVERNANCE
              </span>
              <nav className="space-y-1.5">
                <Link
                  href="/privacy"
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-medium transition"
                >
                  <Lock className="w-4 h-4" />
                  <span>Privacy & safety</span>
                </Link>
                <Link
                  href="/architecture"
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-medium transition"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Architecture</span>
                </Link>
              </nav>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100">
            <button
              onClick={() => setRoleModalOpen(true)}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Switch role</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
          {/* Top Header Bar */}
          <header className="h-14 border-b border-[#DBE2EB] bg-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
            <span className="text-xs text-slate-500 font-medium">Uttar Pradesh · District Care Division</span>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Administration</span>
            </div>
          </header>

          {/* Body Content */}
          <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1 space-y-8">
            {/* Title Area */}
            <div>
              <span className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider block mb-1">
                REHABILITATION & ADMIN PORTAL
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#142334] tracking-tight mb-1.5">
                Rehabilitation & reintegration
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Track vocational training, job placement, compensation status, and community reintegration for victims under your care.
              </p>
            </div>

            {/* 8 KPI Cards Grid in 2 Rows */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {kpis.map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs flex flex-col justify-between min-h-[105px]"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-3xl font-extrabold text-[#142334] leading-none mb-1">{kpi.value}</div>
                      <div className="text-xs text-[#64748B] font-medium">{kpi.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rehabilitation Pipeline Section */}
            <RehabPipelineCard pipeline={pipeline} />

            {/* Lower Grid: Compensation & Reintegration Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Compensation tracking */}
              <CompensationTable />

              {/* Reintegration outcomes (district) */}
              <div className="p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#0D9488]">📈</span>
                  <h3 className="font-semibold text-sm text-[#142334]">Reintegration outcomes (district)</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Returned to work</span>
                      <span className="font-bold text-slate-900">68%</span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0D9488] h-full rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Community support active</span>
                      <span className="font-bold text-slate-900">54%</span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#1E3A5F] h-full rounded-full" style={{ width: '54%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Stable housing</span>
                      <span className="font-bold text-slate-900">82%</span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0D9488] h-full rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Follow-up adherence</span>
                      <span className="font-bold text-slate-900">71%</span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '71%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Support Disclaimer Banner */}
            <div className="rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] p-4 flex items-center gap-3.5">
              <span className="text-amber-800 text-lg">👤</span>
              <p className="text-xs sm:text-sm text-amber-900 leading-normal">
                AI output is a support tool. A trained professional must review the case before any significant action.
              </p>
            </div>
          </main>
        </div>

        {/* Switch Role Modal */}
        {roleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
              <h3 className="text-base font-bold text-[#142334] mb-2">Switch Active Portal</h3>
              <p className="text-xs text-slate-500 mb-4">Choose one of the 3 active roles:</p>
              <div className="space-y-2">
                <Link
                  href="/victim"
                  onClick={() => setRole('victim')}
                  className="w-full flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800"
                >
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Victim Portal</span>
                </Link>
                <Link
                  href="/counsellor"
                  onClick={() => setRole('counsellor')}
                  className="w-full flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800"
                >
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Counsellor Portal</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setRole('admin')}
                  className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                >
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>Admin & Rehabilitation Portal</span>
                </Link>
              </div>
              <button
                onClick={() => setRoleModalOpen(false)}
                className="w-full mt-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
