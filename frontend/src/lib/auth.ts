import api from './api';
import { AuthResponse, User } from '@/types';

export const authService = {
  async register(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
  }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async getMe(): Promise<User> {
    const response = await api.get<{ success: boolean; data: { user: User } }>(
      '/auth/me'
    );
    return response.data.data.user;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  getStoredUser(): User | null {
    if (typeof window !== 'undefined') {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user);
    } catch {
      return null; // fallback if JSON is broken
    }
  }
}
return null;

    // if (typeof window !== 'undefined') {
    //   const user = localStorage.getItem('user');
    //   return user !== null ? JSON.parse(user) : null;

    // }
    // return null;
  },

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  },
};
