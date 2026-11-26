'use client';

import React, { useState, useEffect } from 'react';
import Link from '@/next-compat';
import { useRouter } from '@/next-compat';
import { Mail, Lock, LogIn, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth, UserRole } from '@/context/auth-context';
import { useIsMounted } from '@/hooks/use-is-mounted';
import AarvyaLogo from '@/components/ui/aarvya-logo';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage({ onLoginSuccess }: { onLoginSuccess?: () => void } = {}) {
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'reset'>(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get('mode') === 'reset') return 'reset';
    }
    return 'login';
  });

  const [roleParam] = useState<UserRole | null>(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      return sp.get('role') as UserRole | null;
    }
    return null;
  });
  const [email, setEmail] = useState('baluparasa239@gmail.com');
  const [password, setPassword] = useState('Balu@123');
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted && isAuthenticated && !onLoginSuccess) {
      router.push('/');
    }
  }, [isMounted, isAuthenticated, onLoginSuccess, router]);

  const getRoleDestination = (role: UserRole) => {
    switch (role) {
      case 'victim':
        return '/victim';
      case 'admin':
        return '/admin';
      case 'counsellor':
      default:
        return '/counsellor';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setLoading(true);
    try {
      const success = await login(email, password, roleParam || undefined);
      if (success) {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          // Find assigned role or target
          const targetRole = roleParam || (email.includes('asha') ? 'victim' : email.includes('admin') ? 'admin' : 'counsellor');
          router.push(getRoleDestination(targetRole));
        }
      }
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError(null);
    try {
      const targetRole = roleParam || 'victim';
      const result = await loginWithGoogle(targetRole, credentialResponse.credential, 'login');
      if (result.success) {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          router.push(getRoleDestination(targetRole));
        }
      } else if (result.notFound) {
        setError('No account exists with this Google account. Please create an account first.');
      } else {
        setError(result.error || 'Google login failed');
      }
    } catch {
      setError('Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const targetRole = roleParam || 'counsellor';
      await loginWithGoogle(targetRole);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.push(getRoleDestination(targetRole));
      }
    } catch {
      setError('Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 600);
  };

  const applyDemo = async (demoEmail: string, demoPass: string, demoRole: UserRole) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
    setLoading(true);
    try {
      const success = await login(demoEmail, demoPass, demoRole);
      if (success) {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          router.push(getRoleDestination(demoRole));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 py-12 relative font-sans">
      {/* Top squircle icon & header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-white/90 border border-slate-200/90 rounded-2xl flex items-center justify-center shadow-sm mb-3.5 transition-transform hover:scale-105 p-2">
          <AarvyaLogo size={48} />
        </div>
        <h1 className="font-serif text-[27px] sm:text-[30px] font-normal text-[#142334] tracking-tight">
          {mode === 'login' ? 'Welcome to Aarvya' : 'Reset password'}
        </h1>
        <p className="text-[13px] text-[#64748B] mt-1">
          {mode === 'login' ? 'Log in to your account' : "We'll send you a link to reset it"}
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-[#E2E8F0] p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex flex-col gap-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
            {error.includes('create an account') && (
              <Link
                href="/register"
                className="mt-1 self-start inline-flex items-center text-xs font-semibold text-[#1E3A5F] underline hover:text-blue-700"
              >
                Go to Create Account →
              </Link>
            )}
          </div>
        )}

        {mode === 'login' ? (
          <>
            {/* Continue with Google */}
            <div className="w-full flex justify-center mb-1">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google sign-in popup was closed or failed')}
                text="continue_with"
                shape="rectangular"
                width="360"
              />
            </div>

            {/* Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="w-full border-t border-[#E2E8F0]" />
              <span className="absolute bg-white px-3 text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                OR
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#334155] mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#CBD5E1] text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition-all bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#334155]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('reset');
                      setError(null);
                      setResetSent(false);
                    }}
                    className="text-xs font-medium text-[#1E3A5F] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#CBD5E1] text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition-all bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-[#193556] hover:bg-[#12263F] text-white text-[13px] font-semibold transition-colors shadow-2xs flex items-center justify-center cursor-pointer mt-5"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
          </>
        ) : (
          /* Reset Password Mode */
          <div>
            {resetSent ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-[#142334] mb-1">
                  Reset link sent!
                </h3>
                <p className="text-xs text-[#64748B] mb-5">
                  We sent password reset instructions to{' '}
                  <span className="font-semibold text-[#0F172A]">{email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setResetSent(false);
                  }}
                  className="w-full h-11 rounded-xl bg-[#193556] hover:bg-[#12263F] text-white text-[13px] font-semibold transition-colors flex items-center justify-center cursor-pointer"
                >
                  Return to log in
                </button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#334155] mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#CBD5E1] text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition-all bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-[#2A4B72] hover:bg-[#193556] text-white text-[13px] font-semibold transition-colors shadow-2xs flex items-center justify-center cursor-pointer mt-5"
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Under card links */}
      <div className="mt-5 text-center">
        {mode === 'login' ? (
          <p className="text-xs text-[#64748B]">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-[#1E3A5F] font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        ) : (
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className="text-xs text-[#1E3A5F] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to log in
          </button>
        )}
      </div>

      {/* Quick Demo Roles */}
      <div className="w-full max-w-[420px] mt-6 pt-5 border-t border-[#E2E8F0]/70 text-center">
        <p className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-2.5">
          Quick Portals
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => applyDemo('asha@aarvya.gov.in', 'Asha@123', 'victim')}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${email === 'asha@aarvya.gov.in' || email === 'asha@sahaaya.gov.in'
              ? 'bg-[#193556] text-white border-[#193556] shadow-xs'
              : 'bg-white text-[#334155] border-[#CBD5E1] hover:bg-slate-50'
              }`}
          >
            Victim (Asha)
          </button>
          <button
            type="button"
            onClick={() => applyDemo('baluparasa239@gmail.com', 'Balu@123', 'counsellor')}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${email === 'baluparasa239@gmail.com'
              ? 'bg-[#193556] text-white border-[#193556] shadow-xs'
              : 'bg-white text-[#334155] border-[#CBD5E1] hover:bg-slate-50'
              }`}
          >
            Counsellor (Balu)
          </button>
          <button
            type="button"
            onClick={() => applyDemo('admin@aarvya.gov.in', 'Admin@123', 'admin')}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${email === 'admin@aarvya.gov.in' || email === 'admin@sahaaya.gov.in'
              ? 'bg-[#193556] text-white border-[#193556] shadow-xs'
              : 'bg-white text-[#334155] border-[#CBD5E1] hover:bg-slate-50'
              }`}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}
