import React from 'react';
import { Calendar, MapPin, Music, Users } from 'lucide-react';

export const EventDetails: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div 
        className="h-64 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30)'
        }}
      />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          The $1 Party Experience
        </h1>
        
        <div className="space-y-6">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-6 h-6 text-blue-500 mr-3" />
            <div>
              <p className="font-medium">March 15, 2024</p>
              <p className="text-sm">8:00 PM - 2:00 AM</p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <p className="font-medium">Downtown Event Center</p>
              <p className="text-sm blur-sm select-none hover:blur-none transition-all duration-300">
                123 Party Street, Downtown
              </p>
              <p className="text-xs text-gray-500 mt-1">
                (Full address will be sent 24h before event)
              </p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <Music className="w-6 h-6 text-purple-500 mr-3" />
            <div>
              <p className="font-medium">Live Entertainment</p>
              <p className="text-sm">Featured DJs and Performers</p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <Users className="w-6 h-6 text-green-500 mr-3" />
            <div>
              <p className="font-medium">Age Requirement</p>
              <p className="text-sm">18+ Event</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Event Highlights
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Multiple dance floors with different music genres</li>
            <li>• Complimentary welcome drink</li>
            <li>• Professional photography</li>
            <li>• Exclusive VIP areas available</li>
            <li>• Food vendors on-site</li>
          </ul>
        </div>
      </div>
    </div>
  );
};