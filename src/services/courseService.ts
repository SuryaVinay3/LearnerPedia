import { apiRequest } from './apiClient';
import { Course, Lesson } from '../types';

export const courseService = {
  async getCourses(): Promise<Course[]> {
    return apiRequest<Course[]>('/courses');
  },

  async getCourseById(id: string): Promise<Course> {
    return apiRequest<Course>(`/courses/${id}`);
  },

  async getLessons(courseId: string): Promise<Lesson[]> {
    return apiRequest<Lesson[]>(`/courses/${courseId}/lessons`);
  },

  async completeLesson(courseId: string, lessonId: string): Promise<{ success: boolean; xpEarned: number; lpEarned: number; completedLessons: string[] }> {
    return apiRequest(`/courses/${courseId}/lessons/${lessonId}/complete`, {
      method: 'POST',
    });
  },

  async getRandomCheckpoint(lessonId?: string) {
    const query = lessonId ? `?lessonId=${lessonId}` : '';
    return apiRequest(`/checkpoints/random${query}`);
  },

  async submitCheckpoint(checkpointId: string, answer: string, timeSeconds: number) {
    return apiRequest('/checkpoints/submit', {
      method: 'POST',
      body: JSON.stringify({ checkpointId, answer, timeSeconds }),
    });
  }
};
