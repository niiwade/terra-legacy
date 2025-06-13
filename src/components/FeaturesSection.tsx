
import Link from 'next/link';

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-start mb-10">
          <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
          <p className="text-gray-600">Explore our handpicked selection of premium properties available for sale and rent</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Property Card 1 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2">Modern Luxury Villa</h3>
              <p className="text-gray-600 text-sm mb-4">123 Luxury Lane, Beverly Hills, CA</p>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="ml-1 text-xs">4 Beds</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="ml-1 text-xs">3 Baths</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    <span className="ml-1 text-xs">3,500 sqft</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-burgundy">$2,500,000</p>
                <Link href="/property/1" className="bg-burgundy text-white px-3 py-1 rounded text-sm hover:bg-opacity-90">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
          {/* Property Card 2 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600"></div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2">Metropolitan Penthouse</h3>
              <p className="text-gray-600 text-sm mb-4">456 City Center, New York, NY</p>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="ml-1 text-xs">3 Beds</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="ml-1 text-xs">2 Baths</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    <span className="ml-1 text-xs">2,200 sqft</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-burgundy">$1,800,000</p>
                <Link href="/property/2" className="bg-burgundy text-white px-3 py-1 rounded text-sm hover:bg-opacity-90">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
          {/* Property Card 3 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600"></div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2">Modern Sky Offices</h3>
              <p className="text-gray-600 text-sm mb-4">789 Business Park, Chicago, IL</p>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="ml-1 text-xs">Office</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-1 text-xs">24/7 Access</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    <span className="ml-1 text-xs">10,000 sqft</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-burgundy">$3,500,000</p>
                <Link href="/property/3" className="bg-burgundy text-white px-3 py-1 rounded text-sm hover:bg-opacity-90">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-right">
          <Link href="/listings" className="text-burgundy font-medium hover:underline">
            View all properties →
          </Link>
        </div>
      </div>
    </section>
  );
}
