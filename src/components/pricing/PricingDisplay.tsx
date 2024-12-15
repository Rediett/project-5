import React from 'react';
import { PartyPopper, Users, Clock, MapPin } from 'lucide-react';
import { PricingDisplayProps } from './types';
import { PricingInfo } from './PricingInfo';
import { PricingProgress } from './PricingProgress';

export const PricingDisplay: React.FC<PricingDisplayProps> = ({ 
  currentTier,
  onRSVP 
}) => {
  if (!currentTier) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto animate-pulse">
        <div className="flex items-center justify-center">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-2xl p-8 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
          <PartyPopper className="w-16 h-16 text-green-600 relative" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Join the Party!</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-green-600 mb-2">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Capacity</span>
            </div>
            <p className="text-2xl font-bold">{currentTier.capacity}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-green-600 mb-2">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Remaining</span>
            </div>
            <p className="text-2xl font-bold">{currentTier.remaining}</p>
          </div>
        </div>

        <PricingInfo currentTier={currentTier} />
        <PricingProgress currentTier={currentTier} />
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-sm">Location: Downtown Event Center</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span className="text-sm">Date: March 15, 2024 at 8:00 PM</span>
          </div>
        </div>
        
        <button
          onClick={onRSVP}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] shadow-lg"
        >
          RSVP Now for ${currentTier.price}
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          Price increases by $3 for every 100 attendees
        </p>
      </div>
    </div>
  );
};