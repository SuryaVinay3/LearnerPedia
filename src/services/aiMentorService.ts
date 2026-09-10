import { apiRequest } from './apiClient';
import { MentorMessage, MentorMode, MentorStudentContext, ProactiveAlert } from '../types/mentor';
import { generateLocalMentorResponse, generateProactiveAlert, MentorEngineResult } from './aiMentorEngine';

const LOCAL_HISTORY_KEY = 'learnerpedia_mentor_chat_history';

export interface MentorChatResponse {
  reply: string;
  mentorState?: 'speaking' | 'explaining' | 'encouraging' | 'challenging' | 'proud';
  emotionalTone?: string;
  practiceCard?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    topic?: string;
  };
  formulaCard?: {
    title: string;
    formula: string;
    variables: { symbol: string; meaning: string }[];
    example: string;
    tip?: string;
  };
  diagnosticCard?: {
    issue: string;
    symptom: string;
    suggestedFix: string;
    relatedLabId?: string;
  };
  recommendedStep?: {
    title: string;
    type: 'course' | 'lesson' | 'lab' | 'quiz' | 'store';
    link: string;
    reason: string;
    xpReward?: number;
  };
  suggestedFollowUps?: string[];
  proactiveInsight?: string;
}

function saveLocalHistory(message: string, result: MentorEngineResult | MentorChatResponse, mode: MentorMode) {
  try {
    const raw = localStorage.getItem(LOCAL_HISTORY_KEY);
    const history: MentorMessage[] = raw ? JSON.parse(raw) : [];

    const userMsg: MentorMessage = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: 'student',
      text: message,
      timestamp: new Date().toISOString()
    };

    const mentorMsg: MentorMessage = {
      id: `mnt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: 'mentor',
      text: result.reply,
      timestamp: new Date().toISOString(),
      mode,
      mentorState: result.mentorState || 'speaking',
      practiceCard: result.practiceCard,
      formulaCard: result.formulaCard,
      diagnosticCard: result.diagnosticCard,
      recommendedStep: result.recommendedStep,
      suggestedFollowUps: result.suggestedFollowUps || []
    };

    const updated = [...history, userMsg, mentorMsg].slice(-30);
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not save local mentor history:', e);
  }
}

export async function sendMentorMessage(
  message: string,
  context: MentorStudentContext,
  mode: MentorMode = 'socratic',
  preferredLanguage: string = 'English'
): Promise<MentorChatResponse> {
  // 1. Try server API
  try {
    const response = await apiRequest<MentorChatResponse>('/ai-mentor/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        context,
        mode,
        preferredLanguage
      })
    });

    if (response && response.reply) {
      saveLocalHistory(message, response, mode);
      return response;
    }
  } catch (err) {
    console.warn('Backend /ai-mentor/chat API unavailable (Vercel/Static mode fallback active):', err);
  }

  // 2. Fallback to resilient client-side pedagogical engine
  const localResponse = generateLocalMentorResponse(message, context, mode, preferredLanguage);
  saveLocalHistory(message, localResponse, mode);
  return localResponse;
}

export async function fetchProactiveAlert(context: MentorStudentContext): Promise<ProactiveAlert | null> {
  try {
    const res = await apiRequest<{ alert: ProactiveAlert | null }>('/ai-mentor/proactive', {
      method: 'POST',
      body: JSON.stringify({ context })
    });
    if (res && res.alert) {
      return res.alert;
    }
  } catch (err) {
    // Expected on Vercel static hosting
  }

  return generateProactiveAlert(context);
}

export async function fetchMentorHistory(): Promise<MentorMessage[]> {
  try {
    const res = await apiRequest<{ history: MentorMessage[] }>('/ai-mentor/history');
    if (res && Array.isArray(res.history) && res.history.length > 0) {
      return res.history;
    }
  } catch (err) {
    // Expected on Vercel static hosting
  }

  try {
    const raw = localStorage.getItem(LOCAL_HISTORY_KEY);
    if (raw) {
      const history = JSON.parse(raw);
      if (Array.isArray(history)) return history;
    }
  } catch (e) {
    console.warn('Error reading local mentor history:', e);
  }

  return [];
}

export async function clearMentorHistory(): Promise<boolean> {
  try {
    localStorage.removeItem(LOCAL_HISTORY_KEY);
    await apiRequest('/ai-mentor/clear-history', { method: 'POST' }).catch(() => {});
    return true;
  } catch (err) {
    console.warn('Failed to clear mentor history:', err);
    return true;
  }
}

