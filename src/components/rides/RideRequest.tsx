import React, { useState } from 'react';
import { Car, MapPin, Users, DollarSign } from 'lucide-react';
import { calculateRideCost } from '../../utils/pricing';

interface RideRequestProps {
  onSubmit: (passengers: number, address: string) => void;
}

export const RideRequest: React.FC<RideRequestProps> = ({ onSubmit }) => {
  const [passengers, setPassengers] = useState(1);
  const [address, setAddress] = useState('');
  
  const totalCost = calculateRideCost(passengers);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-2xl p-8 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <Car className="w-16 h-16 text-blue-600 relative" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Request a Ride</h2>

      <div className="space-y-6">
        <div className="relative">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 mr-2" />
            Number of Passengers
          </label>
          <input
            type="number"
            min="1"
            value={passengers}
            onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value)))}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
        </div>

        <div className="relative">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            Pickup Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
            rows={3}
            placeholder="Enter your pickup location..."
          />
        </div>

        <div className="flex justify-between items-center py-4 px-6 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-600 font-medium">Total Cost:</span>
          </div>
          <span className="text-2xl font-bold text-blue-600">${totalCost}</span>
        </div>

        <button
          onClick={() => onSubmit(passengers, address)}
          disabled={!address.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Request Ride
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          Base fare: $10 + $1 per additional passenger
        </p>
      </div>
    </div>
  );
};