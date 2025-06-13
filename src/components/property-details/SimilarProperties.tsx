import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for similar properties
const similarProperties = [
  {
    id: '2',
    title: 'Metropolitan Heights',
    location: 'Downtown, New York City',
    price: '$1,850,000',
    bedrooms: '3',
    bathrooms: '2',
    area: '1,800 sq ft',
    image: '/images/properties/modern-apartment.jpg'
  },
  {
    id: '3',
    title: 'Azure Horizon Penthouse',
    location: 'Marina District, San Francisco',
    price: '$3,750,000',
    bedrooms: '4',
    bathrooms: '3.5',
    area: '3,200 sq ft',
    image: '/images/properties/skyscraper.jpg'
  },
  {
    id: '4',
    title: 'Emerald Valley Estate',
    location: 'Beverly Hills, Los Angeles',
    price: '$4,250,000',
    bedrooms: '6',
    bathrooms: '5',
    area: '5,100 sq ft',
    image: '/images/properties/luxury-villa.jpg'
  }
];

export default function SimilarProperties(): React.ReactElement {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-charcoal bg-opacity-30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Similar Properties
          </h2>
          <p className="text-gray-300 max-w-3xl text-lg">
            Explore more luxury properties that match your preferences and requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {similarProperties.map((property) => (
            <PropertyCard 
              key={property.id}
              id={property.id}
              image={property.image}
              title={property.title}
              location={property.location}
              price={property.price}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
}

function PropertyCard({ id, image, title, location, price, bedrooms, bathrooms, area }: PropertyCardProps): React.ReactElement {
  return (
    <div className="bg-charcoal bg-opacity-50 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-800 hover:border-burgundy">
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
