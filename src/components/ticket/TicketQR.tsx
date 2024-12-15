import React from 'react';
import QRCode from 'qrcode.react';

interface TicketQRProps {
  ticketId: string;
  eventDetails: string;
}

export const TicketQR: React.FC<TicketQRProps> = ({ ticketId, eventDetails }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Your Ticket</h3>
      <div className="flex justify-center mb-4">
        <QRCode value={ticketId} size={200} />
      </div>
      <div className="text-sm text-gray-600">
        <p className="mb-2">Ticket ID: {ticketId}</p>
        <p>{eventDetails}</p>
      </div>
    </div>
  );
};