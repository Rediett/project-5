import React from 'react';
import { useEventStore } from '../../store/eventStore';

export const RegistrationChart: React.FC = () => {
  const stats = useEventStore((state) => state.stats);

  if (!stats) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Registration Trends</h3>
      <div className="h-64 flex items-end justify-between space-x-2">
        {stats.hourlyRegistrations.map((count, index) => {
          const height = `${(count / Math.max(...stats.hourlyRegistrations)) * 100}%`;
          return (
            <div key={index} className="relative flex-1">
              <div 
                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                style={{ height }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                  {count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i}>{i}h</span>
        ))}
      </div>
    </div>
  );
};