import React from 'react';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useEventStore } from '../../store/eventStore';

export const UserDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const userEvents = useEventStore((state) => state.userEvents);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome back, {user?.fullName}!
        </h2>
        <p className="text-gray-600">
          Manage your event RSVPs and ride requests here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userEvents?.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.status === 'upcoming' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {event.status}
              </span>
            </div>

            <div className="space-y-3 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-500" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Ticket className="w-5 h-5 mr-2 text-green-500" />
                <span>Ticket #{event.ticketNumber}</span>
              </div>
              {event.rideRequest && (
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-500" />
                  <span>{event.rideRequest.passengers} passengers</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex space-x-4">
              <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                View Details
              </button>
              {!event.rideRequest && (
                <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                  Request Ride
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};