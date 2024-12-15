import React from 'react';

interface ChartGridProps {
  divisions?: number;
}

export const ChartGrid: React.FC<ChartGridProps> = ({ divisions = 5 }) => (
  <div className="absolute inset-0 grid grid-cols-12 gap-[2px]">
    {Array.from({ length: divisions }).map((_, i) => (
      <div
        key={i}
        className="col-span-12 border-b border-gray-100"
        style={{ bottom: `${(i * 100) / (divisions - 1)}%` }}
      />
    ))}
  </div>
);