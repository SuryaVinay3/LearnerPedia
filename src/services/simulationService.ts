import { apiRequest } from './apiClient';
import { SimulationConfig } from '../types';

export const simulationService = {
  async testSimulation(
    config: SimulationConfig,
    attempts: number,
    hintsUsed: number,
    timeSeconds: number
  ): Promise<{
    success: boolean;
    errors: string[];
    diagnostics: string[];
    message: string;
    xpEarned: number;
    lpEarned: number;
  }> {
    return apiRequest('/simulation/test', {
      method: 'POST',
      body: JSON.stringify({ config, attempts, hintsUsed, timeSeconds }),
    });
  }
};
