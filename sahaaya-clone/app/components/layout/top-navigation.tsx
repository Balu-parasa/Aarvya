'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, AlertCircle, Menu, X, ChevronDown, Check, LogOut, UserCheck } from 'lucide-react';
import EmergencyModal from '@/app/components/ui/emergency-modal';
import { useAuth } from '@/app/context/auth-context';

interface TopNavProps {
  role?: string;
  showSOS?: boolean;
  language?: string;
  onLanguageChange?: (lang: string) => void;
}

export default function TopNavigation({
  role = '',
  showSOS = true,
  language = 'English',
  onLanguageChange,
}: TopNavProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [currentLang, setCurrentLang] = useState(language);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'reg', name: 'Regional (Bhashini)' },
  ];

  const handleSelectLang = (name: string) => {
    setCurrentLang(name);
    setLangMenuOpen(false);
    if (onLanguageChange) onLanguageChange(name);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#DBE2EB] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#0F2744] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                <Shield className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-[#142334] tracking-tight">Sahaaya+</span>
                  {role && <span className="text-xs text-muted-foreground font-medium hidden sm:inline">· {role}</span>}
                </div>
                <span className="text-[9px] tracking-wider font-bold text-slate-400 uppercase -mt-1">WELL-BEING SUPPORT</span>
              </div>
            </Link>

            {/* Desktop Actions */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="hidden md:flex items-center justify-between h-10 w-[132px] rounded-full bg-white border border-[#D1DBE6] px-3.5 text-xs font-medium text-[#142334] shadow-sm hover:bg-slate-50 transition"
                  aria-label="Select language"
                >
                  <span className="text-slate-500 font-serif">文A</span>
                  <span className="truncate">{currentLang.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white shadow-lg border border-[#DBE2EB] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => handleSelectLang(l.name)}
                        className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-50 flex items-center justify-between text-slate-700"
                      >
                        {l.name}
                        {currentLang.startsWith(l.name.split(' ')[0]) && (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Counsellor Login or Authenticated User */}
              {isAuthenticated && user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href={user.role === 'counsellor' ? '/counsellor' : user.role === 'admin' ? '/admin' : '/victim'}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-800 font-semibold transition"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{user.name.split(' ')[0]}</span>
                    <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-600 capitalize">
                      {user.role}
                    </span>
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full h-9 px-3 transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log out</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center justify-center text-xs font-medium text-slate-700 hover:text-slate-900 px-3 py-1.5 transition"
                >
                  Counsellor Login
                </Link>
              )}

              {/* Emergency Support Button */}
              {showSOS && (
                <button
                  onClick={() => setSosModalOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-[#B91C1C] hover:bg-red-800 rounded-full h-9 px-4 shadow-sm transition cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Emergency Support</span>
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                className="sm:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="sm:hidden py-4 border-t border-[#DBE2EB] flex flex-col gap-2.5 animate-in slide-in-from-top duration-200">
              <div className="flex gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleSelectLang(l.name)}
                    className={`flex-1 py-1.5 rounded-full text-xs font-medium border ${
                      currentLang.startsWith(l.name.split(' ')[0])
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {l.name.split(' ')[0]}
                  </button>
                ))}
              </div>
              {isAuthenticated && user ? (
                <>
                  <div className="text-center py-1.5 text-xs font-medium text-slate-600 bg-slate-50 rounded-full border border-slate-200">
                    Logged in as <span className="font-bold text-slate-900">{user.name}</span> ({user.role})
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-full border border-red-200"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-full border border-slate-200"
                >
                  Log in
                </Link>
              )}
              <Link
                href="/victim"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-full border border-slate-200"
              >
                Victim Portal Demo
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Emergency Modal */}
      <EmergencyModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />
    </>
  );
}
