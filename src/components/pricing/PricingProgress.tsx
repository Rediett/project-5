import React from 'react';
import { PricingTier } from '../../types/event';

interface PricingProgressProps {
  currentTier: PricingTier;
}

export const PricingProgress: React.FC<PricingProgressProps> = ({ currentTier }) => {
  const progressPercentage = ((currentTier.capacity - currentTier.remaining) / currentTier.capacity) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Tier Progress</span>
        <span>{Math.round(progressPercentage)}% Full</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};