'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

export interface FilterState {
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  amenities: string[];
  status: string;
}

const defaultFilters: FilterState = {
  priceRange: [0, 10000000],
  bedrooms: 'any',
  bathrooms: 'any',
  propertyType: 'any',
  amenities: [],
  status: 'any'
};

export default function PropertyFilter({ onFilterChange, initialFilters = {} }: FilterProps): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Merge default filters with any initial filters passed in
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters
  });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value, 10) || 0;
    const newPriceRange = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    
    // Ensure min <= max
    if (index === 0 && value > newPriceRange[1]) {
      newPriceRange[1] = value;
    } else if (index === 1 && value < newPriceRange[0]) {
      newPriceRange[0] = value;
    }
    
    updateFilters({ priceRange: newPriceRange });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof FilterState) => {
    updateFilters({ [field]: e.target.value });
  };

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = [...filters.amenities];
    const index = currentAmenities.indexOf(amenity);
    
    if (index === -1) {
      currentAmenities.push(amenity);
    } else {
      currentAmenities.splice(index, 1);
    }
    
    updateFilters({ amenities: currentAmenities });
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    
    // Update URL with filter parameters
    const params = new URLSearchParams(searchParams.toString());
    
    // Add each filter to the URL parameters
    if (updatedFilters.priceRange[0] > 0) params.set('minPrice', updatedFilters.priceRange[0].toString());
    else params.delete('minPrice');
    
    if (updatedFilters.priceRange[1] < 10000000) params.set('maxPrice', updatedFilters.priceRange[1].toString());
    else params.delete('maxPrice');
    
    if (updatedFilters.bedrooms !== 'any') params.set('bedrooms', updatedFilters.bedrooms);
    else params.delete('bedrooms');
    
    if (updatedFilters.bathrooms !== 'any') params.set('bathrooms', updatedFilters.bathrooms);
    else params.delete('bathrooms');
    
    if (updatedFilters.propertyType !== 'any') params.set('propertyType', updatedFilters.propertyType);
    else params.delete('propertyType');
    
    if (updatedFilters.status !== 'any') params.set('status', updatedFilters.status);
    else params.delete('status');
    
    if (updatedFilters.amenities.length > 0) params.set('amenities', updatedFilters.amenities.join(','));
    else params.delete('amenities');
    
    // Update the URL without refreshing the page
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    router.push('', { scroll: false });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-charcoal bg-opacity-50 rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-6">Filter Properties</h3>
      
      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Price Range</label>
        <div className="flex items-center justify-between gap-4">
          <div className="w-1/2">
            <input
              type="number"
              min="0"
              max={filters.priceRange[1]}
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full bg-charcoal text-white border border-gray-700 rounded-md px-3 py-2"
              placeholder="Min"
            />
          </div>
          <span className="text-gray-400">to</span>
          <div className="w-1/2">
            <input
              type="number"
              min={filters.priceRange[0]}
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full bg-charcoal text-white border border-gray-700 rounded-md px-3 py-2"
              placeholder="Max"
            />
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>{formatPrice(filters.priceRange[0])}</span>
          <span>{formatPrice(filters.priceRange[1])}</span>
        </div>
      </div>
      
      {/* Bedrooms */}
      <div className="mb-6">
        <label htmlFor="bedrooms" className="block text-gray-300 mb-2">Bedrooms</label>
        <select
          id="bedrooms"
          value={filters.bedrooms}
          onChange={(e) => handleSelectChange(e, 'bedrooms')}
          className="w-full bg-charcoal text-white border border-gray-700 rounded-md px-3 py-2"
        >
          <option value="any">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>
      
      {/* Bathrooms */}
      <div className="mb-6">
        <label htmlFor="bathrooms" className="block text-gray-300 mb-2">Bathrooms</label>
        <select
          id="bathrooms"
          value={filters.bathrooms}
          onChange={(e) => handleSelectChange(e, 'bathrooms')}
          className="w-full bg-charcoal text-white border border-gray-700 rounded-md px-3 py-2"
        >
          <option value="any">Any</option>
          <option value="1">1+</option>
          <option value="1.5">1.5+</option>
          <option value="2">2+</option>
          <option value="2.5">2.5+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
      
      {/* Property Type */}
      <div className="mb-6">
        <label htmlFor="propertyType" className="block text-gray-300 mb-2">Property Type</label>
        <select
          id="propertyType"
          value={filters.propertyType}
          onChange={(e) => handleSelectChange(e, 'propertyType')}
          className="w-full bg-charcoal text-white border border-gray-700 rounded-md px-3 py-2"
        >
          <option value="any">Any</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
          <option value="villa">Villa</option>
          <option value="penthouse">Penthouse</option>
        </select>
      </div>
      
      {/* Status */}
      <div className="mb-6">
        <label htmlFor="status" className="block text-gray-300 mb-2">Status</label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => handleSelectChange(e, 'status')}
          className="w-full bg-charcoal text-white border border-gray-700 rounded-md px-3 py-2"
        >
          <option value="any">Any</option>
          <option value="forSale">For Sale</option>
          <option value="forRent">For Rent</option>
          <option value="sold">Sold</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      
      {/* Amenities */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          {['Pool', 'Gym', 'Garden', 'Balcony', 'Parking', 'Elevator', 'Security', 'Air Conditioning'].map(amenity => (
            <div key={amenity} className="flex items-center">
              <input
                type="checkbox"
                id={`amenity-${amenity}`}
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="w-4 h-4 bg-charcoal border-gray-700 rounded text-burgundy focus:ring-burgundy"
              />
              <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-300">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={resetFilters}
          className="w-1/2 py-2 px-4 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => onFilterChange(filters)}
          className="w-1/2 py-2 px-4 bg-burgundy text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
