import { apiRequest } from './apiClient';
import { Reward, RewardRedemption } from '../types';

export const rewardService = {
  async getRewards(): Promise<Reward[]> {
    return apiRequest<Reward[]>('/store');
  },

  async redeemReward(rewardId: string): Promise<{ success: boolean; message: string; redemption: RewardRedemption; remainingLp: number }> {
    return apiRequest('/store/redeem', {
      method: 'POST',
      body: JSON.stringify({ rewardId }),
    });
  }
};
