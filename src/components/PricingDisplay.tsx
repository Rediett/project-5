import React from 'react';
import { PricingTier } from '../types/event';
import { DollarSign } from 'lucide-react';

interface PricingDisplayProps {
  currentTier?: PricingTier;
  onRSVP: () => void;
}

export const PricingDisplay: React.FC<PricingDisplayProps> = ({ 
  currentTier,
  onRSVP 
}) => {
  if (!currentTier) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
        <div className="flex items-center justify-center">
          <p className="text-gray-500">Loading pricing information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-4">
        <DollarSign className="w-12 h-12 text-green-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">Current Pricing Tier</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Current Price:</span>
          <span className="text-2xl font-bold text-green-600">${currentTier.price}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Spots Remaining:</span>
          <span className="text-xl font-semibold">{currentTier.remaining}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${(currentTier.remaining / currentTier.capacity) * 100}%` }}
          ></div>
        </div>
        
        <button
          onClick={onRSVP}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          RSVP Now
        </button>
      </div>
    </div>
  );
};