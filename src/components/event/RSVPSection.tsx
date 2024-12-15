import React, { useState } from 'react';
import { PartyPopper } from 'lucide-react';
import { RSVPForm } from './RSVPForm';

export const RSVPSection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {!showForm ? (
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-lg animate-pulse" />
              <PartyPopper className="w-12 h-12 text-green-500 relative" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join the Party?
          </h2>
          
          <p className="text-gray-600 mb-8">
            Lock in your spot at the current price tier before it increases!
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-blue-600 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            RSVP Now
          </button>
        </div>
      ) : (
        <RSVPForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};