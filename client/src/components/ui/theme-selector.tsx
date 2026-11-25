'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeMode } from '@/context/theme-context';
import { Palette, Check, Leaf, Compass } from 'lucide-react';

interface ThemeSelectorProps {
  variant?: 'nav' | 'floating';
}

export default function ThemeSelector({ variant = 'nav' }: ThemeSelectorProps) {
  const { theme, setTheme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: {
    id: ThemeMode;
    name: string;
    subtitle: string;
    icon: typeof Leaf;
    bg: string;
    primary: string;
    accent: string;
    border: string;
    isMain?: boolean;
  }[] = [
    {
      id: 'botanical',
      name: 'Botanical Eucalyptus',
      subtitle: 'Warm Alabaster · Deep Eucalyptus · Soft Sage',
      icon: Leaf,
      bg: '#FAF9F6',
      primary: '#134E4A',
      accent: '#E6F2EF',
      border: '#EAE6DF',
      isMain: true,
    },
    {
      id: 'royal-indigo',
      name: 'Royal Indigo & Cashmere',
      subtitle: 'Cashmere Silk · Deep Indigo · Glacier Azure',
      icon: Compass,
      bg: '#F8FAFD',
      primary: '#1D3A8A',
      accent: '#E8F0FE',
      border: '#DCE4EF',
      isMain: false,
    },
  ];

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];
  const CurrentIcon = currentThemeObj.icon;

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-5 right-5 z-50" ref={menuRef}>
        <div className="relative">
          {open && (
            <div className="absolute bottom-14 right-0 w-80 rounded-2xl bg-white shadow-2xl border border-slate-200 p-3 mb-2 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" style={{ color: currentThemeObj.primary }} />
                  <span>Choose Theme</span>
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border" style={{ backgroundColor: currentThemeObj.accent, color: currentThemeObj.primary, borderColor: currentThemeObj.border }}>
                  2 Premium Modes
                </span>
              </div>

              <div className="space-y-2">
                {themes.map((t) => {
                  const isActive = theme === t.id;
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'border-2 shadow-sm'
                          : 'hover:bg-slate-50 border border-slate-200/90'
                      }`}
                      style={{
                        backgroundColor: isActive ? t.bg : undefined,
                        borderColor: isActive ? t.primary : undefined,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 shadow-xs"
                          style={{ backgroundColor: t.bg, borderColor: t.border }}
                        >
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center text-white shadow-xs"
                            style={{ backgroundColor: t.primary }}
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: t.accent }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5" style={{ color: t.primary }} />
                            <p className="text-xs font-bold text-slate-900">{t.name}</p>
                            {t.isMain && (
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                Main
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">{t.subtitle}</p>
                        </div>
                      </div>
                      {isActive && <Check className="w-4 h-4 font-bold shrink-0" style={{ color: t.primary }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={() => setOpen(!open)}
            aria-label="Change Theme"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur border border-slate-300 shadow-xl text-slate-800 hover:scale-105 transition-all text-xs font-semibold cursor-pointer group"
          >
            <CurrentIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" style={{ color: currentThemeObj.primary }} />
            <span>
              Theme: <span className="font-bold">{currentThemeObj.name}</span>
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 h-10 px-3.5 rounded-full bg-white border border-[#D1DBE6] text-xs font-medium text-[#142334] shadow-sm hover:bg-slate-50 transition cursor-pointer"
        aria-label="Theme selection"
      >
        <CurrentIcon className="w-3.5 h-3.5" style={{ color: currentThemeObj.primary }} />
        <span className="hidden sm:inline font-medium">
          {currentThemeObj.name.split(' ')[0]}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-xl border border-[#DBE2EB] p-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <p className="px-2 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-2">
            SELECT AESTHETIC THEME
          </p>
          <div className="space-y-1.5">
            {themes.map((t) => {
              const isActive = theme === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'border-2 shadow-xs'
                      : 'hover:bg-slate-50 border border-slate-200/90'
                  }`}
                  style={{
                    backgroundColor: isActive ? t.bg : undefined,
                    borderColor: isActive ? t.primary : undefined,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 shadow-xs"
                      style={{ backgroundColor: t.bg, borderColor: t.border }}
                    >
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: t.primary }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: t.accent }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" style={{ color: t.primary }} />
                        <p className="text-xs font-bold text-slate-900">{t.name}</p>
                        {t.isMain && (
                          <span className="text-[9px] font-bold uppercase px-1 py-0.2 rounded bg-emerald-100 text-emerald-800">
                            Main
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-normal mt-0.5">{t.subtitle}</p>
                    </div>
                  </div>
                  {isActive && <Check className="w-4 h-4 font-bold shrink-0" style={{ color: t.primary }} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
