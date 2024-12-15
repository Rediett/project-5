export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
}

export interface EmailData {
  to: string;
  subject: string;
  ticketUrl: string;
  eventDetails: string;
}