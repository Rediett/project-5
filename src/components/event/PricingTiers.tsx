import React from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { PricingTier } from '../../types/event';

interface PricingTiersProps {
  currentTier: PricingTier | null;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({ currentTier }) => {
  if (!currentTier) return null;

  const progress = ((currentTier.capacity - currentTier.remaining) / currentTier.capacity) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Current Tier</h2>
          <p className="text-gray-600">Price increases every 100 attendees</p>
        </div>
        <TrendingUp className="w-8 h-8 text-green-500" />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-4xl font-bold text-green-600">
            ${currentTier.price}
          </span>
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            <span>{currentTier.remaining} spots left</span>
          </div>
        </div>

        <div className="relative pt-1">
          <div className="overflow-hidden h-3 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 text-sm text-gray-600">
        <p>• Tier {currentTier.id} of pricing</p>
        <p>• Price increases by $3 at {currentTier.capacity} attendees</p>
        <p>• Secure your spot before price increases</p>
      </div>
    </div>
  );
};