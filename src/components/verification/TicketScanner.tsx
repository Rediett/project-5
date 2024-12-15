import React, { useState } from 'react';
import { api } from '../../services/api';
import { CheckCircle, XCircle } from 'lucide-react';

export const TicketScanner: React.FC = () => {
  const [ticketId, setTicketId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);

  const handleVerification = async () => {
    const response = await api.verifyTicket(ticketId);
    setVerificationStatus(response.data || false);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Ticket Verification</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          placeholder="Enter ticket ID or scan QR code"
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleVerification}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Verify Ticket
        </button>

        {verificationStatus !== null && (
          <div className={`flex items-center ${
            verificationStatus ? 'text-green-500' : 'text-red-500'
          }`}>
            {verificationStatus ? (
              <CheckCircle className="w-6 h-6 mr-2" />
            ) : (
              <XCircle className="w-6 h-6 mr-2" />
            )}
            <span>
              {verificationStatus ? 'Valid ticket' : 'Invalid ticket'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};