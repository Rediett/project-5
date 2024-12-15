import React from 'react';

interface ChartBarProps {
  height: number;
  label: string;
  value: number;
  time: string;
}

export const ChartBar: React.FC<ChartBarProps> = ({
  height,
  label,
  value,
  time
}) => (
  <div className="flex-1 group relative px-1">
    <div
      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-80 hover:opacity-100 transition-all duration-200"
      style={{ 
        height: `${height}%`,
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))'
      }}
    >
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
          <div className="font-semibold">{value} registrations</div>
          <div className="text-gray-300">{time}</div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-xs text-gray-500">
      {label}
    </div>
  </div>
);