import React from 'react';
import { RefreshCw } from 'lucide-react';
import { formatTime } from '../../../utils/dateFormatters';

interface ChartContainerProps {
  title: string;
  icon: React.ReactNode;
  lastUpdate: Date;
  isLoading: boolean;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  icon,
  lastUpdate,
  isLoading,
  children
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Last updated: {formatTime(lastUpdate)}</span>
          </div>
        </div>
        {icon}
      </div>
      {children}
    </div>
  );
};