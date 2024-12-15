import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Event } from '../../types/event';
import { useAuthStore } from '../../store/authStore';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleRSVP = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${event.id}` } });
    } else {
      navigate(`/events/${event.id}/rsvp`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-[1.02]">
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2 text-green-500" />
            <span>{new Date(event.date).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2 text-red-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2 text-purple-500" />
            <span>{event.currentAttendees}/{event.totalCapacity} attending</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ${event.currentTier.price}
          </span>
          <button
            onClick={handleRSVP}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            RSVP Now
          </button>
        </div>
      </div>
    </div>
  );
};