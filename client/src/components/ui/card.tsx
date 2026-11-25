'use client';

interface CardProps {
  children: React.ReactNode;
  variant?: 'soft' | 'feature' | 'alert' | 'kpi' | 'portal' | 'default';
  className?: string;
}

export default function Card({
  children,
  variant = 'soft',
  className = '',
}: CardProps) {
  const variants: Record<string, string> = {
    default: 'bg-card border border-border rounded-lg shadow-card-shadow p-6',
    soft: 'bg-card border border-border rounded-full shadow-card-shadow p-6',
    feature: 'bg-card border border-border rounded-[28px] p-6 shadow-card-shadow transition-transform hover:-translate-y-1 duration-200',
    alert: 'bg-[var(--alert-bg)] border border-[var(--alert-border)] rounded-2xl p-6 shadow-card-shadow',
    kpi: 'bg-card border border-border rounded-full p-5 shadow-card-shadow',
    portal: 'bg-card border border-border rounded-full p-4 shadow-card-shadow flex flex-col gap-3 hover:-translate-y-0.5 transition-transform duration-200',
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

export { Card, Card as SoftCard };
