import React from 'react';

export default function SearchHero(): React.ReactElement {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
            Find Your Dream Property
          </h1>
          <p className="text-black max-w-3xl text-lg">
            Discover your perfect home from our extensive collection of premium properties. Our experts are ready to help you find the property that meets all your requirements.
          </p>
        </div>
        
        <div className="bg-charcoal bg-opacity-50 p-4 md:p-6 rounded-xl mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input 
                type="text" 
                placeholder="Search for a Property" 
                className="w-full px-4 py-3 bg-white border border-gray-700 rounded-lg text-black focus:outline-none focus:border-burgundy"
              />
            </div>
            <button className="bg-burgundy hover:bg-opacity-90 text-black px-6 py-3 rounded-lg transition-colors">
              Find Properties
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-6 md:gap-12 justify-between mb-8">
          <FilterButton icon={<LocationIcon />} label="Location" />
          <FilterButton icon={<PropertyIcon />} label="Property Type" />
          <FilterButton icon={<PriceIcon />} label="Price Range" />
          <FilterButton icon={<AreaIcon />} label="Floor Area" />
          <FilterButton icon={<MoreIcon />} label="More" />
        </div>
      </div>
    </section>
  );
}

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
}

function FilterButton({ icon, label }: FilterButtonProps): React.ReactElement {
  return (
    <button className="flex items-center gap-2 text-black hover:text-burgundy transition-colors">
      <div className="text-burgundy">
        {icon}
      </div>
      <span>{label}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

// Icon Components
function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PropertyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  );
}
