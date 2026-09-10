import { apiRequest } from './apiClient';
import { Competition, CompetitionAttempt } from '../types';

export const competitionService = {
  async getCompetition(id: string = 'subnetting-challenge'): Promise<Competition> {
    return apiRequest<Competition>(`/competitions/${id}`);
  },

  async submitCompetition(
    competitionId: string,
    allocations: any,
    timeSeconds: number,
    hintsUsed: number
  ): Promise<{
    success: boolean;
    score: number;
    accuracy: number;
    xpEarned: number;
    lpEarned: number;
    message: string;
    attempt: CompetitionAttempt;
  }> {
    return apiRequest(`/competitions/${competitionId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ allocations, timeSeconds, hintsUsed }),
    });
  },

  async getLeaderboard(): Promise<{ rank: number; studentName: string; score: number; accuracy: number; timeTaken: number; badge: string; isCurrentUser?: boolean }[]> {
    return apiRequest('/leaderboard');
  }
};
