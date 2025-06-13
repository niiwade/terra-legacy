import React from 'react';
import FavoriteButton from '@/components/common/FavoriteButton';

interface PropertyDetail {
  label: string;
  value: string;
}

interface PropertyInfoProps {
  title: string;
  subtitle: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  description: string;
  details: PropertyDetail[];
  id?: string;
}

export default function PropertyInfo({
  title,
  subtitle,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  description,
  details,
  id = '1' // Default ID if not provided
}: PropertyInfoProps): React.ReactElement {
  // Property data for favorite button
  const propertyData = {
    id,
    title,
    location,
    price,
    image: '', // This would normally be passed from parent
    bedrooms,
    bathrooms,
    area
  };
  return (
    <section className="mb-12 reveal animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{title}</h1>
            <h2 className="text-xl md:text-2xl text-burgundy mb-4">{subtitle}</h2>
          </div>
          <div className="mt-2">
            <FavoriteButton property={propertyData} size="lg" showText={true} />
          </div>
        </div>
        
        <div className="flex items-center text-gray-300 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>
        
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{bedrooms} Bedrooms</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{bathrooms} Bathrooms</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span>{area}</span>
          </div>
        </div>
        
        <div className="text-3xl font-bold text-burgundy mb-6">{price}</div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Description</h3>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-charcoal bg-opacity-50 p-6 rounded-xl">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-400">{detail.label}</span>
              <span className="text-white font-medium">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
