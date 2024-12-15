import React from 'react';
import { EventStats } from '../components/home/EventStats';
import { RSVPButton } from '../components/rsvp/RSVPButton';
import { PartyPopper, Calendar, MapPin, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-lg animate-pulse" />
                <PartyPopper className="w-16 h-16 text-green-500 relative" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-gray-900">Join the Most Affordable</span>
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Party of the Year!
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
              Starting at just $1! The price increases as more people join.
              Don't miss out on this incredible event.
            </p>

            <div className="mt-10">
              <RSVPButton />
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="py-16 bg-gray-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg transform transition-all hover:scale-105">
              <Calendar className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">When</h3>
              <p className="text-gray-600 text-center">March 15, 2024</p>
              <p className="text-gray-600 text-center">8:00 PM</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg transform transition-all hover:scale-105">
              <MapPin className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Where</h3>
              <p className="text-gray-600 text-center">Downtown Event Center</p>
              <p className="text-gray-600 text-center">123 Party Street</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg transform transition-all hover:scale-105">
              <Users className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Who</h3>
              <p className="text-gray-600 text-center">All are welcome!</p>
              <p className="text-gray-600 text-center">Ages 18+</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Live Event Statistics
            </h2>
            <EventStats />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Ready to Join the Party?
          </h2>
          <RSVPButton />
        </div>
      </div>
    </div>
  );
};