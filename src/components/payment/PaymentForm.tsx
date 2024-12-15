import React, { useState } from 'react';
import { CreditCard, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { stripeService } from '../../services/stripe';
import type { PaymentError } from '../../types/payment';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: PaymentError) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Create a payment intent
      const { clientSecret } = await stripeService.createPaymentIntent(amount);

      // Confirm the payment
      const { paymentIntent } = await stripeService.confirmPayment(
        clientSecret,
        {
          payment_method: {
            card: cardDetails,
            billing_details: {}
          },
          amount
        }
      );

      if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      } else {
        throw new Error('Payment failed');
      }
    } catch (err) {
      const error = err as PaymentError;
      setError(error.message);
      onError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
        <Lock className="w-5 h-5 text-gray-400" />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <CreditCard className="w-4 h-4 mr-2" />
            Card Number
          </label>
          <input
            type="text"
            required
            maxLength={19}
            placeholder="4242 4242 4242 4242"
            value={cardDetails.number}
            onChange={(e) => setCardDetails(prev => ({ 
              ...prev, 
              number: formatCardNumber(e.target.value)
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              required
              placeholder="MM/YY"
              maxLength={5}
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails(prev => ({ 
                ...prev, 
                expiry: formatExpiry(e.target.value)
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVC
            </label>
            <input
              type="text"
              required
              placeholder="123"
              maxLength={4}
              value={cardDetails.cvc}
              onChange={(e) => setCardDetails(prev => ({ 
                ...prev, 
                cvc: e.target.value.replace(/\D/g, '')
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-2xl font-bold text-green-600">${amount}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          Your payment is secured. We never store your card details.
        </p>
      </form>
    </div>
  );
};