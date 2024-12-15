import React from 'react';
import { EventDetails } from '../components/event/EventDetails';
import { RSVPSection } from '../components/event/RSVPSection';
import { PricingTiers } from '../components/event/PricingTiers';
import { useEventStore } from '../store/eventStore';

export const EventPage: React.FC = () => {
  const currentTier = useEventStore((state) => state.currentTier);
  const stats = useEventStore((state) => state.stats);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <EventDetails />
        <div className="space-y-8">
          <PricingTiers currentTier={currentTier} />
          <RSVPSection />
        </div>
      </div>
    </div>
  );
};