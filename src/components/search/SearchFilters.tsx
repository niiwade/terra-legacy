'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyFilter, { FilterState } from './PropertyFilter';

// No props needed - we'll use URL parameters for state management
export default function SearchFilters() {
  const searchParams = useSearchParams();
  
  // We'll use local state to track filters
  const [filters] = useState<FilterState>(() => {
    // Initialize from URL parameters
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') || '0', 10) : 0;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') || '10000000', 10) : 10000000;
    const bedrooms = searchParams.get('bedrooms') || 'any';
    const bathrooms = searchParams.get('bathrooms') || 'any';
    const propertyType = searchParams.get('propertyType') || 'any';
    const status = searchParams.get('status') || 'any';
    const amenities = searchParams.get('amenities') ? searchParams.get('amenities')?.split(',') || [] : [];
    
    return {
      priceRange: [minPrice, maxPrice],
      bedrooms,
      bathrooms,
      propertyType,
      amenities,
      status
    };
  });
  
  // We pass no props to PropertyFilter since it handles its own state
  return <PropertyFilter initialFilters={filters} />;
}
