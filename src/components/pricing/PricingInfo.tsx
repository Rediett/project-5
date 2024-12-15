import React from 'react';
import { DollarSign, Users } from 'lucide-react';
import { PricingTier } from '../../types/event';

interface PricingInfoProps {
  currentTier: PricingTier;
}

export const PricingInfo: React.FC<PricingInfoProps> = ({ currentTier }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-700">
          <DollarSign className="w-5 h-5 mr-2 text-green-600" />
          <span className="font-medium">Current Price:</span>
        </div>
        <span className="text-3xl font-bold text-green-600">${currentTier.price}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-700">
          <Users className="w-5 h-5 mr-2 text-green-600" />
          <span className="font-medium">Spots Left:</span>
        </div>
        <span className="text-2xl font-semibold text-gray-800">{currentTier.remaining}</span>
      </div>
    </div>
  );
};