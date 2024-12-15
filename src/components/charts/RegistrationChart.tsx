import React, { useState, useEffect } from 'react';
import { Line, RefreshCw } from 'lucide-react';
import { ChartDataPoint } from '../../types/chart';
import { generateMockRegistrationData } from '../../utils/mockChartData';
import { formatTime } from '../../utils/dateFormatters';

export const RegistrationChart: React.FC = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      // Simulate API call delay
      setIsLoading(true);
      setTimeout(() => {
        const newData = generateMockRegistrationData();
        setData(newData);
        setLastUpdate(new Date());
        setIsLoading(false);
      }, 500);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Registration Trends</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Last updated: {formatTime(lastUpdate)}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Line className="w-4 h-4 mr-1 text-blue-500" />
          <span>Registrations per Hour</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[200px]">
        {/* Y-axis */}
        <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-gray-500">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="transform -translate-y-1/2">
              {Math.round((maxValue * (4 - i)) / 4)}
            </span>
          ))}
        </div>

        {/* Bars */}
        <div className="ml-8 h-full flex items-end">
          {data.map((point, index) => {
            const height = (point.value / maxValue) * 100;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group relative"
              >
                {/* Bar */}
                <div
                  className="w-full max-w-[30px] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-80 hover:opacity-100 transition-all duration-200"
                  style={{ 
                    height: `${height}%`,
                    filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))'
                  }}
                />

                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 transform -translate-x-1/2">
                    <div className="font-semibold">{point.value} registrations</div>
                    <div className="text-gray-300">{formatTime(point.time)}</div>
                  </div>
                </div>

                {/* X-axis label */}
                <span className="absolute bottom-[-20px] text-xs text-gray-500 transform -rotate-45 origin-top-left">
                  {point.time.getHours()}:00
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};