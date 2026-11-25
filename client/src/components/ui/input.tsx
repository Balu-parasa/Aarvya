'use client';

import { useId } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: string;
  placeholder?: string;
  icon?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Input({
  type = 'text',
  placeholder = 'Type here...',
  icon = false,
  label,
  size = 'md',
  className = '',
  id: externalId,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = externalId || (label ? generatedId : undefined);
  const sizeClass = size === 'sm' ? 'h-8 px-3 text-xs' : size === 'lg' ? 'h-14 px-7 text-base' : 'h-12 px-4 text-sm';

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-muted-foreground mb-1.5"
        >
          {label}
        </label>
      )}
      <div className={`relative w-full ${sizeClass} border border-[#D1DBE6] rounded-md bg-transparent focus-within:ring-1 focus-within:ring-[#0F172A] focus-within:border-[#0F172A] transition-colors flex items-center ${className}`}>
        {icon && (
          <div className="absolute left-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {type === 'email' && (
                <path d="M22 16a5 5 0 0 1-5-5H9a5 5 0 0 1-5-5V6a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5z"/>
              )}
              {type === 'password' && (
                <path d="M3 3h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm19 16a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-1h10v1zm-5-5a3 3 0 0 1 6 0v6h-2z"/>
              )}
            </svg>
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full h-full bg-transparent font-medium text-foreground placeholder:text-muted-foreground focus:outline-none ${icon ? 'pl-7' : ''}`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
}
