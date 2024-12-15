import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { RideRequestForm } from '../components/rides/RideRequestForm';
import { Car } from 'lucide-react';

export const RideRequestPage: React.FC = () => {
  const location = useLocation();
  const { confirmationCode, email } = location.state || {};

  if (!confirmationCode || !email) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500 rounded-full opacity-20 blur-lg animate-pulse" />
              <Car className="w-16 h-16 text-blue-500 relative" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Need a Ride?
          </h1>
          <p className="text-gray-600">
            Let us help coordinate your transportation to the event.
          </p>
        </div>

        <RideRequestForm 
          confirmationCode={confirmationCode}
          email={email}
        />
      </div>
    </div>
  );
};