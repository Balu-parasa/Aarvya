import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from '@/page';
import VictimPage from '@/victim/page';
import CounsellorPage from '@/counsellor/page';
import AdminPage from '@/admin/page';
import LoginPage from '@/login/page';
import RegisterPage from '@/register/page';
import ResetPasswordPage from '@/reset-password/page';
import OnboardingPage from '@/onboarding/page';
import ArchitecturePage from '@/architecture/page';
import PrivacyPage from '@/privacy/page';

// Global Shell & Providers
import ThemeSelector from '@/components/ui/theme-selector';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/victim" element={<VictimPage />} />
        <Route path="/counsellor" element={<CounsellorPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ThemeSelector variant="floating" />
    </>
  );
}
