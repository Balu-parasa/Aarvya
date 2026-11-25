export type Role = 'victim' | 'counsellor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  case_id?: string;
  hasCompletedCheckin?: boolean;
  distressScore?: number;
  nextCheckinTime?: string;
  symptoms?: string[];
}

export interface PriorityCase {
  id: string;
  name?: string;
  risk: 'High' | 'Medium' | 'Low' | string;
  score: number;
  trend: 'Rising' | 'Steady' | 'Falling' | string;
  reasons: string;
  lastContact: string;
  assignedCounsellor: string;
  district?: string;
}

export interface LiveAlert {
  id: number | string;
  caseId: string;
  risk: 'critical' | 'high' | 'medium' | 'low' | string;
  message: string;
  time: string;
  acknowledged: boolean;
}

export interface RehabilitationItem {
  id: string;
  linked: string;
  title: string;
  progress: number;
  officer: string;
  nextAction: string;
  dueDays: string;
  status: string;
  badgeColor?: string;
}

export interface CompensationRecord {
  id: number | string;
  caseId: string;
  instalment: string;
  amount: string;
  statusLabel: string;
  statusType: 'disbursed' | 'pending' | 'sanctioned' | string;
}

export interface CheckinSubmissionData {
  language: string;
  email?: string;
  text_consent?: boolean;
  voice_consent?: boolean;
  camera_consent?: boolean;
  medication_consent?: boolean;
  sms_consent?: boolean;
  name?: string;
  age_range?: string;
  reach_method?: string;
  checkin_time?: string;
  feeling?: string;
  distress_score?: number;
}

export interface InterventionLogItem {
  id?: number;
  caseId?: string;
  case_id?: string;
  type?: string;
  log_type?: string;
  notes: string;
  date?: string;
  date_str?: string;
}

export interface ChatMessage {
  id?: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp?: string;
}
