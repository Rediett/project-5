import { Event, EventStats } from '../types/event';

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Summer Music Festival',
    date: new Date('2024-07-15T18:00:00'),
    location: 'Downtown Event Center',
    totalCapacity: 1000,
    currentAttendees: 234,
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    currentTier: {
      id: 3,
      price: 7,
      capacity: 300,
      remaining: 66
    }
  },
  {
    id: '2',
    name: 'Art Gallery Opening',
    date: new Date('2024-06-20T19:00:00'),
    location: 'Modern Art Museum',
    totalCapacity: 500,
    currentAttendees: 89,
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5',
    currentTier: {
      id: 1,
      price: 1,
      capacity: 100,
      remaining: 11
    }
  },
  {
    id: '3',
    name: 'Food & Wine Festival',
    date: new Date('2024-08-05T17:00:00'),
    location: 'City Park',
    totalCapacity: 750,
    currentAttendees: 156,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    currentTier: {
      id: 2,
      price: 4,
      capacity: 200,
      remaining: 44
    }
  }
];

export const mockStats: EventStats = {
  totalAttendees: 479,
  ridePercentage: 45,
  uniqueLocations: 3,
  hourlyRate: 8,
  tierBreakdown: [
    { tier: 1, attendees: 89, revenue: 89 },
    { tier: 2, attendees: 156, revenue: 624 },
    { tier: 3, attendees: 234, revenue: 1638 }
  ]
};