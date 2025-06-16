'use client';

import Link from 'next/link';

export default function EventNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">Sorry, the event you are looking for does not exist or has been removed.</p>
        
        <Link 
          href="/community" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
}
