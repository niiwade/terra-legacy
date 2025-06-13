'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface VirtualTourProps {
  panoramaImages: string[];
}

export default function VirtualTour({ panoramaImages }: VirtualTourProps): React.ReactElement {
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const lastRotationRef = useRef(0);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Handle mouse/touch events for dragging
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    
    // Get client X based on event type
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
    lastRotationRef.current = rotation;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    // Get client X based on event type
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startXRef.current;
    
    // Calculate new rotation (sensitivity factor of 0.5)
    const newRotation = (lastRotationRef.current + deltaX * 0.5) % 360;
    setRotation(newRotation);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [activeImage]);

  return (
    <section className="w-full bg-black py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Virtual Tour</h2>
          <p className="text-gray-300">
            Explore this property in 360° - drag to rotate or use the controls below.
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="relative w-full h-[500px] rounded-xl overflow-hidden bg-charcoal mb-6"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Panorama image with rotation effect */}
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{ 
              opacity: isLoading ? 0 : 1,
              transform: `perspective(1000px) rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            <Image
              src={panoramaImages[activeImage]}
              alt="360° view of property"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-burgundy border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white">Loading panorama...</p>
              </div>
            </div>
          )}
          
          {/* Navigation compass */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
              <path d="M12 2V4" stroke="currentColor" strokeWidth="1" />
              <path d="M12 20V22" stroke="currentColor" strokeWidth="1" />
              <path d="M2 12H4" stroke="currentColor" strokeWidth="1" />
              <path d="M20 12H22" stroke="currentColor" strokeWidth="1" />
              <path d="M12 12L16 8" stroke="#E63946" strokeWidth="2" strokeLinecap="round" transform={`rotate(${rotation}, 12, 12)`} />
            </svg>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {panoramaImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveImage(index);
                  setIsLoading(true);
                }}
                className={`w-10 h-10 rounded-md flex items-center justify-center ${
                  activeImage === index ? 'bg-burgundy' : 'bg-charcoal hover:bg-gray-800'
                }`}
              >
                <span className="text-white">{index + 1}</span>
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                autoRotate ? 'bg-burgundy' : 'bg-charcoal hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" stroke="currentColor" strokeWidth="2" />
                <path d="M16 12L10 16V8L16 12Z" fill="currentColor" />
              </svg>
              <span className="text-white">{autoRotate ? 'Stop' : 'Auto-Rotate'}</span>
            </button>
            
            <button
              onClick={() => setRotation(0)}
              className="px-4 py-2 rounded-md bg-charcoal hover:bg-gray-800 flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" />
                <path d="M4 12L8 8" stroke="currentColor" strokeWidth="2" />
                <path d="M4 12L8 16" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="text-white">Reset</span>
            </button>
            
            <button
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else if (containerRef.current) {
                  containerRef.current.requestFullscreen();
                }
              }}
              className="px-4 py-2 rounded-md bg-charcoal hover:bg-gray-800 flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14H8V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 10H16V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 4H20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 20H4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-white">Fullscreen</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
