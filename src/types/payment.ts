export interface PaymentIntent {
  clientSecret: string;
  amount: number;
}

export interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

export interface PaymentError {
  type: string;
  message: string;
}