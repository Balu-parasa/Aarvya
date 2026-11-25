'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'botanical' | 'royal-indigo';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'botanical',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('botanical');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aarvya_theme') as ThemeMode | null;
      if (saved === 'botanical' || saved === 'royal-indigo') {
        setThemeState(saved);
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        setThemeState('botanical');
        document.documentElement.setAttribute('data-theme', 'botanical');
      }
    } catch {
      document.documentElement.setAttribute('data-theme', 'botanical');
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('aarvya_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch {}
  };

  const toggleTheme = () => {
    setTheme(theme === 'botanical' ? 'royal-indigo' : 'botanical');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
