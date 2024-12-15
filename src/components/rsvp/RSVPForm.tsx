import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Users } from 'lucide-react';
import { useEventStore } from '../../store/eventStore';
import { api } from '../../services/api';

interface RSVPFormData {
  fullName: string;
  email: string;
  tickets: number;
}

export const RSVPForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const currentTier = useEventStore((state) => state.currentTier);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: '',
    email: '',
    tickets: 1
  });

  if (!currentTier) return null;

  const totalCost = currentTier.price * formData.tickets;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await api.createRSVP({
        ...formData,
        tier: currentTier.id,
        totalAmount: totalCost
      });

      if (response.success) {
        navigate('/ride-request', { 
          state: { 
            confirmationCode: response.data.confirmationCode,
            email: formData.email 
          }
        });
      }
    } catch (error) {
      console.error('RSVP submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reserve Your Spot</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 mr-2" />
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 mr-2" />
            Number of Tickets
          </label>
          <input
            type="number"
            required
            min={1}
            max={4}
            value={formData.tickets}
            onChange={(e) => setFormData(prev => ({ ...prev, tickets: parseInt(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="mt-1 text-sm text-gray-500">Maximum 4 tickets per person</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Cost:</span>
            <span className="text-2xl font-bold text-green-600">${totalCost}</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {currentTier.remaining} spots remaining at this price
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </form>
    </div>
  );
};