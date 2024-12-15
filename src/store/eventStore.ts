import { create } from 'zustand';
import { EventStats, PricingTier } from '../types/event';
import { wsService } from '../services/socket';

interface EventStore {
  currentTier: PricingTier;
  stats: EventStats | null;
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

export const useEventStore = create<EventStore>((set) => ({
  currentTier: {
    id: 1,
    price: 1,
    capacity: 100,
    remaining: 100
  },
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      if (response.ok) {
        set({ stats: data, error: null });
      } else {
        set({ error: 'Failed to fetch stats' });
      }
    } catch (error) {
      set({ error: 'Failed to fetch stats' });
    } finally {
      set({ isLoading: false });
    }
  }
}));

// Subscribe to WebSocket updates
wsService.subscribe('statsUpdate', (stats: EventStats) => {
  useEventStore.setState({ stats });
});