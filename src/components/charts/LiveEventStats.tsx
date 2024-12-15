import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { useEventStore } from '../../store/eventStore';
import { formatTime } from '../../utils/dateFormatters';

export const LiveEventStats: React.FC = () => {
  const stats = useEventStore((state) => state.stats);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setLastUpdate(new Date());
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    };

    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!stats?.hourlyRegistrations) return null;

  const maxRegistrations = Math.max(...stats.hourlyRegistrations);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Live Registration Activity</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Last updated: {formatTime(lastUpdate)}</span>
          </div>
        </div>
        <TrendingUp className="w-6 h-6 text-blue-500" />
      </div>

      <div className="relative h-[200px] mt-8">
        {/* Chart Grid */}
        <div className="absolute inset-0 grid grid-cols-12 gap-[2px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="col-span-12 border-b border-gray-100"
              style={{ bottom: `${(i * 100) / 4}%` }}
            />
          ))}
        </div>

        {/* Y-axis Labels */}
        <div className="absolute -left-8 h-full flex flex-col justify-between text-xs text-gray-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="transform -translate-y-1/2">
              {Math.round((maxRegistrations * (4 - i)) / 4)}
            </span>
          ))}
        </div>

        {/* Bars */}
        <div className="relative h-full flex items-end">
          {stats.hourlyRegistrations.map((value, index) => {
            const height = (value / maxRegistrations) * 100;
            const hour = new Date().getHours() - (11 - index);
            const formattedHour = hour < 0 ? 24 + hour : hour;

            return (
              <div
                key={index}
                className="flex-1 group relative px-1"
              >
                {/* Bar */}
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-80 hover:opacity-100 transition-all duration-200"
                  style={{ 
                    height: `${height}%`,
                    filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))'
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                      <div className="font-semibold">{value} registrations</div>
                      <div className="text-gray-300">{formattedHour}:00</div>
                    </div>
                  </div>
                </div>

                {/* X-axis Label */}
                <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-xs text-gray-500">
                  {formattedHour}h
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};