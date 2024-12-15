import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, User, Mail, Users, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useEventStore } from '../../store/eventStore';
import { PaymentForm } from '../payment/PaymentForm';
import type { PaymentError } from '../../types/payment';

interface RSVPModalProps {
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const currentTier = useEventStore((state) => state.currentTier);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    tickets: 1
  });

  if (!currentTier) return null;

  const totalCost = currentTier.price * formData.tickets;

  const handlePaymentSuccess = (paymentId: string) => {
    navigate('/ride-request', {
      state: {
        confirmationCode: paymentId,
        email: formData.email,
        tickets: formData.tickets
      }
    });
  };

  const handlePaymentError = (error: PaymentError) => {
    console.error('Payment failed:', error);
    // Handle payment error (show error message, etc.)
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 ? 'RSVP Details' : 'Payment Information'}
            </h2>
            <div className="flex items-center mt-4">
              <div className={`h-2 flex-1 rounded-full ${
                step === 1 ? 'bg-green-500' : 'bg-gray-200'
              }`} />
              <div className={`h-2 flex-1 rounded-full ml-2 ${
                step === 2 ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={50}
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 mr-2" />
                  Number of Tickets
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={4}
                  value={formData.tickets}
                  onChange={(e) => setFormData(prev => ({ ...prev, tickets: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">Maximum 4 tickets per person</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Cost:</span>
                  <span className="text-2xl font-bold text-green-600">${totalCost}</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {currentTier.remaining} spots remaining at this price
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.fullName || !formData.email || formData.tickets < 1}
                className="w-full flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={() => setStep(1)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Details
              </button>

              <PaymentForm
                amount={totalCost}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};