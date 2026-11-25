'use client';

export function LanguageSelector({ value, onChange }: { value: string; onChange: (newValue: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-full bg-white border-0 focus:outline-none focus:ring-1 focus:ring-primary px-3 text-sm"
    >
      <option value="English">English</option>
      <option value="Hindi">हिंदी</option>
      <option value="Regional">Regional (coming via Bhashini)</option>
    </select>
  );
}