'use client';

import { useState, useEffect } from 'react';
import Link from '@/next-compat';
import { useRouter } from '@/next-compat';
import { Shield, Check } from 'lucide-react';
import AarvyaLogo from '@/components/ui/aarvya-logo';
import AuthGuard from '@/components/auth/auth-guard';
import StepLanguage from '@/components/onboarding/step-language';
import StepConsent, { ConsentState } from '@/components/onboarding/step-consent';
import StepProfile from '@/components/onboarding/step-profile';
import StepBaseline from '@/components/onboarding/step-baseline';
import StepResults from '@/components/onboarding/step-results';
import { api } from '@/lib/api';
import { useAuth } from '@/context/auth-context';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [displayStep, setDisplayStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isExiting, setIsExiting] = useState(false);

  const goToStep = (targetStep: number) => {
    if (targetStep === displayStep || isExiting) return;
    const dir = targetStep > displayStep ? 'forward' : 'backward';
    setDirection(dir);
    setIsExiting(true);
    setStep(targetStep);
    setTimeout(() => {
      setDisplayStep(targetStep);
      setIsExiting(false);
    }, 220);
  };

  // Step 1: Language
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Step 2: Consent
  const [consent, setConsent] = useState<ConsentState>({
    textChat: true,
    voiceCalls: false,
    cameraCheck: false,
    medicationReminder: false,
    smsReminders: true,
  });

  // Step 3: Basic Profile
  const [name, setName] = useState('Asha');
  const [ageRange, setAgeRange] = useState('18–25');
  const [reachMethod, setReachMethod] = useState('App only');
  const [checkinTime, setCheckinTime] = useState('Morning');

  // Pre-fill name from authenticated user if available
  useEffect(() => {
    if (user?.name && user.name.trim()) {
      setName(user.name);
    }
  }, [user]);

  // Step 4: Baseline Check-in
  const [feeling, setFeeling] = useState<string>('Okay');

  // Step 5: Computed Result
  const feelingsScores: Record<string, { score: number; label: string; desc: string }> = {
    Good: {
      score: 22,
      label: 'Low — Wellness steady',
      desc: 'You are feeling grounded. Routine self-care and gentle check-ins are working well.',
    },
    Okay: {
      score: 38,
      label: 'Moderate — Support available',
      desc: 'Your score is steady or lower than last time. Thank you for checking in — keep taking care.',
    },
    Unsure: {
      score: 48,
      label: 'Moderate — Monitoring support',
      desc: 'You might be feeling mixed emotions. Aarvya is here with calming tools and gentle check-ins.',
    },
    Worried: {
      score: 68,
      label: 'Elevated — Support recommended',
      desc: 'You noted elevated stress or anxiety. A counsellor call or 2-minute calming tool can help right now.',
    },
    'Very low': {
      score: 84,
      label: 'High — Immediate care available',
      desc: 'We see you are experiencing significant burden. Trained human support is ready to reach out immediately.',
    },
  };

  const currentResult = feelingsScores[feeling] || feelingsScores.Okay;

  const sparklineData = [
    { checkin: 'C3', score: currentResult.score + 6 },
    { checkin: 'C4', score: currentResult.score + 2 },
    { checkin: 'C5', score: currentResult.score + 8 },
    { checkin: 'C6', score: currentResult.score + 4 },
    { checkin: 'C7', score: currentResult.score },
  ];

  const handleFinishCheckin = async () => {
    const formattedCheckinTime =
      checkinTime === 'Morning'
        ? 'Tomorrow, 10:30 AM'
        : checkinTime === 'Afternoon'
        ? 'Tomorrow, 02:30 PM'
        : 'Tomorrow, 07:00 PM';

    // 1. Submit check-in record to Django backend API
    try {
      await api.submitCheckin({
        email: user?.email,
        language: selectedLanguage,
        text_consent: consent.textChat,
        voice_consent: consent.voiceCalls,
        camera_consent: consent.cameraCheck,
        medication_consent: consent.medicationReminder,
        sms_consent: consent.smsReminders,
        name,
        age_range: ageRange,
        reach_method: reachMethod,
        checkin_time: formattedCheckinTime,
        feeling,
        distress_score: currentResult.score,
      });
    } catch (err) {
      console.warn('Checkin submission error:', err);
    }

    // 2. Persist updated user state in Django database
    if (user?.email) {
      try {
        await api.updateUserCheckin({
          email: user.email,
          name,
          has_completed_checkin: true,
          distress_score: currentResult.score,
          next_checkin_time: formattedCheckinTime,
        });
      } catch (err) {
        console.warn('Update user checkin error:', err);
      }
    }

    // 3. Update client auth state
    updateUser({
      name,
      hasCompletedCheckin: true,
      distressScore: currentResult.score,
      nextCheckinTime: formattedCheckinTime,
    });

    router.push('/victim');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F8FAFC] text-[#142334] flex flex-col font-sans">
        {/* Navigation Bar */}
        <header className="h-18 bg-white border-b border-[#DBE2EB] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs flex items-center justify-center p-1 group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
              <AarvyaLogo size={30} interactive={false} />
            </div>
            <div>
              <span className="text-lg font-bold text-[#142334] tracking-tight group-hover:text-teal-900 transition-colors">Aarvya</span>
              <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase -mt-0.5">
                WELL-BEING SUPPORT
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
              Step {step} of 4
            </span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 max-w-3xl overflow-hidden">
          {/* Header Title & Subtitle */}
          {displayStep < 5 && (
            <div className="mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488]">
                STEP {step} OF 4 · INITIAL SETUP
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#142334] mt-1.5">
                {step === 1 && 'Choose your language'}
                {step === 2 && 'Privacy, dignity & consent'}
                {step === 3 && 'A few questions to personalise support'}
                {step === 4 && 'Your starting point'}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-2">
                {step === 1 && 'You can change this anytime from any screen.'}
                {step === 2 &&
                  'Everything here is optional except basic responses. You can pause or withdraw consent at any time.'}
                {step === 3 && 'We only ask what is necessary to serve you well. No FIR details are collected here.'}
                {step === 4 && 'This helps us understand your baseline so we can notice when things feel heavier.'}
              </p>
            </div>
          )}

          {/* Stepper Progress Bar */}
          {displayStep < 5 && (
            <div className="mb-10 bg-white border border-[#DBE2EB] p-4 rounded-2xl shadow-xs">
              <div className="flex items-center justify-between">
                {/* Step 1 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ease-out ${
                      step > 1
                        ? 'bg-[#0D9488] text-white'
                        : step === 1
                        ? 'bg-[#1E3A5F] text-white shadow-sm scale-105'
                        : 'bg-white border border-[#DBE2EB] text-slate-500'
                    }`}
                  >
                    {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:inline transition-colors duration-300 ${
                      step === 1 ? 'text-[#1E3A5F] font-semibold' : 'text-slate-500'
                    }`}
                  >
                    Language
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-3 transition-colors duration-500 ${
                    step > 1 ? 'bg-[#0D9488]' : 'bg-slate-200'
                  }`}
                />

                {/* Step 2 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ease-out ${
                      step > 2
                        ? 'bg-[#0D9488] text-white'
                        : step === 2
                        ? 'bg-[#1E3A5F] text-white shadow-sm scale-105'
                        : 'bg-white border border-[#DBE2EB] text-slate-500'
                    }`}
                  >
                    {step > 2 ? <Check className="w-4 h-4" /> : '2'}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:inline transition-colors duration-300 ${
                      step === 2 ? 'text-[#1E3A5F] font-semibold' : 'text-slate-500'
                    }`}
                  >
                    Consent
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-3 transition-colors duration-500 ${
                    step > 2 ? 'bg-[#0D9488]' : 'bg-slate-200'
                  }`}
                />

                {/* Step 3 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ease-out ${
                      step > 3
                        ? 'bg-[#0D9488] text-white'
                        : step === 3
                        ? 'bg-[#1E3A5F] text-white shadow-sm scale-105'
                        : 'bg-white border border-[#DBE2EB] text-slate-500'
                    }`}
                  >
                    {step > 3 ? <Check className="w-4 h-4" /> : '3'}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:inline transition-colors duration-300 ${
                      step === 3 ? 'text-[#1E3A5F] font-semibold' : 'text-slate-500'
                    }`}
                  >
                    Basic profile
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-3 transition-colors duration-500 ${
                    step > 3 ? 'bg-[#0D9488]' : 'bg-slate-200'
                  }`}
                />

                {/* Step 4 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ease-out ${
                      step === 4
                        ? 'bg-[#1E3A5F] text-white shadow-sm scale-105'
                        : 'bg-white border border-[#DBE2EB] text-slate-500'
                    }`}
                  >
                    4
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:inline transition-colors duration-300 ${
                      step === 4 ? 'text-[#1E3A5F] font-semibold' : 'text-slate-500'
                    }`}
                  >
                    Baseline check-in
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Animated Steps Container */}
          <div
            key={displayStep}
            className={`w-full ${
              isExiting
                ? direction === 'forward'
                  ? 'step-exit-forward'
                  : 'step-exit-backward'
                : direction === 'forward'
                ? 'step-enter-forward'
                : 'step-enter-backward'
            }`}
          >
            {/* STEP 1: LANGUAGE */}
            {displayStep === 1 && (
              <StepLanguage
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                onContinue={() => goToStep(2)}
              />
            )}

            {/* STEP 2: CONSENT */}
            {displayStep === 2 && (
              <StepConsent
                consent={consent}
                onChangeConsent={setConsent}
                onBack={() => goToStep(1)}
                onSkip={() => {
                  setConsent({
                    textChat: true,
                    voiceCalls: false,
                    cameraCheck: false,
                    medicationReminder: false,
                    smsReminders: false,
                  });
                  goToStep(3);
                }}
                onContinue={() => goToStep(3)}
              />
            )}

            {/* STEP 3: BASIC PROFILE */}
            {displayStep === 3 && (
              <StepProfile
                name={name}
                setName={setName}
                ageRange={ageRange}
                setAgeRange={setAgeRange}
                reachMethod={reachMethod}
                setReachMethod={setReachMethod}
                checkinTime={checkinTime}
                setCheckinTime={setCheckinTime}
                onBack={() => goToStep(2)}
                onContinue={() => goToStep(4)}
              />
            )}

            {/* STEP 4: BASELINE CHECK-IN */}
            {displayStep === 4 && (
              <StepBaseline
                feeling={feeling}
                setFeeling={setFeeling}
                onBack={() => goToStep(3)}
                onFinish={handleFinishCheckin}
              />
            )}

            {/* STEP 5: RESULTS SCREEN */}
            {displayStep === 5 && (
              <StepResults
                name={name}
                currentResult={currentResult}
                sparklineData={sparklineData}
                onComplete={() => router.push('/victim')}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 border-t border-[#DBE2EB] bg-white text-center text-xs text-slate-500">
          Aligned with NHAA & Integrated National Portal. Confidential well-being support platform.
        </footer>
      </div>
    </AuthGuard>
  );
}
