'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PropertyFilters } from '@/types';

interface SearchFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
  initialFilters?: PropertyFilters;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange, initialFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters || {});

  const handleChange = (key: keyof PropertyFilters, value: unknown) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onFilterChange(filters);
    setShowFilters(false);
  };

  const handleReset = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#999999] w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title or description..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none placeholder-[#666666]"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center space-x-2 px-6 py-3 border border-[#262626] text-white rounded-lg hover:bg-[#262626] hover:border-[#703BF7] transition-all"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
        </button>
        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-[#703BF7] text-white rounded-lg hover:bg-[#8254f8] transition-colors font-medium"
        >
          Search
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-[#262626] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Property Type
            </label>
            <select
              value={filters.propertyType || ''}
              onChange={(e) => handleChange('propertyType', e.target.value)}
              className="w-full px-4 py-2 bg-[#141414] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none"
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Listing Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Listing Type
            </label>
            <select
              value={filters.listingType || ''}
              onChange={(e) => handleChange('listingType', e.target.value)}
              className="w-full px-4 py-2 bg-[#141414] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none"
            >
              <option value="">All</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              City
            </label>
            <input
              type="text"
              placeholder="Enter city"
              value={filters.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-4 py-2 bg-[#141414] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none placeholder-[#666666]"
            />
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Min Price
            </label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-4 py-2 bg-[#141414] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none placeholder-[#666666]"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Max Price
            </label>
            <input
              type="number"
              placeholder="Any"
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-4 py-2 bg-[#141414] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none placeholder-[#666666]"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Min Bedrooms
            </label>
            <select
              value={filters.bedrooms || ''}
              onChange={(e) => handleChange('bedrooms', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-4 py-2 bg-[#141414] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Min Bathrooms
            </label>
            <select
              value={filters.bathrooms || ''}
              onChange={(e) => handleChange('bathrooms', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-4 py-2 bg-[#141414] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Sort By
            </label>
            <select
              value={filters.sort || ''}
              onChange={(e) => handleChange('sort', e.target.value)}
              className="w-full px-4 py-2 bg-[#141414] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none"
            >
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-6 py-2 text-[#999999] hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
