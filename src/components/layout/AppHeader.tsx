import React from 'react';
import { Link } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center group">
              <PartyPopper className="w-8 h-8 text-green-500 group-hover:text-green-600 transition-colors" />
              <span className="text-xl font-bold text-gray-900 ml-2 group-hover:text-green-600 transition-colors">
                $1 Party
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};