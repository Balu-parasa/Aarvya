'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'victim' | 'counsellor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  case_id?: string;
  avatar?: string;
  hasCompletedCheckin?: boolean;
  distressScore?: number;
  nextCheckinTime?: string;
  symptoms?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<boolean>;
  loginWithGoogle: (role?: UserRole) => Promise<boolean>;
  register: (email: string, password?: string, name?: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  setRole: (role: UserRole) => void;
  updateUser: (fields: Partial<User>) => void;
  setHasCompletedCheckin: (completed: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEMO_USERS: Record<string, User> = {
  'baluparasa239@gmail.com': {
    id: 'usr_balu',
    name: 'Balu Parasa',
    email: 'baluparasa239@gmail.com',
    role: 'counsellor',
    hasCompletedCheckin: true,
  },
  'asha@sahaaya.gov.in': {
    id: 'VCT-UP-00124',
    name: 'Asha',
    email: 'asha@sahaaya.gov.in',
    role: 'victim',
    case_id: 'VCT-UP-00124',
    hasCompletedCheckin: true,
    distressScore: 52,
    nextCheckinTime: 'Tomorrow, 10:30 AM',
    symptoms: ['Sleep disruption', 'Chest tightness'],
  },
  'counsellor@sahaaya.gov.in': {
    id: 'CNS-UP-042',
    name: 'R. Sharma (Duty Counsellor)',
    email: 'counsellor@sahaaya.gov.in',
    role: 'counsellor',
    hasCompletedCheckin: true,
  },
  'admin@sahaaya.gov.in': {
    id: 'ADM-UP-01',
    name: 'Administrator (District & State Oversight)',
    email: 'admin@sahaaya.gov.in',
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
        const stored = localStorage.getItem('sahaaya_user');
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
      const res = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password, role }),
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
            localStorage.setItem('sahaaya_user', JSON.stringify(apiUser));
            if (data.token) {
              localStorage.setItem('sahaaya_token', data.token);
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
      localStorage.setItem('sahaaya_user', JSON.stringify(loggedInUser));
    } catch {}
    return true;
  };

  const loginWithGoogle = async (role: UserRole = 'counsellor'): Promise<boolean> => {
    const googleUser: User = {
      id: 'usr_google_123',
      name: 'Balu Parasa',
      email: 'baluparasa239@gmail.com',
      role,
      hasCompletedCheckin: true,
    };
    setUser(googleUser);
    try {
      localStorage.setItem('sahaaya_user', JSON.stringify(googleUser));
    } catch {}
    return true;
  };

  const register = async (email: string, password?: string, name?: string, role: UserRole = 'victim'): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();

    // Attempt Django REST Framework registration
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/register/', {
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
            localStorage.setItem('sahaaya_user', JSON.stringify(apiUser));
            if (data.token) {
              localStorage.setItem('sahaaya_token', data.token);
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
      localStorage.setItem('sahaaya_user', JSON.stringify(newUser));
    } catch {}
    return true;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('sahaaya_user');
      localStorage.removeItem('sahaaya_token');
    } catch {}
  };

  const setRole = (role: UserRole) => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      try {
        localStorage.setItem('sahaaya_user', JSON.stringify(updated));
      } catch {}
    }
  };

  const updateUser = (fields: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...fields };
      setUser(updated);
      try {
        localStorage.setItem('sahaaya_user', JSON.stringify(updated));
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
