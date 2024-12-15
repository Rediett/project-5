import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { TicketQR } from '../components/ticket/TicketQR';
import { CheckCircle } from 'lucide-react';

export const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const { confirmationCode, ticketId, eventDetails } = location.state || {};

  if (!confirmationCode || !ticketId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-500 rounded-full opacity-20 blur-lg animate-pulse" />
              <CheckCircle className="w-16 h-16 text-green-500 relative" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            You're All Set!
          </h1>
          <p className="text-gray-600">
            Your ticket has been confirmed and sent to your email.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <TicketQR 
              ticketId={ticketId} 
              eventDetails={eventDetails || 'The $1 Party Experience'} 
            />
            
            <div className="mt-8 space-y-4 text-sm text-gray-600">
              <p>• Save this QR code or keep the email handy</p>
              <p>• Present this ticket at the entrance</p>
              <p>• Confirmation code: {confirmationCode}</p>
              {location.state?.rideRequest && (
                <p>• Your ride request has been confirmed</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};