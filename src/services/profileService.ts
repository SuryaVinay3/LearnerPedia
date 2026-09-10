import { apiRequest } from './apiClient';
import { UserProfile, SkillAnalysis, LearningPointTransaction } from '../types';

export const profileService = {
  async getProfile(): Promise<{
    user: UserProfile;
    transactions: LearningPointTransaction[];
    recentAttempts: any[];
  }> {
    return apiRequest('/profile');
  },

  async getAnalysis(): Promise<SkillAnalysis> {
    return apiRequest<SkillAnalysis>('/analysis/me');
  }
};
