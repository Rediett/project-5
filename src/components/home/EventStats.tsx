import React from 'react';
import { Users, MapPin, Car, TrendingUp } from 'lucide-react';
import { useEventStore } from '../../store/eventStore';
import { LiveEventStats } from '../charts/LiveEventStats';

export const EventStats: React.FC = () => {
  const stats = useEventStore((state) => state.stats);
  
  if (!stats) return null;

  const statCards = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      label: "Total Attendees",
      value: stats.totalAttendees,
      trend: "+12% this week"
    },
    {
      icon: <Car className="w-8 h-8 text-green-500" />,
      label: "Ride Requests",
      value: `${stats.ridePercentage}%`,
      trend: "of attendees"
    },
    {
      icon: <MapPin className="w-8 h-8 text-purple-500" />,
      label: "Locations",
      value: stats.uniqueLocations,
      trend: "different cities"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      label: "Registration Rate",
      value: `${stats.hourlyRate}/hr`,
      trend: "last 24 hours"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{card.icon}</div>
              <span className="text-xs font-medium text-gray-500">{card.trend}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-2">{card.label}</h3>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      <LiveEventStats />
    </div>
  );
};