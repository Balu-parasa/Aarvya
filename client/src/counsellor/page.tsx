'use client';

import { useState, useEffect } from 'react';
import Link from '@/next-compat';
import {
  AlertTriangle,
  Clock,
  GitFork,
  CheckCircle2,
} from 'lucide-react';
import Sidebar from '@/components/layout/sidebar';
import AuthGuard from '@/components/auth/auth-guard';
import PriorityCasesTable from '@/components/counsellor/priority-cases-table';
import LiveAlertsPanel from '@/components/counsellor/live-alerts-panel';
import CaseModal from '@/components/counsellor/case-modal';
import { PriorityCase, LiveAlert } from '@/types';
import { api } from '@/lib/api';

export default function CounsellorPage() {
  const [activeView, setActiveView] = useState('overview');

  // Priority Cases List
  const [cases, setCases] = useState<PriorityCase[]>([
    {
      id: 'VCT-UP-00124',
      risk: 'Critical',
      score: 82,
      trend: 'Rising',
      reasons: 'unsafe language + missed check-ins',
      lastContact: '15 min ago',
      assignedCounsellor: 'R. Sharma',
    },
    {
      id: 'VCT-UP-00387',
      risk: 'High',
      score: 71,
      trend: 'Rising',
      reasons: 'sleep burden + court tomorrow',
      lastContact: '1 hr ago',
      assignedCounsellor: 'R. Sharma',
    },
    {
      id: 'VCT-UP-00455',
      risk: 'High',
      score: 68,
      trend: 'Rising',
      reasons: 'threat concern reported + sleep worsening',
      lastContact: '3 hrs ago',
      assignedCounsellor: 'P. Verma',
    },
    {
      id: 'VCT-UP-00808',
      risk: 'High',
      score: 57,
      trend: 'Rising',
      reasons: 'compensation delay + missed check-ins',
      lastContact: '2 days ago',
      assignedCounsellor: 'R. Sharma',
    },
    {
      id: 'VCT-UP-00921',
      risk: 'Moderate',
      score: 48,
      trend: 'Stable',
      reasons: 'fatigue + delayed response',
      lastContact: 'Yesterday',
      assignedCounsellor: 'R. Sharma',
    },
  ]);

  // Live Alerts
  const [alerts, setAlerts] = useState<LiveAlert[]>([
    {
      id: 'alert-1',
      caseId: 'VCT-UP-00124',
      risk: 'Critical',
      message: 'Unsafe language detected in chat',
      time: '10:28 AM',
      acknowledged: false,
    },
    {
      id: 'alert-2',
      caseId: 'VCT-UP-00387',
      risk: 'High',
      message: 'Court appearance within 24 hours + sleep burden',
      time: '09:50 AM',
      acknowledged: false,
    },
    {
      id: 'alert-3',
      caseId: 'VCT-UP-00455',
      risk: 'High',
      message: 'Threat concern reported',
      time: '08:12 AM',
      acknowledged: false,
    },
  ]);

  // Modal State for Case Details / Action
  const [selectedCase, setSelectedCase] = useState<PriorityCase | null>(null);
  const [actionDone, setActionDone] = useState<string | null>(null);

  // Intervention Logs State
  const [logs, setLogs] = useState([
    {
      caseId: 'VCT-UP-00124',
      type: 'Outbound Call',
      date: 'Today, 10:45 AM',
      notes: 'Spoke with victim. Addressed immediate safety concerns regarding upcoming hearing. Coordinated with DLSA advocate.',
    },
    {
      caseId: 'VCT-UP-00387',
      type: 'Check-in Review',
      date: 'Yesterday, 04:20 PM',
      notes: 'Reviewed elevated sleep burden distress score. Suggested 2-min box breathing and scheduled follow-up call.',
    },
  ]);
  const [newLogCase, setNewLogCase] = useState('VCT-UP-00124');
  const [newLogType, setNewLogType] = useState('Outbound Call');
  const [newLogNotes, setNewLogNotes] = useState('');

  // Fetch real-time data from Django backend
  const fetchData = async () => {
    try {
      const [backendCases, backendAlerts, backendLogs] = await Promise.allSettled([
        api.getCases(),
        api.getAlerts(),
        api.getInterventions(),
      ]);

      if (backendCases.status === 'fulfilled' && backendCases.value?.length > 0) {
        setCases(backendCases.value);
      }
      if (backendAlerts.status === 'fulfilled' && backendAlerts.value?.length > 0) {
        setAlerts(backendAlerts.value);
      }
      if (backendLogs.status === 'fulfilled' && backendLogs.value?.length > 0) {
        setLogs(
          backendLogs.value.map((l: any) => ({
            caseId: l.case_id || l.caseId || 'VCT-UP-00124',
            type: l.log_type || l.type || 'Outbound Call',
            date: l.date_str || l.date || 'Just now',
            notes: l.notes || '',
          }))
        );
      }
    } catch {}
  };

  useEffect(() => {
    fetchData();
    // Poll every 6 seconds for live real-time sync with database
    const interval = setInterval(fetchData, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAcknowledge = async (alertId: string | number) => {
    const alert = alerts.find((a) => a.id === alertId);
    if (!alert) return;
    const nextAck = !alert.acknowledged;

    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: nextAck } : a))
    );

    if (nextAck) {
      try {
        await api.acknowledgeAlert(alertId);
      } catch {}
    }
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogNotes.trim()) return;

    const newEntry = {
      caseId: newLogCase,
      type: newLogType,
      date: 'Just now',
      notes: newLogNotes,
    };

    setLogs([newEntry, ...logs]);

    try {
      await api.createIntervention({
        case_id: newLogCase,
        log_type: newLogType,
        notes: newLogNotes,
        date_str: 'Just now',
      });
    } catch {}

    setNewLogNotes('');
  };

  const criticalAlertsCount = alerts.filter((a) => !a.acknowledged && (a.risk === 'critical' || a.risk === 'Critical')).length;
  const highFollowUpsCount = cases.filter((c) => c.score >= 60).length;

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#F8FAFC] text-[#142334] font-sans">
        {/* Sidebar Navigation */}
        <Sidebar currentView={activeView} onViewChange={(v) => setActiveView(v)} />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
          {/* Top Header Bar */}
          <header className="h-16 border-b border-[#DBE2EB] bg-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>Uttar Pradesh</span>
              <span>·</span>
              <span className="text-[#0F172A]">District Care Centre</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live District Sync</span>
              </div>
              <Link
                href="/"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 transition"
              >
                Dashboard
              </Link>
            </div>
          </header>

          {/* View Content */}
          <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1 space-y-8">
            {/* Page Heading */}
            <div>
              <span className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider block mb-1">
                COUNSELLOR PORTAL
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#142334] tracking-tight">
                Counsellor Command Centre
              </h1>
              <p className="text-xs text-[#64748B] mt-1.5">
                Pseudonymous cases only. Every AI signal is reviewed by you before action.
              </p>
            </div>

            {/* ===================== VIEW: OVERVIEW OR PRIORITY ===================== */}
            {(activeView === 'overview' || activeView === 'priority') && (
              <>
                {/* 4 KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* 1. Critical alerts */}
                  <div className="p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-3xl font-extrabold text-[#142334]">{criticalAlertsCount}</span>
                      <p className="text-xs text-[#64748B] font-medium leading-tight mt-0.5">Critical alerts</p>
                    </div>
                  </div>

                  {/* 2. High-priority follow-ups */}
                  <div className="p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-3xl font-extrabold text-[#142334]">{highFollowUpsCount}</span>
                      <p className="text-xs text-[#64748B] font-medium leading-tight mt-0.5">High-priority follow-ups due today</p>
                    </div>
                  </div>

                  {/* 3. Pending referrals */}
                  <div className="p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                      <GitFork className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-3xl font-extrabold text-[#142334]">5</span>
                      <p className="text-xs text-[#64748B] font-medium leading-tight mt-0.5">Pending referrals</p>
                    </div>
                  </div>

                  {/* 4. Completed check-ins */}
                  <div className="p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-3xl font-extrabold text-[#142334]">{cases.length}</span>
                      <p className="text-xs text-[#64748B] font-medium leading-tight mt-0.5">Active cases monitored</p>
                    </div>
                  </div>
                </div>

                {/* Side-by-Side: Priority Cases Table (8 cols) & Live Alerts (4 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <PriorityCasesTable cases={cases} onSelectCase={(c) => setSelectedCase(c)} />
                  <LiveAlertsPanel alerts={alerts} onToggleAcknowledge={handleToggleAcknowledge} />
                </div>

                {/* Bottom Support Disclaimer Banner */}
                <div className="rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] p-4 flex items-center gap-3.5">
                  <span className="text-amber-800 text-lg">👤</span>
                  <p className="text-xs sm:text-sm text-amber-900 leading-normal">
                    AI output is a support tool. A trained professional reviews each signal before taking protective action.
                  </p>
                </div>
              </>
            )}

            {/* ===================== VIEW: MY CASELOAD ===================== */}
            {activeView === 'caseload' && (
              <div className="soft-card p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs">
                <h2 className="text-xl font-bold text-[#142334] mb-4">My Assigned Caseload ({cases.length} Active)</h2>
                <div className="space-y-3">
                  {cases.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-mono font-bold text-sm text-[#0F172A]">{c.id}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Assigned to: {c.assignedCounsellor} · Status: Active</p>
                      </div>
                      <button
                        onClick={() => setSelectedCase(c)}
                        className="px-4 py-2 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs font-bold cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== VIEW: ALERTS ===================== */}
            {activeView === 'alerts' && (
              <div className="soft-card p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs">
                <h2 className="text-xl font-bold text-[#142334] mb-4">System Alerts Feed</h2>
                <div className="space-y-3">
                  {alerts.map((a) => (
                    <div key={a.id} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-xs">{a.caseId}</span>
                        <p className="text-xs text-slate-700 font-medium mt-1">{a.message}</p>
                        <span className="text-[10px] text-slate-400">{a.time}</span>
                      </div>
                      <button
                        onClick={() => setSelectedCase(cases.find((c) => c.id === a.caseId) || cases[0])}
                        className="px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        Open Case
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== VIEW: INTERVENTION LOGS ===================== */}
            {activeView === 'logs' && (
              <div className="space-y-6">
                <div className="soft-card p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs">
                  <h2 className="text-xl font-bold text-[#142334] mb-4">Record New Intervention</h2>
                  <form onSubmit={handleAddLog} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Target Case ID</label>
                        <select
                          value={newLogCase}
                          onChange={(e) => setNewLogCase(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                        >
                          {cases.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.id} ({c.risk})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Intervention Type</label>
                        <select
                          value={newLogType}
                          onChange={(e) => setNewLogType(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                        >
                          <option>Outbound Call</option>
                          <option>In-Person Session</option>
                          <option>Legal Aid Coordination</option>
                          <option>Crisis De-escalation</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Clinical / Case Notes</label>
                      <textarea
                        value={newLogNotes}
                        onChange={(e) => setNewLogNotes(e.target.value)}
                        placeholder="Record details of conversation, emotional state, safety checks..."
                        rows={3}
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      Save Log Entry
                    </button>
                  </form>
                </div>

                {/* Past Logs */}
                <div className="soft-card p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs">
                  <h3 className="text-base font-bold text-[#142334] mb-4">Past Intervention Logs</h3>
                  <div className="space-y-3">
                    {logs.map((log, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-slate-900">{log.caseId}</span>
                          <span className="text-slate-400">{log.date}</span>
                        </div>
                        <p className="font-semibold text-slate-700">{log.type}</p>
                        <p className="text-slate-600 leading-relaxed">{log.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===================== VIEW: REFERRALS ===================== */}
            {activeView === 'referrals' && (
              <div className="soft-card p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs">
                <h2 className="text-xl font-bold text-[#142334] mb-4">Inter-Agency Referrals Pipeline</h2>
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold">VCT-UP-00124</span>
                      <p className="font-semibold text-slate-800 mt-0.5">DLSA Legal Aid Representation</p>
                      <p className="text-slate-500">Status: Dispatched · Advocate assigned</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold">Active</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold">VCT-UP-00455</span>
                      <p className="font-semibold text-slate-800 mt-0.5">District Protection Officer Review</p>
                      <p className="text-slate-500">Status: Pending officer review</p>
                    </div>
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-bold">In Review</span>
                  </div>
                </div>
              </div>
            )}

            {/* ===================== VIEW: SETTINGS ===================== */}
            {activeView === 'settings' && (
              <div className="soft-card p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs max-w-xl">
                <h2 className="text-xl font-bold text-[#142334] mb-4">Counsellor Workstation Settings</h2>
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                    <div>
                      <p className="font-bold text-slate-800">Critical Alert SMS Broadcast</p>
                      <p className="text-slate-500">Receive instant SMS for &gt;80 distress scores</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-600 rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                    <div>
                      <p className="font-bold text-slate-800">Automated Intake Assignment</p>
                      <p className="text-slate-500">Auto-route new district check-ins to my caseload</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-600 rounded cursor-pointer" />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* ================= CASE DETAILS / INTERVENTION MODAL ================= */}
        <CaseModal
          selectedCase={selectedCase}
          actionDone={actionDone}
          onClose={() => {
            setSelectedCase(null);
            setActionDone(null);
          }}
          onInitiateCall={() => setActionDone('Outbound call initiated through secure IVRS bridge.')}
          onDispatchReferral={() => setActionDone('Dispatched urgent legal aid referral notice to DLSA desk.')}
        />
      </div>
    </AuthGuard>
  );
}
