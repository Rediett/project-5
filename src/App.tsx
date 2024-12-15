import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppHeader } from './components/layout/AppHeader';
import { AppRoutes } from './components/layout/AppRoutes';
import { PulsingDots } from './components/background/PulsingDots';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <PulsingDots />
        <div className="relative z-10">
          <AppHeader />
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};