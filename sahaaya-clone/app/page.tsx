'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Lock,
  Heart,
  Mic,
  Send,
  Shield,
  AlertCircle,
  CameraOff,
  UserCheck,
  Briefcase,
  Stethoscope,
  Cpu,
} from 'lucide-react';
import TopNavigation from '@/app/components/layout/top-navigation';
import { useAuth } from '@/app/context/auth-context';
import LoginPage from '@/app/login/page';
import { useIsMounted } from '@/app/hooks/use-is-mounted';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const isMounted = useIsMounted();
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('English');

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isMounted, isAuthenticated, router]);

  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'I am here to listen. Would you like to tell me how you have been feeling?' },
    { sender: 'user', text: 'मुझे कल की सुनवाई से डर लग रहा है।' },
    { sender: 'bot', text: 'It makes sense to feel worried. Would you like a counsellor to contact you?' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: inputValue }];
    setMessages(newMessages);
    setInputValue('');

    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          sender: 'bot',
          text: currentLang.startsWith('हिंदी')
            ? 'आपकी भावनाएं पूरी तरह से मान्य हैं। हमारी काउंसलर टीम आपकी मदद के लिए उपस्थित है।'
            : 'It takes courage to express that. You are in a safe space and our counsellor team is here for you.',
        },
      ]);
    }, 700);
  };

  const isHindi = currentLang.startsWith('हिंदी');

  if (!isMounted || !isAuthenticated) {
    return <LoginPage onLoginSuccess={() => {}} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#142334] font-sans">
      <TopNavigation language={currentLang} onLanguageChange={(l) => setCurrentLang(l)} />

      <main className="flex-1">
        {/* ===================== HERO SECTION ===================== */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#EEF3F9]/60 via-[#F8FAFC] to-[#F8FAFC]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* Official Support Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DBE2EB] shadow-xs text-xs font-medium text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Ministry of Social Justice & Empowerment</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-serif font-normal tracking-tight text-[#142334] leading-[1.15]">
                  {isHindi ? 'आप हर कदम पर सहायता के पात्र हैं।' : 'You deserve support at every step.'}
                </h1>

                <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed">
                  {isHindi
                    ? 'सहाय+ शुरुआती दौर में ही तनाव की पहचान कर आपको प्रशिक्षित सहायकों से जोड़ता है।'
                    : 'Sahaaya+ helps identify rising emotional distress early and connects you to trained human support.'}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
                  {user?.hasCompletedCheckin ? (
                    <Link
                      href="/victim"
                      className="inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white font-medium text-sm shadow-sm transition group"
                    >
                      <span>{isHindi ? 'डैशबोर्ड पर जाएं' : 'Dashboard'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <Link
                      href="/onboarding"
                      className="inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white font-medium text-sm shadow-sm transition group"
                    >
                      <span>{isHindi ? 'सुरक्षित चेक-इन शुरू करें' : 'Start secure check-in'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}

                  <Link
                    href="#privacy-by-design"
                    className="inline-flex items-center justify-center gap-2.5 h-13 px-7 rounded-full bg-white border border-[#CBD5E1] text-[#1E3A5F] hover:bg-slate-50 font-medium text-sm shadow-xs transition"
                  >
                    <Lock className="w-4 h-4 text-slate-500" />
                    <span>{isHindi ? 'गोपनीयता सुरक्षा' : 'How it protects your privacy'}</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Sahaaya Companion Chat Preview Card */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="w-full max-w-md bg-white rounded-[28px] border border-[#DBE2EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 relative">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-teal-700">
                      <Heart className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#142334]">Sahaaya Companion</h3>
                      <p className="text-xs text-[#64748B]">Here to listen · human supervised</p>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="py-4 space-y-3.5 min-h-[200px] max-h-[250px] overflow-y-auto pr-1">
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                            m.sender === 'user'
                              ? 'bg-[#115E59] text-white rounded-br-xs font-medium'
                              : 'bg-[#F1F5F9] text-[#142334] rounded-bl-xs'
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Chat Form */}
                  <form onSubmit={handleSendMessage} className="pt-2">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type how you are feeling..."
                        className="w-full h-11 pl-4 pr-20 text-xs sm:text-sm rounded-full border border-[#D1DBE6] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition"
                      />
                      <div className="absolute right-1.5 flex items-center gap-1">
                        <button
                          type="button"
                          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
                          aria-label="Voice input"
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                        <button
                          type="submit"
                          className="p-1.5 bg-[#1E3A5F] hover:bg-[#152a45] text-white rounded-full transition"
                          aria-label="Send message"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Floating Distress Score Badge overlapping bottom-left */}
                  <div className="absolute -bottom-6 -left-3 sm:-left-6 bg-white border border-[#DBE2EB] rounded-2xl px-4 py-2.5 shadow-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center font-bold text-[#B45309] text-sm">
                      52
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#142334]">Moderate — support available</p>
                      <p className="text-[11px] text-[#64748B]">Reviewed by trained counsellor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== HOW IT WORKS SECTION ===================== */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488]">HOW IT WORKS</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#142334] mt-1.5">
                Gentle, regular check-ins. Real people when it matters.
              </h2>
            </div>

            {/* Disclaimer Banner Matching Base44 */}
            <div className="rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <p className="text-xs sm:text-sm text-amber-900 leading-normal">
                This platform supports well-being monitoring. It does not provide a medical diagnosis or replace emergency services.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== PRIVACY BY DESIGN SECTION ===================== */}
        <section id="privacy-by-design" className="py-20 bg-[#132C48] text-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">PRIVACY BY DESIGN</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white mt-1.5">
                  Built around dignity, choice and safety.
                </h2>
              </div>
              <Link
                href="/privacy"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-cyan-300 hover:text-white transition group"
              >
                <span>Read our safeguards</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 4 Safeguard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white">Your consent matters</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Every feature is opt-in. Pause or withdraw at any time.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 mb-4">
                  <CameraOff className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white">Camera is optional</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Never required. Skip it and still receive full support.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white">Your data is encrypted</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Protected in transit and at rest, with pseudonymous IDs.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 mb-4">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white">Trained humans review serious alerts</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  No automated decision is made about you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== EXPLORE PORTALS SECTION ===================== */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488]">EXPLORE PORTALS</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#142334] mt-1.5">
                  Three portals, one support network.
                </h2>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-xs font-semibold text-[#B45309]">
                <span>⚗</span>
                <span>Demo Mode</span>
              </div>
            </div>

            {/* 3 Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. Victim Demo */}
              <Link
                href="/victim"
                className="p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-teal-700">
                      <Heart className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition">
                      ↗
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#142334]">Victim portal</h3>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                    Check-ins, AI chat, translator, games & calming tools
                  </p>
                </div>
              </Link>

              {/* 2. Counsellor Portal */}
              <Link
                href="/counsellor"
                className="p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-blue-700">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition">
                      ↗
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#142334]">Counsellor portal</h3>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                    Priority cases & explainable alerts
                  </p>
                </div>
              </Link>

              {/* 3. Rehabilitation Portal (Admin) */}
              <Link
                href="/admin"
                className="p-6 rounded-2xl bg-white border border-[#DBE2EB] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-emerald-700">
                      <Briefcase className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition">
                      ↗
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#142334]">Rehabilitation & Admin</h3>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                    Vocational training & compensation tracking
                  </p>
                </div>
              </Link>
            </div>

            {/* Bottom Links */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/architecture"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#DBE2EB] text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
              >
                <Cpu className="w-4 h-4 text-slate-500" />
                <span>Technical architecture</span>
              </Link>

              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#DBE2EB] text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
              >
                <Lock className="w-4 h-4 text-slate-500" />
                <span>Privacy & human oversight</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="py-10 border-t border-[#DBE2EB] bg-white">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#0F2744] flex items-center justify-center text-white">
              <Shield className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/30" />
            </div>
            <div>
              <span className="text-base font-bold text-[#142334]">Sahaaya+</span>
              <p className="text-[8px] font-bold text-slate-400 tracking-wider uppercase">WELL-BEING SUPPORT</p>
            </div>
          </div>

          <p className="text-xs text-[#64748B] text-center sm:text-right max-w-md leading-relaxed">
            Aligned with NHAA (14566) and the Integrated National Portal. Confidential well-being support platform. Not a diagnostic tool.
          </p>
        </div>
      </footer>
    </div>
  );
}
