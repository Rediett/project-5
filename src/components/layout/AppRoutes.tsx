import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { RideRequestPage } from '../../pages/RideRequestPage';
import { ConfirmationPage } from '../../pages/ConfirmationPage';

export const AppRoutes: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ride-request" element={<RideRequestPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </main>
  );
};