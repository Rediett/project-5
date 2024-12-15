import { ApiResponse, LoginCredentials, SignupData, User } from '../types/auth';
import { Event, EventStats } from '../types/event';
import { storage } from '../utils/storage';
import { mockEvents, mockStats } from '../utils/mockData';

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    await delay(800);
    const users = storage.get('users') || [];
    const user = users.find((u: User) => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    storage.set('currentUser', user);
    return { success: true, data: user };
  },

  async signup(data: SignupData): Promise<ApiResponse<User>> {
    await delay(800);
    const users = storage.get('users') || [];
    
    if (users.some((u: User) => u.email === data.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      fullName: data.fullName,
      createdAt: new Date()
    };

    users.push(newUser);
    storage.set('users', users);
    storage.set('currentUser', newUser);
    
    return { success: true, data: newUser };
  },

  async getEvents(): Promise<ApiResponse<Event[]>> {
    await delay(500);
    return { success: true, data: mockEvents };
  },

  async getEventStats(): Promise<ApiResponse<EventStats>> {
    await delay(500);
    return { success: true, data: mockStats };
  },

  async resetPassword(email: string): Promise<ApiResponse<void>> {
    await delay(800);
    return { success: true };
  }
};