import { apiRequest } from './apiClient';
import { QuizQuestion, QuizAttempt } from '../types';

export const quizService = {
  async getQuizQuestions(courseId: string = 'computer-networks'): Promise<QuizQuestion[]> {
    return apiRequest<QuizQuestion[]>(`/quizzes/${courseId}`);
  },

  async submitQuiz(
    quizId: string,
    answers: Record<number, number>,
    timeSeconds: number,
    hintsUsed: number
  ): Promise<{
    score: number;
    accuracy: number;
    xpEarned: number;
    lpEarned: number;
    correctAnswers: number;
    totalQuestions: number;
    attempt: QuizAttempt;
  }> {
    return apiRequest('/quizzes/submit', {
      method: 'POST',
      body: JSON.stringify({ quizId, answers, timeSeconds, hintsUsed }),
    });
  }
};
