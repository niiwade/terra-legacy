import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import {
  PropertyGallery,
  PropertyInfo,
  PropertyFeatures,
  PropertyLocation,
  ContactAgent,
  SimilarProperties,
  VirtualTour,
  MortgageCalculator
} from '@/components/property-details';

// Mock data for property details
const propertyData = {
  id: '1',
  title: 'Seaside Serenity Villa',
  subtitle: 'Luxury Beachfront Property',
  description: 'This stunning beachfront villa offers panoramic ocean views and luxurious living spaces. Featuring 5 bedrooms, 4 bathrooms, and premium finishes throughout, this property is perfect for those seeking the ultimate coastal lifestyle.',
  price: '$2,950,000',
  location: 'Palm Beach, Florida',
  coordinates: {
    lat: 26.7056,
    lng: -80.0364
  },
  bedrooms: '5',
  bathrooms: '4',
  area: '4,200 sq ft',
  yearBuilt: '2020',
  propertyType: 'Villa',
  status: 'For Sale',
  panoramaImages: [
    '/images/properties/panorama-1.jpg',
    '/images/properties/panorama-2.jpg',
    '/images/properties/panorama-3.jpg',
  ],
  features: [
    'Infinity Pool',
    'Private Beach Access',
    'Smart Home System',
    'Home Theater',
    'Wine Cellar',
    'Gourmet Kitchen',
    'Panoramic Ocean Views',
    'Outdoor Kitchen',
    'Fitness Center',
    'Spa Bathroom'
  ],
  images: [
    '/images/properties/luxury-villa.jpg',
    '/images/properties/luxury-villa-interior-1.jpg',
    '/images/properties/luxury-villa-interior-2.jpg',
    '/images/properties/luxury-villa-pool.jpg',
    '/images/properties/luxury-villa-garden.jpg',
  ],
  agent: {
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@terralegacy.com',
    image: '/images/agents/agent-1.jpg'
  },
  details: [
    { label: 'Property ID', value: 'TL-10045' },
    { label: 'Price', value: '$2,950,000' },
    { label: 'Property Size', value: '4,200 sq ft' },
    { label: 'Bedrooms', value: '5' },
    { label: 'Bathrooms', value: '4' },
    { label: 'Year Built', value: '2020' },
    { label: 'Garage', value: '2 Cars' },
    { label: 'Property Type', value: 'Villa' },
    { label: 'Property Status', value: 'For Sale' }
  ]
};

export const metadata = {
  title: `${propertyData.title} | Terra Legacy Real Estate`,
  description: propertyData.description.substring(0, 160),
};

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the property data based on the ID
  // const { id } = params;
  // const propertyData = await fetchPropertyData(id);
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
     
      <main>
        <PropertyGallery images={propertyData.images} />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 reveal-staggered">
            <PropertyInfo 
              title={propertyData.title}
              subtitle={propertyData.subtitle}
              price={propertyData.price}
              location={propertyData.location}
              bedrooms={propertyData.bedrooms}
              bathrooms={propertyData.bathrooms}
              area={propertyData.area}
              description={propertyData.description}
              details={propertyData.details}
            />
            
            <PropertyFeatures features={propertyData.features} />
            <VirtualTour panoramaImages={propertyData.panoramaImages} />
            <PropertyLocation address={propertyData.location} coordinates={propertyData.coordinates} />
            <MortgageCalculator propertyPrice={propertyData.price} />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactAgent agent={propertyData.agent} />
            </div>
          </div>
        </div>
        
        <SimilarProperties />
        <CTASection />
      </main>
    
    </div>
  );
}
