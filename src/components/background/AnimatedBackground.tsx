import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { generateDotPattern } from '../../utils/backgroundPatterns';

export const AnimatedBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  const dots = generateDotPattern(20); // Generate 20 dots

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient">
      {/* Base gradient background */}
      <div 
        className="fixed inset-0 bg-gradient-radial from-gray-50 via-gray-100 to-gray-200"
        style={{ opacity: 0.8 }}
      />

      {/* Animated dots */}
      {!prefersReducedMotion && (
        <div className="fixed inset-0" aria-hidden="true">
          {dots.map((dot, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-dot animate-float"
              style={{
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                animationDelay: `${dot.delay}ms`,
                opacity: dot.opacity,
                backgroundColor: dot.color
              }}
            />
          ))}
        </div>
      )}

      {/* Static dots for reduced motion */}
      {prefersReducedMotion && (
        <div className="fixed inset-0" aria-hidden="true">
          {dots.map((dot, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-dot"
              style={{
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                opacity: dot.opacity,
                backgroundColor: dot.color
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};