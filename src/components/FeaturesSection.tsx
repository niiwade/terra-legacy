'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Mock property data
const allProperties = [
  // Page 1
  [
    {
      id: '1',
      image: '/images/properties/1.jpg',
      title: 'House on the Hollywood',
      location: '374 Johnson Ave',
      price: '$4,600',
      beds: '5 Beds',
      baths: '2 Baths',
      area: '200 sqft'
    },
    {
      id: '2',
      image: '/images/properties/2.jpg',
      title: 'Comfortable Villa Green',
      location: '176 Broadway, Brooklyn',
      price: '$5,800',
      beds: '5 Beds',
      baths: '3 Baths',
      area: '600 sqft'
    },
    {
      id: '3',
      image: '/images/properties/3.jpg',
      title: 'Quality House For Sale',
      location: '673 Bedford Ave',
      price: '$2,500',
      beds: '10 Beds',
      baths: '2 Baths',
      area: '500 sqft'
    }
  ],
  // Page 2
  [
    {
      id: '4',
      image: '/images/properties/4.jpg',
      title: 'Modern Downtown Loft',
      location: '123 Main Street',
      price: '$3,200',
      beds: '2 Beds',
      baths: '2 Baths',
      area: '1,200 sqft'
    },
    {
      id: '5',
      image: '/images/properties/5.jpg',
      title: 'Seaside Retreat',
      location: '456 Ocean Drive',
      price: '$6,500',
      beds: '4 Beds',
      baths: '3 Baths',
      area: '2,400 sqft'
    },
    {
      id: '6',
      image: '/images/properties/6.jpg',
      title: 'Urban Penthouse',
      location: '789 Skyline Ave',
      price: '$7,800',
      beds: '3 Beds',
      baths: '3 Baths',
      area: '1,800 sqft'
    }
  ],
  // Page 3
  [
    {
      id: '7',
      image: '/images/properties/7.jpg',
      title: 'Country Estate',
      location: '234 Rural Route',
      price: '$1,200,000',
      beds: '6 Beds',
      baths: '4 Baths',
      area: '4,500 sqft'
    },
    {
      id: '8',
      image: '/images/properties/8.jpg',
      title: 'City View Apartment',
      location: '567 Downtown Blvd',
      price: '$3,900',
      beds: '2 Beds',
      baths: '1 Bath',
      area: '950 sqft'
    },
    {
      id: '9',
      image: '/images/properties/9.jpg',
      title: 'Historic Brownstone',
      location: '890 Heritage St',
      price: '$4,200',
      beds: '4 Beds',
      baths: '2 Baths',
      area: '2,200 sqft'
    }
  ],
  // Pages 4 and 5 with similar structure
  [
    {
      id: '10',
      image: '/images/properties/10.jpg',
      title: 'Mountain Cabin',
      location: '123 Alpine Way',
      price: '$2,800',
      beds: '3 Beds',
      baths: '2 Baths',
      area: '1,400 sqft'
    },
    {
      id: '11',
      image: '/images/properties/11.jpg',
      title: 'Lakefront Property',
      location: '456 Shoreline Dr',
      price: '$5,200',
      beds: '4 Beds',
      baths: '3 Baths',
      area: '2,800 sqft'
    },
    {
      id: '12',
      image: '/images/properties/12.jpg',
      title: 'Desert Oasis',
      location: '789 Cactus Rd',
      price: '$3,600',
      beds: '3 Beds',
      baths: '2 Baths',
      area: '1,600 sqft'
    }
  ],
  [
    {
      id: '13',
      image: '/images/properties/13.jpg',
      title: 'Suburban Family Home',
      location: '321 Maple Street',
      price: '$4,100',
      beds: '5 Beds',
      baths: '3 Baths',
      area: '2,500 sqft'
    },
    {
      id: '14',
      image: '/images/properties/14.jpg',
      title: 'Studio Apartment',
      location: '654 Downtown Ave',
      price: '$1,800',
      beds: '1 Bed',
      baths: '1 Bath',
      area: '600 sqft'
    },
    {
      id: '15',
      image: '/images/properties/15.jpg',
      title: 'Executive Townhouse',
      location: '987 Business Park',
      price: '$4,900',
      beds: '3 Beds',
      baths: '2.5 Baths',
      area: '2,100 sqft'
    }
  ]
];

export default function FeaturesSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [properties, setProperties] = useState(allProperties[0]);
  
  // Initialize with the first page of properties
  useEffect(() => {
    setProperties(allProperties[currentPage]);
    AOS.init();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < allProperties.length) {
      setCurrentPage(pageIndex);
    }
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-black">Discover Our Featured Listings</h2>
            <p className="text-gray-300">Aliquam lacinia diam quis lacus euismod</p>
          </div>
          <Link href="/listings" className="text-burgundy font-medium hover:underline flex items-center mt-4 md:mt-0">
            See All Properties
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              className="bg-charcoal rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-burgundy hover:translate-y-[-5px]" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="relative">
                <div className="relative w-full h-64 overflow-hidden">
                  <Image 
                    src={property.image} 
                    alt={property.title} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-burgundy text-black text-xs font-medium px-2 py-1 rounded">
                  FEATURED
                </div>
                <div className="absolute bottom-4 left-4 bg-burgundy text-black text-lg font-bold px-3 py-1 rounded">
                  {property.price}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-2">{property.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{property.location}</p>
                
                <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-black text-sm">
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center text-black text-sm">
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center text-black text-sm">
                      <span>{property.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-3">
            {allProperties.map((_, index) => (
              <button 
                key={index}
                onClick={() => handlePageChange(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${currentPage === index ? 'bg-burgundy w-4' : 'bg-gray-600'}`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
