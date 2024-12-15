import { create } from 'zustand';
import { AuthState, LoginCredentials, SignupData, User } from '../types/auth';
import { api } from '../services/api';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    try {
      const response = await api.login(credentials);
      if (response.success) {
        set({ user: response.data, isAuthenticated: true, isLoading: false });
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  signup: async (data) => {
    try {
      const response = await api.signup(data);
      if (response.success) {
        set({ user: response.data, isAuthenticated: true, isLoading: false });
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  resetPassword: async (email) => {
    try {
      await api.resetPassword(email);
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  }
}));