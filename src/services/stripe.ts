import { loadStripe } from '@stripe/stripe-js';
import type { PaymentIntent, PaymentError } from '../types/payment';

const MOCK_PAYMENT_DELAY = 1000; // Simulate API latency

// In a real app, this would be an API call
const mockCreatePaymentIntent = async (amount: number): Promise<PaymentIntent> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_PAYMENT_DELAY));
  
  // Simulate successful payment intent creation
  return {
    clientSecret: 'mock_client_secret_' + Math.random().toString(36).substr(2, 9),
    amount
  };
};

// Mock payment confirmation
const mockConfirmPayment = async (clientSecret: string, paymentMethod: any) => {
  await new Promise(resolve => setTimeout(resolve, MOCK_PAYMENT_DELAY));
  
  // Simulate successful payment
  return {
    paymentIntent: {
      id: 'mock_payment_' + Math.random().toString(36).substr(2, 9),
      status: 'succeeded',
      amount: paymentMethod.amount
    }
  };
};

export const stripeService = {
  async createPaymentIntent(amount: number): Promise<PaymentIntent> {
    try {
      // In development/test, use mock implementation
      return await mockCreatePaymentIntent(amount);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw {
        type: 'payment_intent_failed',
        message: 'Failed to initialize payment. Please try again.'
      } as PaymentError;
    }
  },

  async confirmPayment(clientSecret: string, paymentMethod: any) {
    try {
      // In development/test, use mock implementation
      return await mockConfirmPayment(clientSecret, paymentMethod);
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw {
        type: 'payment_confirmation_failed',
        message: 'Payment confirmation failed. Please try again.'
      } as PaymentError;
    }
  }
};