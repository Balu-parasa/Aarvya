'use client';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'destructive' | 'small' | 'large';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4',
    lg: 'h-14 px-7 text-base',
  };

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-700',
    outline: 'border border-primary text-primary hover:bg-[#EEF3F9]',
    ghost: 'border border-transparent bg-transparent hover:bg-[#EEF3F9] text-primary',
    destructive: 'bg-destructive text-white hover:bg-red-700',
    small: 'h-8 px-3 text-xs',
    large: 'h-14 px-7 text-base',
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const variantClass = variantClasses[variant] || variantClasses.primary;

  return (
    <button
      onClick={onClick}
      className={[
        'rounded-full',
        'font-medium',
        'transition-colors',
        'duration-200',
        'ease-in-out',
        'focus:outline-none',
        'focus-visible:ring-1',
        'focus-visible:ring-primary',
        sizeClass,
        variantClass,
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
