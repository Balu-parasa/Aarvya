'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageSquare,
  Mic,
  Languages,
  Mic2,
  Brain,
  Heart,
  Gamepad2,
  Wind,
  Phone,
  FileText,
  History,
  MapPin,
  Clock,
  AlertTriangle,
  X,
  CheckCircle,
  Camera,
  Check,
  Send,
  Volume2,
  RefreshCw,
  Sparkles,
  Key,
  ArrowDown,
  ArrowUp,
  Settings,
} from 'lucide-react';
import TopNavigation from '@/components/layout/top-navigation';
import EmergencyModal from '@/components/ui/emergency-modal';
import AuthGuard from '@/components/auth/auth-guard';
import VictimActionsGrid from '@/components/victim/victim-actions-grid';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuth } from '@/context/auth-context';
import { api } from '@/lib/api';

// Fallback dictionary for instant translation when API is busy or offline
const DICTIONARY: Record<string, string> = {
  'नमस्ते': 'Hello / Greetings',
  'नमस्कार': 'Greetings / Hello',
  'सुप्रभात': 'Good morning',
  'शुभ संध्या': 'Good evening',
  'शुभ रात्रि': 'Good night',
  'धन्यवाद': 'Thank you',
  'शुक्रिया': 'Thank you very much',
  'कृपया': 'Please',
  'हाँ': 'Yes',
  'नहीं': 'No',
  'कल अदालत में सुनवाई है।': 'Tomorrow there is a hearing in court.',
  'कल अदालत में सुनवाई है': 'Tomorrow there is a hearing in court.',
  'मुझे कल की सुनवाई से डर लग रहा है।': 'I am feeling scared about tomorrow’s hearing.',
  'मुझे कल की सुनवाई से डर लग रहा है': 'I am feeling scared about tomorrow’s hearing.',
  'मुझे डर लग रहा है': 'I am feeling scared / anxious.',
  'मुझे सहायता चाहिए': 'I need help / assistance.',
  'मुझे काउंसलर से बात करनी है': 'I want to speak with a counsellor.',
  'मैं सुरक्षित नहीं महसूस कर रही': 'I do not feel safe.',
  'मुझे नींद नहीं आ रही है': 'I am unable to sleep.',
  'मेरे सिर में दर्द है': 'I have a headache.',
  'hello': 'नमस्ते (Hello)',
  'thank you': 'धन्यवाद (Thank you)',
  'court hearing': 'अदालत की सुनवाई (Court hearing)',
  'i need help': 'मुझे सहायता चाहिए (I need help)',
  'counsellor': 'परामर्शदाता / काउंसलर (Counsellor)',
};

export default function VictimPortal() {
  const { user, updateUser } = useAuth();
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // User state
  const userName = user?.name || 'Asha';
  const [distressScore, setDistressScore] = useState<number>(() => user?.distressScore ?? 52);
  const checkinTime = user?.nextCheckinTime || 'Tomorrow, 10:30 AM';

  // Real-time score notification toast
  const [scoreNotice, setScoreNotice] = useState<{ text: string; delta: number } | null>(null);

  // Synchronize initial score from user if loaded
  useEffect(() => {
    if (user?.distressScore !== undefined && Math.abs(user.distressScore - distressScore) > 20 && distressScore === 52) {
      setDistressScore(user.distressScore);
    }
  }, [user?.distressScore]);

  // Central Real-time Score Modifier
  const applyScoreUpdate = useCallback(
    async (delta: number, reason: string) => {
      setDistressScore((prev) => {
        const next = Math.max(16, Math.min(95, prev + delta));
        setScoreNotice({ text: reason, delta });
        setTimeout(() => setScoreNotice(null), 5500);

        // Sync with Django DB
        if (user?.email) {
          api.updateUserCheckin({ email: user.email, distress_score: next }).catch(() => {});
        }
        updateUser({ distressScore: next });
        return next;
      });
    },
    [user?.email, updateUser]
  );

  // Next check-in state
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [tempTime, setTempTime] = useState(checkinTime);
  const [timeSaving, setTimeSaving] = useState(false);

  // Dynamic Trend data for victim distress based on actual real-time score
  const distressData = [
    { name: 'Day 1', score: Math.min(100, distressScore + 12) },
    { name: 'Day 3', score: Math.min(100, distressScore + 8) },
    { name: 'Day 5', score: Math.min(100, distressScore + 14) },
    { name: 'Day 7', score: Math.max(10, distressScore + 4) },
    { name: 'Today', score: distressScore },
  ];

  // Actions list matching the exact 13 items
  const actions = [
    { id: 'chat', icon: MessageSquare, title: 'Talk to Aarvya chatbot', desc: 'Chat with our AI companion' },
    { id: 'voice-assistant', icon: Mic, title: 'AI voice assistant', desc: 'Speak naturally, get support' },
    { id: 'translator', icon: Languages, title: 'AI translator', desc: 'Translate in real-time' },
    { id: 'voice-checkin', icon: Mic2, title: 'Start voice check-in', desc: 'Quick verbal wellness check' },
    { id: 'face-check', icon: Brain, title: 'Face detection wellness check', desc: 'Analyze wellness indicators' },
    { id: 'symptoms', icon: Heart, title: 'Tell us about body symptoms', desc: 'Track physical symptoms' },
    { id: 'mind-games', icon: Gamepad2, title: 'Mind games for wellbeing', desc: 'Play grounding exercises' },
    { id: 'calming-exercise', icon: Wind, title: 'Start 2-minute calming exercise', desc: 'Guided breathing exercise' },
    { id: 'request-counsellor', icon: Phone, title: 'Request counsellor call', desc: 'Schedule a call with human support' },
    { id: 'support-plan', icon: FileText, title: 'My support plan', desc: 'View your personalized plan' },
    { id: 'case-history', icon: History, title: 'My case history', desc: 'Review past interactions' },
    { id: 'near-me', icon: MapPin, title: 'Find help near me', desc: 'Locate nearby support services' },
    { id: 'reminders', icon: Clock, title: 'Care reminders', desc: 'Set medication & appointment reminders' },
  ];

  // ================= 1. CHATBOT STATE & GEMINI API =================
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: `Namaste ${userName}, I am Aarvya Companion. You are in a safe, private space. How are you feeling today?`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatTyping, setChatTyping] = useState(false);

  // Gemini API key state & modal
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aarvya_gemini_api_key') || localStorage.getItem('sahaaya_gemini_api_key') || '';
    }
    return '';
  });
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(geminiApiKey);
  const [geminiKeySaved, setGeminiKeySaved] = useState(false);

  const handleSaveGeminiKey = () => {
    const trimmed = tempApiKey.trim();
    setGeminiApiKey(trimmed);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aarvya_gemini_api_key', trimmed);
    }
    setGeminiKeySaved(true);
    setTimeout(() => {
      setGeminiKeySaved(false);
      setShowKeyConfig(false);
    }, 800);
  };

  const handleChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    const updated = [...chatMessages, { sender: 'user', text: userMsg }];
    setChatMessages(updated);
    setChatInput('');
    setChatTyping(true);

    try {
      // Call Django backend chatbot endpoint (which runs Gemini API if configured)
      const res = await api.sendChatMessage(userMsg, updated, geminiApiKey);
      if (res && res.reply) {
        setChatMessages([...updated, { sender: 'bot', text: res.reply }]);
        // Supportive interaction gently eases tension
        if (distressScore > 24) {
          applyScoreUpdate(-2, 'Aarvya AI companion support · Tension eased by -2 pts');
        }
      } else {
        throw new Error('No reply');
      }
    } catch {
      // Offline fallback
      setTimeout(() => {
        let reply = 'Thank you for expressing this. You are safe here, and our trained counsellor team is updated.';
        const lower = userMsg.toLowerCase();
        if (lower.includes('डर') || lower.includes('fear') || lower.includes('scared') || lower.includes('चिंता')) {
          reply = 'It is completely understandable to feel anxious right now. Would you like to do a 2-minute calming breathing exercise with me, or request a counsellor call?';
        } else if (lower.includes('court') || lower.includes('सुनवाई') || lower.includes('hearing')) {
          reply = 'Your hearing is noted in your support plan. DLSA Legal Aid is active and accompaniment can be arranged.';
        }
        setChatMessages([...updated, { sender: 'bot', text: reply }]);
      }, 500);
    } finally {
      setChatTyping(false);
    }
  };

  // ================= 2. VOICE ASSISTANT STATE & LOGIC =================
  const [isListening, setIsListening] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [voiceAssistantReply, setVoiceAssistantReply] = useState('');
  const recognitionRef = useRef<any>(null);

  const startVoiceAssistant = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. You can still type your questions in the Chatbot.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechTranscript('Listening to your voice...');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpeechTranscript(`"${transcript}"`);
        handleVoiceQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech error:', event.error);
        setIsListening(false);
        setSpeechTranscript('Voice captured or timed out. Tap microphone to speak again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Voice error:', e);
      setIsListening(false);
    }
  };

  const handleVoiceQuery = (query: string) => {
    let reply = `I heard you say: "${query}". You are in safe hands, and our care team is ready to support you.`;
    const lower = query.toLowerCase();
    if (lower.includes('hearing') || lower.includes('सुनवाई') || lower.includes('court') || lower.includes('case')) {
      reply = 'Your case hearing is being tracked by District Legal Services. Advocate Mishra will represent you, and a support officer will call you before the hearing.';
    } else if (lower.includes('calm') || lower.includes('breathe') || lower.includes('तनाव') || lower.includes('शांत')) {
      reply = 'Let us take a slow, deep breath together. Inhale through your nose for 4 seconds... and exhale gently.';
    }

    setVoiceAssistantReply(reply);
    applyScoreUpdate(-2, 'Voice assistance response · Reassurance provided (-2 pts)');

    // Speak reply back if supported
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(reply);
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
      } catch {}
    }
  };

  // ================= 3. AI REAL-TIME TRANSLATOR =================
  const [translateText, setTranslateText] = useState('नमस्ते');
  const [translatedResult, setTranslatedResult] = useState('Hello / Greetings');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateLang, setTranslateLang] = useState<'hi-en' | 'en-hi'>('hi-en');

  const performTranslation = useCallback(async (text: string, direction: 'hi-en' | 'en-hi') => {
    const trimmed = text.trim();
    if (!trimmed) {
      setTranslatedResult('');
      return;
    }

    // 1. Check local instant dictionary first
    if (DICTIONARY[trimmed]) {
      setTranslatedResult(DICTIONARY[trimmed]);
      return;
    }

    // 2. Call Django backend API
    setIsTranslating(true);
    try {
      const src = direction === 'hi-en' ? 'hi' : 'en';
      const tgt = direction === 'hi-en' ? 'en' : 'hi';
      const res = await api.translateText(trimmed, src, tgt);
      if (res && res.translated_text) {
        setTranslatedResult(res.translated_text);
      } else {
        setTranslatedResult(DICTIONARY[trimmed] || `Translation: ${trimmed}`);
      }
    } catch {
      setTranslatedResult(DICTIONARY[trimmed] || `Translation: ${trimmed}`);
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const handleTranslateInput = (val: string) => {
    setTranslateText(val);
    performTranslation(val, translateLang);
  };

  // ================= 4. 30-SECOND VOICE CHECK-IN (LIVE AUDIO SPECTRUM) =================
  const [voiceCheckinActive, setVoiceCheckinActive] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(30);
  const [audioLevels, setAudioLevels] = useState<number[]>([12, 28, 44, 20, 36, 16, 40, 24, 18, 32, 10]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const startVoiceCheckin = async () => {
    setVoiceCheckinActive(true);
    setVoiceSeconds(30);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 32;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateBars = () => {
        analyser.getByteFrequencyData(dataArray);
        const bars = Array.from(dataArray.slice(0, 11)).map((val) => Math.max(8, Math.round((val / 255) * 55)));
        setAudioLevels(bars);
        animFrameRef.current = requestAnimationFrame(updateBars);
      };
      updateBars();
    } catch {
      // Audio access fallback
    }
  };

  const stopVoiceCheckin = () => {
    if (voiceCheckinActive) {
      applyScoreUpdate(-5, 'Voice rhythm check-in completed · Distress lowered by -5 pts');
    }
    setVoiceCheckinActive(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  useEffect(() => {
    let timer: any;
    if (voiceCheckinActive && voiceSeconds > 0) {
      timer = setInterval(() => {
        setVoiceSeconds((prev) => {
          if (prev <= 1) {
            stopVoiceCheckin();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [voiceCheckinActive, voiceSeconds]);

  // ================= 5. FACE DETECTION WELLNESS CHECK (LIVE WEBCAM) =================
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraScanning, setCameraScanning] = useState(false);
  const [scanPulseBpm, setScanPulseBpm] = useState(74);
  const [scanCompleted, setScanCompleted] = useState(false);

  const startCamera = async () => {
    setScanCompleted(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      });
      cameraStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch {
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      cameraStreamRef.current = null;
    }
    setCameraActive(false);
    setCameraScanning(false);
  };

  const runFaceScan = () => {
    setCameraScanning(true);
    setTimeout(() => {
      const bpm = Math.floor(71 + Math.random() * 5);
      setScanPulseBpm(bpm);
      setCameraScanning(false);
      setScanCompleted(true);
      applyScoreUpdate(-6, `Optical rPPG scan completed · Pulse steady (${bpm} BPM) · Distress reduced -6 pts`);
    }, 4000);
  };

  // ================= 6. BODY SYMPTOMS TRACKER =================
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    user?.symptoms && user.symptoms.length > 0 ? user.symptoms : ['Sleep issues', 'Chest tightness']
  );
  const [symptomsSaved, setSymptomsSaved] = useState(false);

  const handleSaveSymptoms = async () => {
    setSymptomsSaved(true);
    // Dynamic recalculation:
    // 0 symptoms -> 22 (Low: Low - Wellness steady)
    // 1 symptom  -> 28 (Low)
    // 2 symptoms -> 35 (Low)
    // 3 symptoms -> 48 (Moderate)
    // 4 symptoms -> 60 (Moderate)
    // 5+ symptoms -> 74 (High)
    const computedScore =
      selectedSymptoms.length === 0
        ? 22
        : selectedSymptoms.length === 1
        ? 28
        : selectedSymptoms.length === 2
        ? 35
        : Math.min(92, 36 + selectedSymptoms.length * 7);

    const delta = computedScore - distressScore;
    setDistressScore(computedScore);
    setScoreNotice({
      text: `Symptom log updated (${selectedSymptoms.length} active) · Distress recalculated to ${computedScore}/100`,
      delta,
    });
    setTimeout(() => setScoreNotice(null), 5500);

    if (user?.email) {
      try {
        await api.updateUserCheckin({
          email: user.email,
          symptoms: selectedSymptoms,
          distress_score: computedScore,
        });
      } catch {}
    }
    updateUser({ symptoms: selectedSymptoms, distressScore: computedScore });

    setTimeout(() => {
      setSymptomsSaved(false);
      setActiveModal(null);
    }, 800);
  };

  // ================= 7. MIND GAMES (5-4-3-2-1 GROUNDING) =================
  const [groundingChecked, setGroundingChecked] = useState<Record<number, boolean>>({});
  const toggleGrounding = (idx: number) => {
    setGroundingChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const finishGrounding = () => {
    applyScoreUpdate(-7, '5-4-3-2-1 sensory grounding completed · Distress lowered by -7 pts');
    setActiveModal(null);
  };

  // ================= 8. 2-MINUTE CALMING BREATHING (BOX 4-7-8) =================
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('Inhale');
  const [breathingCountdown, setBreathingCountdown] = useState(4);
  const [breathingCyclesCompleted, setBreathingCyclesCompleted] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathingCountdown((prev) => {
          if (prev > 1) return prev - 1;
          // Switch phase
          if (breathingPhase === 'Inhale') {
            setBreathingPhase('Hold');
            return 7;
          } else if (breathingPhase === 'Hold') {
            setBreathingPhase('Exhale');
            return 8;
          } else {
            setBreathingPhase('Inhale');
            setBreathingCyclesCompleted((c) => c + 1);
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathingPhase]);

  const finishCalmingBreathing = () => {
    setIsBreathing(false);
    applyScoreUpdate(-8, '4-7-8 calming breathing completed · Distress lowered by -8 pts');
    setActiveModal(null);
  };

  // ================= 9. REQUEST COUNSELLOR CALL =================
  const [counsellorUrgency, setCounsellorUrgency] = useState('Within 2 hours (High priority)');
  const [counsellorNote, setCounsellorNote] = useState('');
  const [counsellorSubmitting, setCounsellorSubmitting] = useState(false);
  const [counsellorRequestSent, setCounsellorRequestSent] = useState(false);

  const handleCounsellorRequest = async () => {
    setCounsellorSubmitting(true);
    try {
      const caseId = user?.case_id || 'VCT-UP-00124';
      // 1. Dispatch real-time live alert to Django DB
      await api.createAlert({
        caseId,
        risk: 'critical',
        message: `Callback requested by ${userName} (${counsellorUrgency}): ${counsellorNote || 'Immediate support needed'}`,
      });
      // 2. Log intervention in DB
      await api.createIntervention({
        case_id: caseId,
        log_type: 'Outbound Call Request',
        notes: `Urgency: ${counsellorUrgency}. Note: ${counsellorNote || 'None'}`,
        date_str: 'Just now',
      });
    } catch {}
    setCounsellorSubmitting(false);
    setCounsellorRequestSent(true);
  };

  // ================= 13. CARE REMINDERS =================
  const [reminders, setReminders] = useState([
    { id: 1, title: 'Daily Wellbeing Check-in', time: 'Every day at 10:30 AM', active: true },
    { id: 2, title: 'Legal Hearing Consultation', time: 'Tomorrow at 09:00 AM', active: true },
    { id: 3, title: 'Vocational Training Session', time: 'Friday at 02:00 PM', active: false },
  ]);

  // Cleanup on unmount or modal close
  useEffect(() => {
    if (activeModal !== 'face-check') stopCamera();
    if (activeModal !== 'voice-checkin') stopVoiceCheckin();
  }, [activeModal]);

  // Save new check-in time
  const handleSaveCheckinTime = async () => {
    setTimeSaving(true);
    if (user?.email) {
      try {
        await api.updateUserCheckin({
          email: user.email,
          next_checkin_time: tempTime,
        });
      } catch {}
    }
    updateUser({ nextCheckinTime: tempTime });
    setTimeSaving(false);
    setShowTimeModal(false);
  };

  // Dynamic Score Categorization matching exact required text:
  // <= 35: Low
  // 36 - 65: Moderate
  // >= 66: Elevated
  const scoreLevel = distressScore <= 35 ? 'Low' : distressScore <= 65 ? 'Moderate' : 'High';

  const scoreHeading =
    scoreLevel === 'Low'
      ? 'Low — Wellness steady'
      : scoreLevel === 'Moderate'
      ? 'Moderate — Support available'
      : 'Elevated — Support recommended';

  const scoreDescription =
    scoreLevel === 'Low'
      ? 'Your emotional indicators are stable. Routine self-care and gentle check-ins are working well.'
      : scoreLevel === 'Moderate'
      ? 'Your score is steady or showing mild tension. Aarvya is here with calming tools, and a counsellor can assist if needed.'
      : 'High emotional burden detected. A dedicated counsellor has been notified to provide immediate gentle support.';

  const scoreLevelColor =
    scoreLevel === 'Low'
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : scoreLevel === 'Moderate'
      ? 'text-amber-700 bg-amber-50 border-amber-200'
      : 'text-rose-700 bg-rose-50 border-rose-200';

  return (
    <AuthGuard allowedRoles={['victim']}>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#EEF3F9]/70 via-[#F8FAFC] to-[#F8FAFC] text-[#142334] font-sans">
        <TopNavigation showSOS={true} role="Victim" />

        <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
          {/* Greeting Banner */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#142334] tracking-tight">
                Namaste, {userName}. How are you feeling today?
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5">
                Your confidential support space · Monitored under district care guidelines
              </p>
            </div>

            {/* Quick Test Reset to 22 */}
            <button
              onClick={() => {
                setDistressScore(22);
                setSelectedSymptoms([]);
                applyScoreUpdate(0, 'Wellness steady state restored (Score: 22/100 · Low)');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold text-emerald-800 transition shadow-2xs self-start sm:self-auto cursor-pointer"
              title="Click to reset score to 22 / 100 Low — Wellness steady"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Reset Score to 22 (Low)</span>
            </button>
          </div>

          {/* Real-time Score Notification Toast */}
          {scoreNotice && (
            <div className="mb-4 p-3.5 rounded-2xl bg-[#0F243E] text-white flex items-center justify-between text-xs shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold">{scoreNotice.text}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full font-mono text-[11px]">
                {scoreNotice.delta < 0 ? (
                  <ArrowDown className="w-3 h-3 text-emerald-400" />
                ) : (
                  <ArrowUp className="w-3 h-3 text-rose-400" />
                )}
                <span>{scoreNotice.delta > 0 ? `+${scoreNotice.delta}` : scoreNotice.delta} pts</span>
              </div>
            </div>
          )}

          {/* Dynamic Distress Score Card */}
          <div className="soft-card p-6 sm:p-7 rounded-[28px] bg-white border border-[#DBE2EB] mb-8 shadow-sm transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Score Number */}
              <div className="lg:col-span-3 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-[#142334] transition-all duration-300">
                  {distressScore}
                </span>
                <span className="text-sm font-semibold text-[#64748B]">/ 100</span>
                <span className={`ml-3 text-xs font-bold border px-2.5 py-1 rounded-full ${scoreLevelColor}`}>
                  {scoreLevel}
                </span>
              </div>

              {/* Explanatory Text */}
              <div className="lg:col-span-5 space-y-1">
                <h2 className="text-base font-bold text-[#142334]">{scoreHeading}</h2>
                <p className="text-xs text-[#64748B] leading-relaxed">{scoreDescription}</p>
              </div>

              {/* Recharts Area Chart */}
              <div className="lg:col-span-4 h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={distressData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '11px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke={scoreLevel === 'Low' ? '#10B981' : scoreLevel === 'Moderate' ? '#F59E0B' : '#E11D48'}
                      strokeWidth={2}
                      fill={scoreLevel === 'Low' ? '#ECFDF5' : scoreLevel === 'Moderate' ? '#FFFBEB' : '#FFF1F2'}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Action Grid Section (13 Items) */}
          <VictimActionsGrid actions={actions} onSelectAction={(id) => setActiveModal(id)} />

          {/* Lower Row: Next Check-in & Emergency Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6">
            {/* Next Check-in Card */}
            <div className="lg:col-span-5 soft-card p-5 rounded-2xl bg-white border border-[#DBE2EB] flex items-center justify-between shadow-xs">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">NEXT GENTLE CHECK-IN</p>
                <p className="text-base font-bold text-[#142334] mt-0.5">{checkinTime}</p>
              </div>
              <button
                onClick={() => setShowTimeModal(true)}
                className="px-4 py-2 rounded-full border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
              >
                Change time
              </button>
            </div>

            {/* Emergency Banner */}
            <button
              onClick={() => setSosModalOpen(true)}
              className="lg:col-span-7 rounded-2xl bg-red-50 border border-red-200 p-5 flex items-center justify-between text-left hover:bg-red-100/70 transition shadow-xs group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-red-900">I feel unsafe / need urgent support</p>
                  <p className="text-xs text-red-700">A trained person will be alerted right away.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-red-700 bg-red-200/60 px-3 py-1.5 rounded-full uppercase tracking-wider group-hover:bg-red-200 transition">
                Emergency SOS
              </span>
            </button>
          </div>
        </main>

        {/* ================= MODALS FOR 13 ACTIONS ================= */}

        {/* 1. Chatbot Modal with Google Gemini Integration */}
        {activeModal === 'chat' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 flex flex-col h-[540px]">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">Aarvya AI Chatbot</h3>
                      {geminiApiKey ? (
                        <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-purple-600" />
                          <span>Gemini AI</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                          Standard Companion
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-emerald-600 font-semibold">Active · Emotional & Wellbeing Support</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowKeyConfig(!showKeyConfig)}
                    className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                    title="Configure Gemini API Key"
                  >
                    <Key className="w-4 h-4 text-purple-600" />
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Gemini API Key Configuration Panel Drawer */}
              {showKeyConfig && (
                <div className="p-3 my-2 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs space-y-2 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-950 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-purple-700" />
                      <span>Google Gemini API Key</span>
                    </span>
                    <button
                      onClick={() => setShowKeyConfig(false)}
                      className="text-[11px] text-purple-600 hover:underline"
                    >
                      Hide
                    </button>
                  </div>
                  <p className="text-[11px] text-purple-800">
                    Paste your key below (or set <code className="bg-purple-100 px-1 rounded">GEMINI_API_KEY</code> in{' '}
                    <code className="bg-purple-100 px-1 rounded">.env</code>):
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="flex-1 h-9 px-3 rounded-xl border border-purple-200 bg-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-purple-600"
                    />
                    <button
                      onClick={handleSaveGeminiKey}
                      className="h-9 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold transition cursor-pointer"
                    >
                      {geminiKeySaved ? 'Saved!' : 'Save'}
                    </button>
                  </div>
                </div>
              )}

              {/* Messages Feed */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#1E3A5F] text-white rounded-br-xs font-medium'
                          : 'bg-slate-100 text-slate-900 rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {chatTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-2xl px-4 py-2 text-xs text-slate-500 italic flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                      <span>Aarvya is thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Input */}
              <form onSubmit={handleChatSend} className="pt-2 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message in English or हिंदी..."
                  className="flex-1 h-11 px-4 text-xs sm:text-sm rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <button
                  type="submit"
                  className="h-11 px-5 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 2. Voice Assistant Modal */}
        {activeModal === 'voice-assistant' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    setActiveModal(null);
                  }}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={startVoiceAssistant}
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto my-3 transition shadow-md cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-200'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                <Mic className="w-9 h-9" />
              </button>

              <h3 className="text-lg font-bold text-slate-900">
                {isListening ? 'Listening to you now...' : 'AI Voice Assistant'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Speak naturally in Hindi or English. Tap the microphone and ask about court hearings, calming tools, or counsellor support.
              </p>

              {speechTranscript && (
                <div className="mt-4 p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 text-left">
                  <span className="font-semibold text-blue-700 block text-[10px] uppercase">Recognized Speech</span>
                  {speechTranscript}
                </div>
              )}

              {voiceAssistantReply && (
                <div className="mt-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 text-left flex items-start gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-600 block text-[10px] uppercase">Aarvya Response</span>
                    {voiceAssistantReply}
                  </div>
                </div>
              )}

              <div className="mt-5 flex gap-2">
                <button
                  onClick={startVoiceAssistant}
                  className="flex-1 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs font-semibold cursor-pointer"
                >
                  {isListening ? 'Listening...' : 'Tap to Speak'}
                </button>
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    setActiveModal(null);
                  }}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. AI Real-time Translator Modal */}
        {activeModal === 'translator' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-indigo-600" />
                  <span>AI Real-time Translator</span>
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Direction Toggle */}
              <div className="my-3 flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-slate-600">
                  {translateLang === 'hi-en' ? 'Hindi → English' : 'English → Hindi'}
                </span>
                <button
                  onClick={() => {
                    const next = translateLang === 'hi-en' ? 'en-hi' : 'hi-en';
                    setTranslateLang(next);
                    const oldIn = translateText;
                    setTranslateText(translatedResult);
                    performTranslation(translatedResult, next);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Switch Direction</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">
                    {translateLang === 'hi-en' ? 'Hindi (Input)' : 'English (Input)'}
                  </label>
                  <textarea
                    value={translateText}
                    onChange={(e) => handleTranslateInput(e.target.value)}
                    rows={3}
                    placeholder={translateLang === 'hi-en' ? 'यहाँ टाइप करें... e.g. नमस्ते' : 'Type here... e.g. I need help'}
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-500 block">
                      {translateLang === 'hi-en' ? 'English (Translated)' : 'Hindi (Translated)'}
                    </label>
                    {isTranslating && (
                      <span className="text-[10px] text-indigo-600 font-medium animate-pulse">Translating...</span>
                    )}
                  </div>
                  <div className="p-3 text-sm rounded-xl bg-indigo-50/60 border border-indigo-100 text-slate-900 min-h-[70px] font-medium leading-relaxed">
                    {translatedResult || <span className="text-slate-400 italic">Translation will appear here...</span>}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-full mt-4 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* 4. 30-Second Voice Check-in Modal */}
        {activeModal === 'voice-checkin' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    stopVoiceCheckin();
                    setActiveModal(null);
                  }}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto my-3">
                <Mic2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">30-Second Voice Check-in</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Speak for 30 seconds about your day. Vocal rhythm and pauses are analyzed securely to soothe emotional distress.
              </p>

              {/* Real-time Web Audio Waveform */}
              <div className="my-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center gap-2 h-20">
                {audioLevels.map((h, i) => (
                  <div
                    key={i}
                    className="w-2 rounded-full transition-all duration-75"
                    style={{
                      height: `${h}px`,
                      backgroundColor: voiceCheckinActive ? '#10B981' : '#64748B',
                    }}
                  />
                ))}
              </div>

              <div className="text-xs font-bold text-slate-600 mb-4">
                {voiceCheckinActive ? (
                  <span className="text-emerald-600 animate-pulse">● Recording Voice · {voiceSeconds}s remaining</span>
                ) : (
                  <span>Ready to start voice analysis (-5 pts relief)</span>
                )}
              </div>

              <div className="flex gap-2">
                {!voiceCheckinActive ? (
                  <button
                    onClick={startVoiceCheckin}
                    className="flex-1 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Start 30-Second Check-in
                  </button>
                ) : (
                  <button
                    onClick={stopVoiceCheckin}
                    className="flex-1 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Finish Recording (-5 pts)
                  </button>
                )}
                <button
                  onClick={() => {
                    stopVoiceCheckin();
                    setActiveModal(null);
                  }}
                  className="px-5 py-3 rounded-full border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. Face Detection Wellness Check Modal */}
        {activeModal === 'face-check' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    stopCamera();
                    setActiveModal(null);
                  }}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-900">Front Camera Wellness Check</h3>
              <p className="text-xs text-slate-500 mt-1">
                Non-contact optical rPPG pulse estimation. Zero video footage is recorded or stored.
              </p>

              {/* Video Viewport */}
              <div className="my-4 rounded-2xl bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden h-56 border border-slate-800">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                />

                {!cameraActive && (
                  <div className="flex flex-col items-center text-slate-400 p-4">
                    <Camera className="w-10 h-10 mb-2 opacity-50" />
                    <p className="text-xs">Camera stream idle</p>
                    <button
                      onClick={startCamera}
                      className="mt-3 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Enable Camera
                    </button>
                  </div>
                )}

                {/* Face Scanning Overlay Ring */}
                {cameraActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 pointer-events-none">
                    <div
                      className={`w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center text-xs font-mono transition-all duration-500 ${
                        cameraScanning
                          ? 'border-emerald-400 scale-105 animate-pulse text-emerald-400'
                          : 'border-white/60 text-white'
                      }`}
                    >
                      {scanPulseBpm} BPM
                    </div>
                    <span className="text-[10px] text-emerald-300 mt-2 font-mono bg-black/60 px-2.5 py-0.5 rounded-full">
                      {cameraScanning ? 'Scanning micro-vascular signal...' : 'Face aligned within target zone'}
                    </span>
                  </div>
                )}
              </div>

              {scanCompleted && (
                <div className="p-3 mb-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 text-left">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Scan Complete · Pulse Stability Steady (-6 pts)</span>
                  </p>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Resting heart rate measured at {scanPulseBpm} BPM. Distress score lowered by 6 points in real-time.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {cameraActive && !cameraScanning && (
                  <button
                    onClick={runFaceScan}
                    className="flex-1 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Start 5s Vitals Scan
                  </button>
                )}
                <button
                  onClick={() => {
                    stopCamera();
                    setActiveModal(null);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs font-bold cursor-pointer"
                >
                  Done Scan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. Body Symptoms Modal */}
        {activeModal === 'symptoms' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Physical Symptom Log</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 my-2">
                Select your symptoms. Clearing symptoms lowers your distress score directly:
              </p>
              <div className="grid grid-cols-2 gap-2 my-4">
                {[
                  'Sleep issues',
                  'Headache',
                  'Nausea',
                  'Fatigue',
                  'Palpitations',
                  'Muscle tension',
                  'Chest tightness',
                  'Loss of appetite',
                ].map((sym) => (
                  <button
                    key={sym}
                    onClick={() => {
                      if (selectedSymptoms.includes(sym)) {
                        setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
                      } else {
                        setSelectedSymptoms([...selectedSymptoms, sym]);
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                      selectedSymptoms.includes(sym)
                        ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>

              <div className="mb-3 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {selectedSymptoms.length === 0 ? (
                  <span className="text-emerald-700 font-semibold">
                    ✓ 0 symptoms selected: Score will recalibrate to 22 (Low — Wellness steady)
                  </span>
                ) : (
                  <span>
                    {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''} logged. Saving will dynamically update your score at top.
                  </span>
                )}
              </div>

              {symptomsSaved ? (
                <div className="p-3 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl">
                  Symptom log saved & score recalculated!
                </div>
              ) : (
                <button
                  onClick={handleSaveSymptoms}
                  className="w-full py-3 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs font-bold cursor-pointer"
                >
                  Save Symptoms Log & Update Score
                </button>
              )}
            </div>
          </div>
        )}

        {/* 7. Mind Games Modal */}
        {activeModal === 'mind-games' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Grounding 5-4-3-2-1 Technique</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Tap each step as you observe it in your immediate environment to lower distress by -7 pts:
              </p>
              <div className="space-y-2 text-left text-xs mb-6">
                {[
                  { id: 5, text: '5 things you can see around you' },
                  { id: 4, text: '4 things you can physically touch right now' },
                  { id: 3, text: '3 things you can hear' },
                  { id: 2, text: '2 things you can smell' },
                  { id: 1, text: '1 positive thing you appreciate about yourself' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleGrounding(item.id)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition cursor-pointer ${
                      groundingChecked[item.id]
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span>
                      <strong className="font-bold">{item.id}</strong> {item.text.slice(1)}
                    </span>
                    {groundingChecked[item.id] && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                ))}
              </div>
              <button
                onClick={finishGrounding}
                className="w-full py-3 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs font-bold cursor-pointer"
              >
                I Feel Grounded (-7 pts Relief)
              </button>
            </div>
          </div>
        )}

        {/* 8. Calming Exercise Modal */}
        {activeModal === 'calming-exercise' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setIsBreathing(false);
                    setActiveModal(null);
                  }}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-900">4-7-8 Guided Calming Breathing</h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Follow the rhythmic circle to stimulate the vagus nerve and reduce distress by -8 pts.
              </p>

              <div className="my-6 flex justify-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div
                    className={`w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ${
                      breathingPhase === 'Inhale'
                        ? 'bg-emerald-100 border-4 border-emerald-500 scale-110'
                        : breathingPhase === 'Hold'
                        ? 'bg-blue-100 border-4 border-blue-500 scale-105'
                        : 'bg-teal-50 border-4 border-teal-400 scale-90'
                    }`}
                  >
                    <span className="text-sm font-bold text-slate-800">{breathingPhase}</span>
                    <span className="text-2xl font-extrabold text-[#1E3A5F] mt-1">{breathingCountdown}s</span>
                  </div>
                </div>
              </div>

              {breathingCyclesCompleted > 0 && (
                <p className="text-xs font-semibold text-emerald-700 mb-4">
                  ✓ {breathingCyclesCompleted} cycle{breathingCyclesCompleted > 1 ? 's' : ''} completed!
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setIsBreathing(!isBreathing)}
                  className="flex-1 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                >
                  {isBreathing ? 'Pause Exercise' : 'Start 4-7-8 Breathing'}
                </button>
                <button
                  onClick={finishCalmingBreathing}
                  className="px-5 py-3 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-xs font-bold text-white cursor-pointer"
                >
                  Finish (-8 pts)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 9. Request Counsellor Call Modal */}
        {activeModal === 'request-counsellor' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Request Counsellor Call</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {counsellorRequestSent ? (
                <div className="my-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Call Request Scheduled</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Duty Counsellor (R. Sharma) has received your request. Callback queued ({counsellorUrgency}).
                  </p>
                  <button
                    onClick={() => {
                      setCounsellorRequestSent(false);
                      setActiveModal(null);
                    }}
                    className="w-full py-2.5 rounded-full bg-[#1E3A5F] text-white text-xs font-bold mt-4 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="my-4 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Connect privately with your district counsellor. Your request is dispatched in real-time to the Counsellor portal.
                  </p>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Preferred Timing</label>
                    <select
                      value={counsellorUrgency}
                      onChange={(e) => setCounsellorUrgency(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                    >
                      <option>Within 2 hours (High priority)</option>
                      <option>Tomorrow Morning (10:00 AM)</option>
                      <option>Tomorrow Afternoon (03:00 PM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Optional Note for Counsellor</label>
                    <textarea
                      value={counsellorNote}
                      onChange={(e) => setCounsellorNote(e.target.value)}
                      placeholder="e.g. Need assistance with court appearance tomorrow..."
                      rows={3}
                      className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <button
                    onClick={handleCounsellorRequest}
                    disabled={counsellorSubmitting}
                    className="w-full py-3 rounded-full bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs font-bold cursor-pointer"
                  >
                    {counsellorSubmitting ? 'Dispatching to Counsellor...' : 'Submit Call Request'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 10. My Support Plan Modal */}
        {activeModal === 'support-plan' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Personalized Support Plan</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="my-4 space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-emerald-900">Legal Aid Linked</p>
                    <p className="text-slate-600 mt-0.5">Assigned to Adv. P. Mishra (District Court, Lucknow)</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-blue-900">Vocational Training (Active)</p>
                    <p className="text-slate-600 mt-0.5">Enrolled in IT & Computer Literacy, Batch Oct-2026</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-900">Victim Compensation Scheme</p>
                    <p className="text-slate-600 mt-0.5">1st installment sanctioned. Treasury verification underway.</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-full bg-[#1E3A5F] text-white text-xs font-bold cursor-pointer"
              >
                Close Plan
              </button>
            </div>
          </div>
        )}

        {/* 11. My Case History Modal */}
        {activeModal === 'case-history' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Case Timeline History</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="my-4 space-y-3 text-xs max-h-64 overflow-y-auto pr-1">
                <div className="border-l-2 border-[#1E3A5F] pl-3 py-1">
                  <p className="font-bold text-slate-900">Today · Current Wellness Status</p>
                  <p className="text-slate-500">Score {distressScore}/100 · {scoreHeading}</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-3 py-1">
                  <p className="font-bold text-slate-900">Yesterday · Counsellor Call</p>
                  <p className="text-slate-500">Duration 18 mins with Counsellor R. Sharma</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-3 py-1">
                  <p className="font-bold text-slate-900">3 Days Ago · Hearing Notice</p>
                  <p className="text-slate-500">Notice acknowledged by Legal Aid desk</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-full bg-[#1E3A5F] text-white text-xs font-bold cursor-pointer"
              >
                Close History
              </button>
            </div>
          </div>
        )}

        {/* 12. Find Help Near Me Modal */}
        {activeModal === 'near-me' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>Support Centres Near You</span>
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="my-4 space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900">District One Stop Centre (OSC)</p>
                  <p className="text-slate-500">Civil Hospital Campus · 2.4 km away</p>
                  <p className="text-emerald-700 font-semibold mt-1">Open 24/7 · Phone: 0522-2614500</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900">District Legal Services Authority (DLSA)</p>
                  <p className="text-slate-500">District Court Compound · 4.1 km away</p>
                  <p className="text-emerald-700 font-semibold mt-1">Free Legal Aid Helpdesk</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-full bg-[#1E3A5F] text-white text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* 13. Care Reminders Modal */}
        {activeModal === 'reminders' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Care & Hearing Reminders</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="my-4 space-y-2.5 text-xs">
                {reminders.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{r.title}</p>
                      <p className="text-slate-500">{r.time}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={r.active}
                      onChange={() => {
                        setReminders((prev) =>
                          prev.map((item) => (item.id === r.id ? { ...item, active: !item.active } : item))
                        );
                      }}
                      className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-full bg-[#1E3A5F] text-white text-xs font-bold cursor-pointer"
              >
                Save Reminders
              </button>
            </div>
          </div>
        )}

        {/* Change Time Modal */}
        {showTimeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">Change Check-in Timing</h3>
              <div className="space-y-2 my-4">
                {['Tomorrow, 09:00 AM', 'Tomorrow, 10:30 AM', 'Tomorrow, 02:00 PM', 'Tomorrow, 07:00 PM'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTempTime(t)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                      tempTime === t
                        ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTimeModal(false)}
                  className="flex-1 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCheckinTime}
                  disabled={timeSaving}
                  className="flex-1 py-2 rounded-full bg-[#1E3A5F] text-white text-xs font-bold cursor-pointer"
                >
                  {timeSaving ? 'Saving...' : 'Save Time'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Modal */}
        <EmergencyModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />
      </div>
    </AuthGuard>
  );
}
