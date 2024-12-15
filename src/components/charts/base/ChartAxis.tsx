import React from 'react';

interface YAxisProps {
  maxValue: number;
  divisions?: number;
}

export const YAxis: React.FC<YAxisProps> = ({ maxValue, divisions = 5 }) => (
  <div className="absolute -left-8 h-full flex flex-col justify-between text-xs text-gray-500">
    {Array.from({ length: divisions }).map((_, i) => (
      <span key={i} className="transform -translate-y-1/2">
        {Math.round((maxValue * (divisions - 1 - i)) / (divisions - 1))}
      </span>
    ))}
  </div>
);

interface XAxisProps {
  labels: string[];
}

export const XAxis: React.FC<XAxisProps> = ({ labels }) => (
  <div className="absolute bottom-[-24px] w-full flex justify-between text-xs text-gray-500">
    {labels.map((label, index) => (
      <div key={index} className="text-center">
        {label}
      </div>
    ))}
  </div>
);