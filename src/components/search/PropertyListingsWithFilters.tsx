'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterState } from './PropertyFilter';
import PropertyListings from './PropertyListings';

export default function PropertyListingsWithFilters() {
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);
  const searchParams = useSearchParams();
  
  // Parse filter values from URL parameters
  useEffect(() => {
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') || '0', 10) : 0;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') || '10000000', 10) : 10000000;
    const bedrooms = searchParams.get('bedrooms') || 'any';
    const bathrooms = searchParams.get('bathrooms') || 'any';
    const propertyType = searchParams.get('propertyType') || 'any';
    const status = searchParams.get('status') || 'any';
    const amenities = searchParams.get('amenities') ? searchParams.get('amenities')?.split(',') || [] : [];
    
    setActiveFilters({
      priceRange: [minPrice, maxPrice],
      bedrooms,
      bathrooms,
      propertyType,
      amenities,
      status
    });
  }, [searchParams]);
  
  return <PropertyListings filters={activeFilters} />;
}
