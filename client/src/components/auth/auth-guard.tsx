'use client';

import React, { useEffect } from 'react';
import { useRouter } from '@/next-compat';
import { useAuth } from '@/context/auth-context';
import { useIsMounted } from '@/hooks/use-is-mounted';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [isMounted, isAuthenticated, router]);

  if (!isMounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center font-sans">
        <div className="w-9 h-9 border-3 border-slate-200 border-t-[#122842] rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-500 font-medium">Verifying access...</p>
      </div>
    );
  }

  return <>{children}</>;
}
