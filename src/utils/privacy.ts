import { RideRequest } from '../types/event';

export function redactAddress(address: string): string {
  // Split address into components
  const parts = address.split(',').map(part => part.trim());
  
  if (parts.length === 0) return '[REDACTED]';

  // Keep city and state/country if available, redact specific location
  if (parts.length >= 2) {
    const cityAndRegion = parts.slice(-2).join(', ');
    return `[REDACTED LOCATION], ${cityAndRegion}`;
  }

  // If only one part, redact most of it
  return '[REDACTED LOCATION]';
}

export function redactRideDetails(rideRequest: RideRequest): RideRequest {
  return {
    ...rideRequest,
    pickupAddress: redactAddress(rideRequest.pickupAddress),
    // Keep other non-sensitive information
    passengers: rideRequest.passengers,
    totalCost: rideRequest.totalCost
  };
}

export function createPrivateEmailContent(
  type: 'confirmation' | 'ride_request',
  data: any
): string {
  switch (type) {
    case 'confirmation':
      return `
        Thank you for registering for The $1 Party!
        
        Event Details:
        --------------
        Date: March 15, 2024
        Time: 8:00 PM
        Location: [REDACTED FOR PRIVACY]
        
        Your ticket information:
        Confirmation Code: ${data.confirmationCode}
        Number of Tickets: ${data.tickets}
        Total Amount: $${data.amount}
        
        Important Notes:
        - Your QR code is attached to this email
        - The exact venue address will be sent 24 hours before the event
        - Please bring a valid ID matching your registration name
        
        Need a ride? You can request transportation through our platform.
        
        Questions? Contact us at support@dollarparty.com
      `;

    case 'ride_request':
      const redactedRequest = redactRideDetails(data.rideRequest);
      return `
        Your ride request has been confirmed!
        
        Pickup Details:
        --------------
        Area: ${redactedRequest.pickupAddress}
        Passengers: ${redactedRequest.passengers}
        Total Cost: $${redactedRequest.totalCost}
        
        Important Notes:
        - Exact pickup location and driver details will be sent 24 hours before the event
        - Please be ready 15 minutes before your scheduled pickup time
        - Driver will verify your identity using your confirmation code
        
        For any changes or cancellations, please visit our platform.
        
        Questions? Contact us at rides@dollarparty.com
      `;

    default:
      return '';
  }
}