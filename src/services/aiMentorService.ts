import { apiRequest } from './apiClient';
import { MentorMessage, MentorMode, MentorStudentContext, ProactiveAlert } from '../types/mentor';

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

export async function sendMentorMessage(
  message: string,
  context: MentorStudentContext,
  mode: MentorMode = 'socratic',
  preferredLanguage: string = 'English'
): Promise<MentorChatResponse> {
  return await apiRequest<MentorChatResponse>('/ai-mentor/chat', {
    method: 'POST',
    body: JSON.stringify({
      message,
      context,
      mode,
      preferredLanguage
    })
  });
}

export async function fetchProactiveAlert(context: MentorStudentContext): Promise<ProactiveAlert | null> {
  try {
    const res = await apiRequest<{ alert: ProactiveAlert | null }>('/ai-mentor/proactive', {
      method: 'POST',
      body: JSON.stringify({ context })
    });
    return res.alert;
  } catch (err) {
    console.warn('Failed to fetch proactive mentor alert:', err);
    return null;
  }
}

export async function fetchMentorHistory(): Promise<MentorMessage[]> {
  try {
    const res = await apiRequest<{ history: MentorMessage[] }>('/ai-mentor/history');
    return res.history || [];
  } catch (err) {
    console.warn('Failed to fetch mentor history:', err);
    return [];
  }
}

export async function clearMentorHistory(): Promise<boolean> {
  try {
    await apiRequest('/ai-mentor/clear-history', { method: 'POST' });
    return true;
  } catch (err) {
    console.warn('Failed to clear mentor history:', err);
    return false;
  }
}
