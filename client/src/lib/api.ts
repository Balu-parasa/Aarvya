import {
  PriorityCase,
  LiveAlert,
  RehabilitationItem,
  CompensationRecord,
  CheckinSubmissionData,
  InterventionLogItem,
  User,
} from '@/types';

const DJANGO_API_BASE = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || 'http://127.0.0.1:8000/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed with status ${res.status}`);
    }

    return res.json();
  }

  // Auth
  async login(email: string, password?: string, role?: string): Promise<{ token: string; user: User }> {
    return this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  async register(data: { email: string; password: string; name?: string; role?: string }): Promise<{ token: string; user: User }> {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Cases & Alerts
  async getCases(): Promise<PriorityCase[]> {
    return this.request('/cases/');
  }

  async getAlerts(): Promise<LiveAlert[]> {
    return this.request('/alerts/');
  }

  async acknowledgeAlert(alertId: number | string): Promise<{ status: string; id: number | string }> {
    return this.request(`/alerts/${alertId}/acknowledge/`, {
      method: 'POST',
    });
  }

  async createAlert(data: { caseId: string; risk: string; message: string; time?: string }): Promise<LiveAlert> {
    return this.request('/alerts/create/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUserCheckin(data: {
    email: string;
    name?: string;
    has_completed_checkin?: boolean;
    distress_score?: number;
    next_checkin_time?: string;
    symptoms?: string[];
  }): Promise<User> {
    return this.request('/user/update-checkin/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async translateText(text: string, sourceLang = 'hi', targetLang = 'en'): Promise<{ translated_text: string }> {
    return this.request('/translate/', {
      method: 'POST',
      body: JSON.stringify({ text, source_lang: sourceLang, target_lang: targetLang }),
    });
  }

  async sendChatMessage(
    message: string,
    history: { sender: string; text: string }[] = [],
    apiKey?: string
  ): Promise<{ reply: string; source?: string; has_api_key?: boolean }> {
    return this.request('/chat/', {
      method: 'POST',
      body: JSON.stringify({ message, history, api_key: apiKey }),
    });
  }

  // Rehabilitation & Compensation
  async getRehabilitation(): Promise<RehabilitationItem[]> {
    return this.request('/rehabilitation/');
  }

  async getCompensation(): Promise<CompensationRecord[]> {
    return this.request('/compensation/');
  }

  // Checkins
  async submitCheckin(data: CheckinSubmissionData): Promise<{ status: string; data?: unknown }> {
    return this.request('/checkins/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Interventions
  async getInterventions(): Promise<InterventionLogItem[]> {
    return this.request('/interventions/');
  }

  async createIntervention(data: InterventionLogItem): Promise<InterventionLogItem> {
    return this.request('/interventions/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient(DJANGO_API_BASE);
