import React from 'react';
import { Calendar, MapPin, Tag, DollarSign } from 'lucide-react';

interface FilterProps {
  filters: {
    dateRange: { start: string; end: string };
    categories: string[];
    priceRange: { min: number; max: number };
    location: string;
  };
  onFilterChange: (key: string, value: any) => void;
}

export const EventFilters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const categories = ['Music', 'Art', 'Food', 'Sports', 'Technology', 'Business'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => onFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => onFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <DollarSign className="w-4 h-4 mr-2 text-green-500" />
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              min="0"
              value={filters.priceRange.min}
              onChange={(e) => onFilterChange('priceRange', { ...filters.priceRange, min: Number(e.target.value) })}
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Min"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              min="0"
              value={filters.priceRange.max}
              onChange={(e) => onFilterChange('priceRange', { ...filters.priceRange, max: Number(e.target.value) })}
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <MapPin className="w-4 h-4 mr-2 text-red-500" />
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          <option value="downtown">Downtown</option>
          <option value="uptown">Uptown</option>
          <option value="suburbs">Suburbs</option>
        </select>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <Tag className="w-4 h-4 mr-2 text-purple-500" />
          Categories
        </label>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.categories, category]
                    : filters.categories.filter(c => c !== category);
                  onFilterChange('categories', newCategories);
                }}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};