import React, { useEffect, useState } from 'react';
import { EventStats } from '../../types/event';
import { wsService } from '../../services/socket';
import { BarChart, Users, DollarSign } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<EventStats | null>(null);

  useEffect(() => {
    wsService.subscribe('statsUpdate', setStats);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Event Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">${stats.totalRevenue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-gray-600">Total Rides</p>
              <p className="text-2xl font-bold">{stats.totalRides}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BarChart className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-gray-600">Active Tier</p>
              <p className="text-2xl font-bold">
                Tier {Math.floor(stats.tierBreakdown.length / 100) + 1}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Tier Breakdown</h3>
        <div className="space-y-4">
          {stats.tierBreakdown.map((tier) => (
            <div key={tier.tier} className="flex justify-between items-center">
              <span>Tier {tier.tier}</span>
              <span>{tier.attendees} attendees</span>
              <span>${tier.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};