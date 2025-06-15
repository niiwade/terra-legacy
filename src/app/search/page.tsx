'use client';

import { useState, Suspense } from 'react';

import CTASection from "@/components/CTASection";
import MortgageCalculator from "@/components/MortgageCalculator";
import dynamic from 'next/dynamic';
import SearchHero from "@/components/search/SearchHero";

// No longer needed as we're using PropertyListingsWithFilters instead
// const PropertyListings = dynamic(
//   () => import('@/components/search/PropertyListings'),
//   { ssr: true }
// );

const ContactForm = dynamic(
  () => import('@/components/search/ContactForm'),
  { ssr: true }
);

// Dynamically import the PropertyMap component to avoid SSR issues with Leaflet
const PropertyMap = dynamic(
  () => import('@/components/search/PropertyMap'),
  { ssr: false }
);



export default function SearchPage() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  // Dynamically import the SearchFilters component that uses useSearchParams
  const SearchFilters = dynamic(() => import('@/components/search/SearchFilters'), { ssr: false });
  
  // We'll use a separate component to handle property listings based on URL parameters
  const PropertyListingsWithFilters = dynamic(() => import('@/components/search/PropertyListingsWithFilters'), { ssr: false });
  
  // Sample property data with coordinates for the map
  const properties = [
    {
      id: '1',
      title: 'Seaside Serenity Villa',
      location: 'Palm Beach, Florida',
      price: '$2,950,000',
      image: '/images/properties/15.jpg',
      description: 'Luxurious 5-bedroom villa with panoramic ocean views, infinity pool, and private beach access.',
      bedrooms: '5',
      bathrooms: '4',
      area: '4,200 sq ft',
      coordinates: {
        lat: 26.7056,
        lng: -80.0364
      }
    },
    {
      id: '2',
      title: 'Metropolitan Heights',
      location: 'Downtown, New York City',
      price: '$1,850,000',
      image: '/images/properties/2.jpg',
      description: 'Sleek 3-bedroom apartment with floor-to-ceiling windows, modern amenities, and stunning city views.',
      bedrooms: '3',
      bathrooms: '2',
      area: '1,800 sq ft',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    {
      id: '3',
      title: 'Azure Horizon Penthouse',
      location: 'Marina District, San Francisco',
      price: '$3,750,000',
      image: '/images/properties/3.jpg',
      description: 'Exclusive penthouse featuring panoramic bay views, private elevator, and luxury finishes throughout.',
      bedrooms: '4',
      bathrooms: '3.5',
      area: '3,200 sq ft',
      coordinates: {
        lat: 37.8199,
        lng: -122.4783
      }
    }
  ];



  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <main>
          <SearchHero />
          
          <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                  Discover a World of Possibilities
                </h2>
                <p className="text-black max-w-3xl text-lg">
                  Our handpicked selection of premium properties offers something for everyone, from luxury urban apartments to tranquil suburban homes and everything in between.
                </p>
              </div>
              
              <div className="mb-8 flex justify-end">
                <div className="bg-charcoal rounded-lg p-1 inline-flex">
                  <button 
                    onClick={() => setViewMode('list')} 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-burgundy text-black' : 'text-black hover:text-black'}`}
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      List View
                    </span>
                  </button>
                  <button 
                    onClick={() => setViewMode('map')} 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-burgundy text-black' : 'text-black hover:text-black'}`}
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Map View
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <Suspense fallback={<div className="p-6 bg-charcoal bg-opacity-50 rounded-xl border border-gray-800 h-96 animate-pulse">Loading filters...</div>}>
                    <SearchFilters />
                  </Suspense>
                  <div className="mt-8">
                    <MortgageCalculator />
                  </div>
                </div>
                <div className="lg:col-span-3">
                  {viewMode === 'list' ? (
                    <Suspense fallback={<div className="p-6 bg-charcoal bg-opacity-50 rounded-xl border border-gray-800 h-[600px] animate-pulse">Loading properties...</div>}>
                      <PropertyListingsWithFilters />
                    </Suspense>
                  ) : (
                    <div className="bg-charcoal bg-opacity-50 rounded-xl overflow-hidden border border-gray-800 h-[700px] reveal animate-fade-in">
                      <PropertyMap properties={properties} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          
          <ContactForm />
          <CTASection />
        </main>
    </div>
  );
}
