import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Clock, AlertCircle, X } from 'lucide-react';
import { PassengerInput } from './PassengerInput';
import { TimeSelect } from './TimeSelect';
import { calculateRideCost } from '../../utils/pricing';

interface RideRequestFormProps {
  confirmationCode: string;
  email: string;
}

interface PassengerEmail {
  email: string;
  isValid: boolean;
}

export const RideRequestForm: React.FC<RideRequestFormProps> = ({
  confirmationCode,
  email
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupAddress: '',
    preferredTime: '',
    passengerEmails: [] as PassengerEmail[],
    specialRequirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPassengers = formData.passengerEmails.length + 1;
  const totalCost = calculateRideCost(totalPassengers);

  const handleAddPassenger = () => {
    if (formData.passengerEmails.length < 3) {
      setFormData(prev => ({
        ...prev,
        passengerEmails: [...prev.passengerEmails, { email: '', isValid: false }]
      }));
    }
  };

  const handleRemovePassenger = (index: number) => {
    setFormData(prev => ({
      ...prev,
      passengerEmails: prev.passengerEmails.filter((_, i) => i !== index)
    }));
  };

  const handlePassengerEmailChange = (index: number, value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);

    setFormData(prev => ({
      ...prev,
      passengerEmails: prev.passengerEmails.map((passenger, i) =>
        i === index ? { email: value, isValid } : passenger
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate('/confirmation', {
        state: {
          confirmationCode,
          hasRideRequest: true,
          rideDetails: {
            pickupAddress: formData.pickupAddress,
            preferredTime: formData.preferredTime,
            passengers: totalPassengers,
            cost: totalCost
          }
        }
      });
    } catch (error) {
      setError('Failed to submit ride request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    navigate('/confirmation', { state: { confirmationCode } });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            Pickup Location
          </label>
          <input
            type="text"
            required
            value={formData.pickupAddress}
            onChange={(e) => setFormData(prev => ({ ...prev, pickupAddress: e.target.value }))}
            placeholder="Enter your pickup address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 mr-2" />
            Preferred Pickup Time
          </label>
          <TimeSelect
            value={formData.preferredTime}
            onChange={(time) => setFormData(prev => ({ ...prev, preferredTime: time }))}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Users className="w-4 h-4 mr-2" />
              Additional Passengers
            </label>
            {formData.passengerEmails.length < 3 && (
              <button
                type="button"
                onClick={handleAddPassenger}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Add Passenger
              </button>
            )}
          </div>

          <div className="space-y-3">
            {formData.passengerEmails.map((passenger, index) => (
              <div key={index} className="flex items-center space-x-2">
                <PassengerInput
                  value={passenger.email}
                  onChange={(value) => handlePassengerEmailChange(index, value)}
                  isValid={passenger.isValid}
                />
                <button
                  type="button"
                  onClick={() => handleRemovePassenger(index)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requirements (Optional)
          </label>
          <textarea
            value={formData.specialRequirements}
            onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
            placeholder="Any special accommodations needed?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Total Cost:</span>
            <span className="text-2xl font-bold text-blue-600">${totalCost}</span>
          </div>
          <p className="text-sm text-gray-500">
            Base fare: $10 + $1 per additional passenger
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSkip}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Skip
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Request Ride'}
          </button>
        </div>
      </form>
    </div>
  );
};