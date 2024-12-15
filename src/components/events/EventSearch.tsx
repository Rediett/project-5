import React from 'react';
import { Search } from 'lucide-react';

interface EventSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export const EventSearch: React.FC<EventSearchProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative flex-1 max-w-lg">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search events by name, location, or category..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
      />
    </div>
  );
};