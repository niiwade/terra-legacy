'use client'
import React from 'react';
import dynamic from 'next/dynamic';

interface PropertyLocationProps {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Dynamically import the PropertyMap component to avoid SSR issues with Leaflet
const PropertyMap = dynamic(
  () => import('./PropertyMap'),
  { ssr: false }
);

export default function PropertyLocation({ address, coordinates = { lat: 26.7056, lng: -80.0364 } }: PropertyLocationProps): React.ReactElement {
  return (
    <section className="mb-12">
      <h3 className="text-xl font-semibold mb-4">Location</h3>
      
      <div className="bg-charcoal bg-opacity-50 p-6 rounded-xl">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white">{address}</span>
          </div>
        </div>
        
        {/* Interactive Map using Leaflet */}
        <div className="w-full h-80 bg-gray-800 rounded-lg overflow-hidden reveal animate-fade-in">
          <div id="property-map" className="w-full h-full">
            {typeof window !== 'undefined' && (
              <PropertyMap address={address} coordinates={coordinates} />
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-lg font-medium mb-2">Nearby Amenities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Schools within 2 miles</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Shopping Centers within 1 mile</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Restaurants within 0.5 miles</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Parks within 1 mile</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
