'use client';

import React, { useEffect } from 'react';
import { useRouter } from '@/next-compat';
import { useAuth, UserRole } from '@/context/auth-context';
import { useIsMounted } from '@/hooks/use-is-mounted';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted) return;

    if (!isAuthenticated || !user) {
      router.push('/login');
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Redirect to their respective authorized portal
      if (user.role === 'victim') {
        router.push('/victim');
      } else if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/counsellor');
      }
    }
  }, [isMounted, isAuthenticated, user, allowedRoles, router]);

  if (!isMounted || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center font-sans">
        <div className="w-9 h-9 border-3 border-slate-200 border-t-[#122842] rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-500 font-medium">Verifying access...</p>
      </div>
    );
  }

  // Prevent flash of unauthorized content
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center font-sans">
        <div className="w-9 h-9 border-3 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-3" />
        <p className="text-xs text-amber-700 font-medium">Redirecting to your authorized portal...</p>
      </div>
    );
  }

  return <>{children}</>;
}
