import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FilterState } from './PropertyFilter';
import { initScrollAnimation } from '@/utils/scrollAnimation';

interface PropertyListingsProps {
  filters?: FilterState | null;
}

export default function PropertyListings({ filters }: PropertyListingsProps): React.ReactElement {
  // Initialize scroll animations
  useEffect(() => {
    initScrollAnimation();
  }, []);
  // Sample property data with IDs - wrapped in useMemo to prevent recreation on each render
  const allProperties = useMemo(() => [
    {
      id: '1',
      image: '/images/properties/luxury-villa.jpg',
      title: 'Seaside Serenity Villa',
      location: 'Palm Beach, Florida',
      description: 'Luxurious 5-bedroom villa with panoramic ocean views, infinity pool, and private beach access.',
      price: '$2,950,000',
      bedrooms: '5',
      bathrooms: '4',
      area: '4,200 sq ft'
    },
    {
      id: '2',
      image: '/images/properties/modern-apartment.jpg',
      title: 'Metropolitan Heights',
      location: 'Downtown, New York City',
      description: 'Sleek 3-bedroom apartment with floor-to-ceiling windows, modern amenities, and stunning city views.',
      price: '$1,850,000',
      bedrooms: '3',
      bathrooms: '2',
      area: '1,800 sq ft'
    },
    {
      id: '3',
      image: '/images/properties/skyscraper.jpg',
      title: 'Azure Horizon Penthouse',
      location: 'Marina District, San Francisco',
      description: 'Exclusive penthouse featuring panoramic bay views, private elevator, and luxury finishes throughout.',
      price: '$3,750,000',
      bedrooms: '4',
      bathrooms: '3.5',
      area: '3,200 sq ft'
    }
  ], []);

  // State for filtered properties
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  
  // Apply filters when they change
  useEffect(() => {
    if (!filters) {
      setFilteredProperties(allProperties);
      return;
    }
    
    const filtered = allProperties.filter(property => {
      // Parse price for comparison
      const price = parseInt(property.price.replace(/[^0-9]/g, ''), 10);
      
      // Check if price is within range
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }
      
      // Check bedrooms
      if (filters.bedrooms !== 'any') {
        const requiredBedrooms = parseInt(filters.bedrooms, 10);
        const propertyBedrooms = parseInt(property.bedrooms, 10);
        if (propertyBedrooms < requiredBedrooms) {
          return false;
        }
      }
      
      // Check bathrooms
      if (filters.bathrooms !== 'any') {
        const requiredBathrooms = parseFloat(filters.bathrooms);
        const propertyBathrooms = parseFloat(property.bathrooms.replace(/[^0-9.]/g, ''));
        if (propertyBathrooms < requiredBathrooms) {
          return false;
        }
      }
      
      // For demo purposes, we'll just return true for other filters
      // In a real app, you would check property type, status, and amenities
      
      return true;
    });
    
    setFilteredProperties(filtered);
  }, [filters, allProperties]);

  return (
    <div>
      {/* Results count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-300">
          <span className="font-semibold text-white">{filteredProperties.length}</span> properties found
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-300 text-sm">Sort by:</label>
          <select 
            id="sort" 
            className="bg-charcoal text-white border border-gray-700 rounded-md px-3 py-1 text-sm"
          >
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animate">
          {filteredProperties.map((property) => (
            <PropertyCard 
              key={property.id}
              id={property.id}
              image={property.image}
              title={property.title}
              location={property.location}
              description={property.description}
              price={property.price}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-400 text-lg">No properties match your search criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
}

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  description: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
}

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  description: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  id?: string; // Adding optional id property
}

function PropertyCard({ image, title, location, description, price, bedrooms, bathrooms, area, id = '1' }: PropertyCardProps): React.ReactElement {
  return (
    <div className="bg-charcoal bg-opacity-50 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-800 hover:border-burgundy reveal animate-fade-in">
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-burgundy text-white text-xs font-medium px-2 py-1 rounded">
          Featured
        </div>
       
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="flex items-center text-burgundy text-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </p>
        
        <p className="text-gray-400 text-sm mb-6">{description}</p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-300 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {bedrooms} Beds
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {bathrooms} Baths
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              {area}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-burgundy">{price}</p>
          <Link href={`/property-details/${id}`} className="bg-burgundy hover:bg-opacity-90 text-white text-sm px-4 py-2 rounded transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
