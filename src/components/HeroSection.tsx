'use client'
import Image from 'next/image';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function HeroSection() {
  const [priceMin, setPriceMin] = useState('0');
  const [priceMax, setPriceMax] = useState('5,000');
  const [activeTab, setActiveTab] = useState('All');

  return (
    <section className="relative w-full min-h-[95vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black/40">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/herobg.mp4" type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <Image 
            src="/images/modern-house.jpg" 
            alt="Modern real estate properties" 
            fill 
            priority
            className="object-cover"
          />
        </video>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 z-10 flex flex-col lg:flex-row items-center justify-between gap-12 py-16">
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 text-left">
          <h2 className="text-2xl font-medium text-white mb-2">THE BEST WAY TO</h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Find your properties
          </h1>
          <p className="text-white mb-8 text-2xl">
            Search properties for sale and to rent in the US
          </p>
        </div>
        
        {/* Right side - Search form */}
        <div className="w-full lg:w-5/12 bg-white rounded-lg shadow-lg p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {['All', 'For Sale', 'For Rent'].map((tab) => (
              <button
                key={tab}
                className={`pb-3 px-4 text-sm font-medium ${
                  activeTab === tab 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Search form */}
          <form className="space-y-4">
            {/* Property Type */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option>Any</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Condo</option>
                <option>Villa</option>
              </select>
              <div className="absolute right-3 top-[38px] pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option>Any Location</option>
                <option>Texas</option>
                <option>Florida</option>
                <option>Delaware</option>
                <option>Georgia</option>
              </select>
              <div className="absolute right-3 top-[38px] pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex items-center">
                <input 
                  type="text" 
                  value={`$${priceMin}`} 
                  onChange={(e) => setPriceMin(e.target.value.replace('$', ''))}
                  className="w-1/2 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
                <span className="px-4 py-3 bg-gray-100 text-gray-500">-</span>
                <input 
                  type="text" 
                  value={`$${priceMax}`} 
                  onChange={(e) => setPriceMax(e.target.value.replace('$', ''))}
                  className="w-1/2 p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>
            
            {/* Advanced button */}
            
            
            {/* Search button */}
            <button 
              type="submit"
              className="w-full bg-gray-900 text-white p-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <FaSearch />
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
