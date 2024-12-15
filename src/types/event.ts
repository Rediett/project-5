export interface EventStats {
  totalAttendees: number;
  ridePercentage: number;
  uniqueLocations: number;
  hourlyRate: number;
  hourlyRegistrations: number[];
  tierBreakdown: {
    tier: number;
    attendees: number;
    revenue: number;
  }[];
}

export interface PricingTier {
  id: number;
  price: number;
  capacity: number;
  remaining: number;
}