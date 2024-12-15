import React, { useState } from 'react';
import { Car } from 'lucide-react';
import { calculateRideCost } from '../utils/pricing';

interface RideRequestProps {
  onSubmit: (passengers: number, address: string) => void;
}

export const RideRequest: React.FC<RideRequestProps> = ({ onSubmit }) => {
  const [passengers, setPassengers] = useState(1);
  const [address, setAddress] = useState('');
  
  const totalCost = calculateRideCost(passengers);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-4">
        <Car className="w-12 h-12 text-blue-500" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Request a Ride</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Passengers</label>
          <input
            type="number"
            min="1"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="flex justify-between items-center py-4 border-t border-gray-200">
          <span className="text-gray-600">Total Cost:</span>
          <span className="text-2xl font-bold text-blue-600">${totalCost}</span>
        </div>

        <button
          onClick={() => onSubmit(passengers, address)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          Request Ride
        </button>
      </div>
    </div>
  );
};