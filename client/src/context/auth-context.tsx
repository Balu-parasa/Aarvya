'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'victim' | 'counsellor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  case_id?: string;
  hasCompletedCheckin?: boolean;
  distressScore?: number;
  nextCheckinTime?: string;
  symptoms?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<boolean>;
  loginWithGoogle: (role?: UserRole, googleToken?: string, mode?: 'login' | 'register') => Promise<{ success: boolean; notFound?: boolean; error?: string }>;
  register: (email: string, password?: string, name?: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  setRole: (role: UserRole) => void;
  updateUser: (fields: Partial<User>) => void;
  setHasCompletedCheckin: (completed: boolean) => void;
}

// API base configuration supporting local and deployed environments
const API_BASE =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) ||
  (typeof process !== 'undefined' && (process.env?.NEXT_PUBLIC_API_URL || process.env?.VITE_API_URL)) ||
  'http://127.0.0.1:8000/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEMO_USERS: Record<string, User> = {
  'baluparasa239@gmail.com': {
    id: 'usr_balu',
    name: 'Balu Parasa',
    email: 'baluparasa239@gmail.com',
    role: 'counsellor',
    hasCompletedCheckin: true,
  },
  'asha@aarvya.gov.in': {
    id: 'VCT-UP-00124',
    name: 'Asha',
    email: 'asha@aarvya.gov.in',
    role: 'victim',
    case_id: 'VCT-UP-00124',
    hasCompletedCheckin: true,
    distressScore: 52,
    nextCheckinTime: 'Tomorrow, 10:30 AM',
    symptoms: ['Sleep disruption', 'Chest tightness'],
  },
  'asha@sahaaya.gov.in': {
    id: 'VCT-UP-00124',
    name: 'Asha',
    email: 'asha@aarvya.gov.in',
    role: 'victim',
    case_id: 'VCT-UP-00124',
    hasCompletedCheckin: true,
    distressScore: 52,
    nextCheckinTime: 'Tomorrow, 10:30 AM',
    symptoms: ['Sleep disruption', 'Chest tightness'],
  },
  'counsellor@aarvya.gov.in': {
    id: 'CNS-UP-042',
    name: 'R. Sharma (Duty Counsellor)',
    email: 'counsellor@aarvya.gov.in',
    role: 'counsellor',
    hasCompletedCheckin: true,
  },
  'counsellor@sahaaya.gov.in': {
    id: 'CNS-UP-042',
    name: 'R. Sharma (Duty Counsellor)',
    email: 'counsellor@aarvya.gov.in',
    role: 'counsellor',
    hasCompletedCheckin: true,
  },
  'admin@aarvya.gov.in': {
    id: 'ADM-UP-01',
    name: 'Administrator (District & State Oversight)',
    email: 'admin@aarvya.gov.in',
    role: 'admin',
    hasCompletedCheckin: true,
  },
  'admin@sahaaya.gov.in': {
    id: 'ADM-UP-01',
    name: 'Administrator (District & State Oversight)',
    email: 'admin@aarvya.gov.in',
    role: 'admin',
    hasCompletedCheckin: true,
  },
};

export const getRoleDestination = (role: UserRole) => {
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('aarvya_user') || localStorage.getItem('sahaaya_user');
        if (stored) {
          return JSON.parse(stored);
        }
      } catch {
        // ignore localStorage errors
      }
    }
    return null;
  });

  const login = async (email: string, password?: string, role?: UserRole): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Attempt Django REST Framework authentication
    try {
      const res = await fetch(`${API_BASE}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const apiUser: User = {
            id: String(data.user.id || `usr_${Date.now()}`),
            name: data.user.name || cleanEmail.split('@')[0],
            email: data.user.email,
            role: (data.user.role as UserRole) || role || 'counsellor',
            case_id: data.user.case_id || (data.user.role === 'victim' ? 'VCT-UP-00124' : undefined),
            hasCompletedCheckin: data.user.hasCompletedCheckin ?? true,
            distressScore: data.user.distressScore ?? 52,
            nextCheckinTime: data.user.nextCheckinTime ?? 'Tomorrow, 10:30 AM',
            symptoms: data.user.symptoms ?? [],
          };
          setUser(apiUser);
          try {
            localStorage.setItem('aarvya_user', JSON.stringify(apiUser));
            if (data.token) {
              localStorage.setItem('aarvya_token', data.token);
            }
          } catch {}
          return true;
        }
      }
    } catch {
      // Graceful fallback to client demo auth if Django is not running
    }

    const matched = DEMO_USERS[cleanEmail];

    const loggedInUser: User = matched || {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email: cleanEmail,
      role: role || 'counsellor',
      hasCompletedCheckin: true,
      distressScore: 52,
      nextCheckinTime: 'Tomorrow, 10:30 AM',
    };

    if (role) {
      loggedInUser.role = role;
    }

    setUser(loggedInUser);
    try {
      localStorage.setItem('aarvya_user', JSON.stringify(loggedInUser));
    } catch {}
    return true;
  };

  const loginWithGoogle = async (
    role: UserRole = 'counsellor',
    googleToken?: string,
    mode: 'login' | 'register' = 'login'
  ): Promise<{ success: boolean; notFound?: boolean; error?: string }> => {
    if (!googleToken) {
      return { success: false, error: 'Google authentication was cancelled or token is missing.' };
    }

    try {
      const res = await fetch(`${API_BASE}/auth/google/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken, role, mode }),
      });

      const data = await res.json();

      if (res.status === 404 && data.not_found) {
        return { success: false, notFound: true, error: data.error };
      }

      if (res.ok && data.user) {
        const apiUser: User = {
          id: String(data.user.id),
          name: data.user.name || data.user.username,
          email: data.user.email,
          role: (data.user.role as UserRole) || role,
          case_id: data.user.case_id,
          hasCompletedCheckin: data.user.has_completed_checkin ?? true,
          distressScore: data.user.distress_score ?? 52,
          nextCheckinTime: data.user.next_checkin_time ?? 'Tomorrow, 10:30 AM',
        };
        setUser(apiUser);
        try {
          localStorage.setItem('aarvya_user', JSON.stringify(apiUser));
          if (data.token) {
            localStorage.setItem('aarvya_token', data.token);
          }
        } catch {}
        return { success: true };
      }

      return { success: false, error: data.error || 'Authentication failed' };
    } catch (err: any) {
      return { success: false, error: 'Cannot connect to authentication server. Please check your network or server.' };
    }
  };

  const register = async (email: string, password?: string, name?: string, role: UserRole = 'victim'): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();

    // Attempt Django REST Framework registration
    try {
      const res = await fetch(`${API_BASE}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password, name, role }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const apiUser: User = {
            id: String(data.user.id || `usr_${Date.now()}`),
            name: data.user.name || name || cleanEmail.split('@')[0],
            email: data.user.email,
            role: (data.user.role as UserRole) || role,
            case_id: data.user.case_id,
            hasCompletedCheckin: false, // New account requires initial check-in!
            distressScore: 52,
            nextCheckinTime: 'Tomorrow, 10:30 AM',
            symptoms: [],
          };
          setUser(apiUser);
          try {
            localStorage.setItem('aarvya_user', JSON.stringify(apiUser));
            if (data.token) {
              localStorage.setItem('aarvya_token', data.token);
            }
          } catch {}
          return true;
        }
      }
    } catch {
      // Graceful fallback if Django is not running
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name || email.split('@')[0],
      email: cleanEmail,
      role,
      case_id: role === 'victim' ? `VCT-UP-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
      hasCompletedCheckin: false, // New account requires initial check-in!
      distressScore: 52,
      nextCheckinTime: 'Tomorrow, 10:30 AM',
      symptoms: [],
    };
    setUser(newUser);
    try {
      localStorage.setItem('aarvya_user', JSON.stringify(newUser));
    } catch {}
    return true;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('aarvya_user');
      localStorage.removeItem('aarvya_token');
    } catch {}
  };

  const setRole = (role: UserRole) => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      try {
        localStorage.setItem('aarvya_user', JSON.stringify(updated));
      } catch {}
    }
  };

  const updateUser = (fields: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...fields };
      setUser(updated);
      try {
        localStorage.setItem('aarvya_user', JSON.stringify(updated));
      } catch {}
    }
  };

  const setHasCompletedCheckin = (completed: boolean) => {
    updateUser({ hasCompletedCheckin: completed });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        setRole,
        updateUser,
        setHasCompletedCheckin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
