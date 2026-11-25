'use client';

import React, { useState } from 'react';
import Link from '@/next-compat';
import { useRouter } from '@/next-compat';
import { Mail, Lock, User, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your name or chosen alias');
      return;
    }
    if (!email) {
      setError('Please provide an email address');
      return;
    }
    if (!password) {
      setError('Please provide a password');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const ok = await register(email, password, name.trim(), 'victim');
      if (ok) {
        // Newly created victim account lands on home dashboard to start secure check-in
        router.push('/');
      }
    } catch {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await loginWithGoogle('victim');
      router.push('/');
    } catch {
      setError('Google sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 py-12 relative font-sans">
      {/* Top squircle icon & header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-[#122842] text-white rounded-xl flex items-center justify-center shadow-xs mb-3.5 transition-transform hover:scale-105">
          <UserPlus className="w-5 h-5 stroke-[2.2]" />
        </div>
        <h1 className="font-serif text-[27px] sm:text-[30px] font-normal text-[#142334] tracking-tight">
          Create your account
        </h1>
        <p className="text-[13px] text-[#64748B] mt-1">Sign up to get started</p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-[#E2E8F0] p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Continue with Google */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full h-11 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[13px] font-medium text-[#1E293B] flex items-center justify-center gap-2.5 transition-colors shadow-2xs cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full border-t border-[#E2E8F0]" />
          <span className="absolute bg-white px-3 text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">
            OR
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1.5">
              Full Name / Chosen Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Asha"
                required
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#CBD5E1] text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition-all bg-white"
              />
            </div>
          </div>

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
            <label className="block text-xs font-medium text-[#334155] mb-1.5">
              Password
            </label>
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

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>

      {/* Under card link */}
      <p className="mt-5 text-center text-xs text-[#64748B]">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-[#1E3A5F] font-semibold hover:underline"
        >
          Log in
        </Link>
      </p>

      {/* Edit with Base 44 badge */}
      <div className="fixed bottom-3 right-3 flex items-center gap-1.5 bg-[#0F172A] text-white px-2.5 py-1 rounded-md text-[11px] font-medium shadow-lg pointer-events-none opacity-90">
        <span className="w-2 h-2 rounded-full bg-orange-500" />
        Edit with <span className="font-bold">Base 44</span>
        <span className="text-slate-400 ml-1 text-xs">×</span>
      </div>
    </div>
  );
}
