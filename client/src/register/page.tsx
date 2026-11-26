'use client';

import React, { useState } from 'react';
import Link from '@/next-compat';
import { useRouter } from '@/next-compat';
import { Mail, Lock, User, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { GoogleLogin } from '@react-oauth/google';

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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await loginWithGoogle('victim', credentialResponse.credential, 'register');
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Google sign-up failed');
      }
    } catch {
      setError('Google sign-up failed');
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
        <div className="w-full flex justify-center mb-1">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google sign-up popup was closed or failed')}
            text="signup_with"
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
