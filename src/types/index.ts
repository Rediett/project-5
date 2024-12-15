export interface PricingTier {
  id: number;
  price: number;
  capacity: number;
  remaining: number;
}

export interface RideRequest {
  userId: string;
  passengers: number;
  totalCost: number;
  pickupAddress: string;
}

export interface RSVP {
  id: string;
  userId: string;
  ticketNumber: string;
  tier: number;
  price: number;
  timestamp: Date;
  rideRequest?: RideRequest;
}