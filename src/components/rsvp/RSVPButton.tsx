import React, { useState } from 'react';
import { PartyPopper } from 'lucide-react';
import { useEventStore } from '../../store/eventStore';
import { RSVPModal } from './RSVPModal';

export const RSVPButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const currentTier = useEventStore((state) => state.currentTier);

  if (!currentTier) return null;

  return (
    <div className="text-center">
      <button
        onClick={() => setShowModal(true)}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-green-500 to-blue-500 rounded-full hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <span className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
        <PartyPopper className="w-6 h-6 mr-2" />
        <span>RSVP Now for ${currentTier.price}</span>
      </button>
      <p className="mt-4 text-sm text-gray-600">
        {currentTier.remaining} spots remaining at this price
      </p>

      {showModal && <RSVPModal onClose={() => setShowModal(false)} />}
    </div>
  );
};