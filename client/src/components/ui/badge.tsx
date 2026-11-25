'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'alert' | 'success' | 'warning' | 'info';
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  className = '',
}: BadgeProps) {
  const variants = {
    primary: 'bg-[#F1F5F9] text-[#0F172A]',
    alert: 'bg-[#FEF2F2] text-[#DC2626]',
    success: 'bg-[#F0FDF4] text-[#16A34A]',
    warning: 'bg-[#FEF3C7] text-[#D97706]',
    info: 'bg-[#EFF6FF] text-[#2563EB]',
  };

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold',
        variants[variant],
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </span>
  );
}