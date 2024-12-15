import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { EventSearch } from '../components/events/EventSearch';
import { EventFilters } from '../components/events/EventFilters';
import { EventCard } from '../components/events/EventCard';
import { useEventStore } from '../store/eventStore';
import { Event } from '../types/event';

export const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    categories: [] as string[],
    priceRange: { min: 0, max: 0 },
    location: ''
  });

  const events = useEventStore((state) => state.events);
  const fetchEvents = useEventStore((state) => state.fetchEvents);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset pagination when filters change
  };

  const filteredEvents = events?.filter((event: Event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange = !filters.dateRange.start || !filters.dateRange.end ||
      (new Date(event.date) >= new Date(filters.dateRange.start) &&
       new Date(event.date) <= new Date(filters.dateRange.end));

    const matchesPriceRange = !filters.priceRange.max ||
      (event.currentTier.price >= filters.priceRange.min &&
       event.currentTier.price <= filters.priceRange.max);

    const matchesLocation = !filters.location ||
      event.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesDateRange && matchesPriceRange && matchesLocation;
  });

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil((filteredEvents?.length || 0) / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Discover Events
        </h1>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <EventSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-all duration-200"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-8">
          <EventFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedEvents?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                page === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};