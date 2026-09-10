import { auth } from '../lib/firebase';

let API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';
if (API_BASE_URL.includes('firebase.google.com') || API_BASE_URL.includes('console.firebase')) {
  API_BASE_URL = '/api';
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (auth.currentUser) {
    try {
      const token = await auth.currentUser.getIdToken();
      headers['Authorization'] = `Bearer ${token}`;
    } catch (e) {
      console.warn('Could not retrieve Firebase ID token:', e);
    }
  } else {
    const adminToken = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    if (adminToken) {
      headers['Authorization'] = `Bearer ${adminToken}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
  }

  return data as T;
}
