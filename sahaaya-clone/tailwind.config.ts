import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        foreground: '#142334',
        card: '#FFFFFF',
        primary: '#0F172A',
        'primary-foreground': '#FFFFFF',
        'muted-foreground': '#64748B',
        border: '#DBE2EB',
        input: '#D1DBE6',
        destructive: '#DC2626',
        'destructive-foreground': '#FFFFFF',
        muted: '#F1F5F9',
        accent: '#F1F5F9',
        'accent-foreground': '#142334',
        'alert-bg': '#FEF2F2',
        'alert-border': '#FEE2E2',
      },
      borderRadius: {
        card: '16px',
        pill: '9999px',
        small: '12px',
        input: '14px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Figtree', '"Noto Sans Devanagari"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;