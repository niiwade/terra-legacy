'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import FavoriteButton from '@/components/common/FavoriteButton';
import { initScrollAnimation } from '@/utils/scrollAnimation';

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps): React.ReactElement {
  // Initialize scroll animations
  useEffect(() => {
    initScrollAnimation();
  }, []);
  
  // Mock property data for favorite button
  const propertyData = {
    id: '1', // This would normally come from props
    title: 'Seaside Serenity Villa',
    location: 'Palm Beach, Florida',
    price: '$2,950,000',
    image: images[0],
    bedrooms: '5',
    bathrooms: '4',
    area: '4,200 sq ft'
  };
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  }, []);
  
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }, []);
  
  const navigateLightbox = useCallback((direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setLightboxIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else {
      setLightboxIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  }, [images.length]);

  return (
    <section className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main large image */}
          <div 
            className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden mb-4 reveal animate-fade-in"
          >
            <Image
              src={images[activeImage]}
              alt="Property main image"
              fill
              className="object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
              onClick={() => setLightboxOpen(true)}
              priority
            />
            
            {/* Favorite button */}
            <div className="absolute top-4 right-4 z-10">
              <FavoriteButton property={propertyData} size="lg" showText={true} />
            </div>
            
            {/* View gallery button */}
            <button 
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 right-4 bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 16V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              View Gallery
            </button>
          </div>

          {/* Grid of smaller images */}
          <div className="grid grid-cols-5 gap-2 stagger-animate">
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`relative aspect-square rounded-md overflow-hidden cursor-pointer hover-grow reveal animate-fade-in ${index === activeImage ? 'ring-2 ring-burgundy' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                  {index === activeImage && (
                    <div className="w-3 h-3 bg-burgundy rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnail navigation */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative w-24 h-16 rounded-md overflow-hidden cursor-pointer flex-shrink-0 border-2 ${
                activeImage === index ? 'border-burgundy' : 'border-transparent'
              }`}
              onClick={() => setActiveImage(index)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full max-w-6xl h-[80vh] mx-4">
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={closeLightbox}
                className="bg-burgundy rounded-full p-2 text-white hover:bg-opacity-80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="relative w-full h-full">
              <Image
                src={images[lightboxIndex]}
                alt={`Property view ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <button 
                onClick={() => navigateLightbox('prev')}
                className="bg-burgundy rounded-full p-2 text-white hover:bg-opacity-80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button 
                onClick={() => navigateLightbox('next')}
                className="bg-burgundy rounded-full p-2 text-white hover:bg-opacity-80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={`w-3 h-3 rounded-full ${lightboxIndex === index ? 'bg-burgundy' : 'bg-gray-400'}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
