import React, { useMemo } from 'react';
import { generateDots } from '../../utils/dotPatterns';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PulsingDotsProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  colors?: string[];
}

export const PulsingDots: React.FC<PulsingDotsProps> = ({
  count = 50,
  minSize = 10,
  maxSize = 30,
  colors = ['#60A5FA', '#34D399', '#A78BFA', '#F472B6']
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  const dots = useMemo(() => generateDots(count), [count]);

  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
      {dots.map((dot, index) => (
        <div
          key={index}
          className={`absolute rounded-full transition-transform ${
            prefersReducedMotion ? '' : 'animate-pulse-scale'
          }`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${minSize}px`,
            height: `${minSize}px`,
            backgroundColor: colors[index % colors.length],
            opacity: 0.6,
            filter: 'blur(1px)',
            animationDelay: `${dot.delay}ms`,
            transform: `scale(${dot.scale})`,
            transformOrigin: 'center center'
          }}
        />
      ))}
    </div>
  );
};