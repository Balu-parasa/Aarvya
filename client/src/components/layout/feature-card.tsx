'use client';

export function FeatureCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] p-6 group hover:-translate-y-1 transition-transform bg-white border-[#DBE2EB]">
      {children}
    </div>
  );
}