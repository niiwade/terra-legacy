'use client';

import { useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaDownload, FaSearch } from 'react-icons/fa';

// Define certificate type
type Certificate = {
  id: string;
  courseId: string;
  title: string;
  instructor: string;
  issueDate: string;
  certificateId: string;
  image: string;
};

// Mock certificates data - in a real app, this would come from an API or database
const certificatesData: Certificate[] = [
  {
    id: 'cert-1',
    courseId: 'c2',
    title: 'Advanced Land Acquisition Strategies',
    instructor: 'Michael Rodriguez, MBA',
    issueDate: 'June 10, 2025',
    certificateId: 'TERRA-C2-67890',
    image: '/images/courses/course2.jpg'
  },
  {
    id: 'cert-2',
    courseId: 'c7',
    title: 'Land Investment Financing Options',
    instructor: 'Jennifer Wilson, CFA',
    issueDate: 'May 25, 2025',
    certificateId: 'TERRA-C7-24680',
    image: '/images/courses/course3.jpg'
  }
];

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter certificates based on search term
  const filteredCertificates = certificatesData.filter((cert: Certificate) => 
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="mt-2 text-gray-600">View and download your course completion certificates</p>
        </div>
        
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-burgundy"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>
        
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <h2 className="text-xl font-medium text-gray-900">No certificates found</h2>
            <p className="mt-2 text-gray-600">
              {searchTerm ? 'Try a different search term' : 'Complete courses to earn certificates'}
            </p>
            {!searchTerm && (
              <Link 
                href="/courses" 
                className="mt-6 inline-block bg-burgundy text-white px-6 py-3 rounded-md hover:bg-burgundy/90 transition-colors"
              >
                Browse Courses
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((certificate: Certificate) => (
              <div key={certificate.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    style={{objectFit: 'cover'}}
                    className="transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg font-bold">{certificate.title}</h3>
                    <p className="text-sm opacity-90">Instructor: {certificate.instructor}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Issue Date:</span>
                      <span className="font-medium">{certificate.issueDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Certificate ID:</span>
                      <span className="font-medium">{certificate.certificateId}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/dashboard/courses/${certificate.courseId}/certificate`}
                      className="text-burgundy hover:text-burgundy/80 font-medium"
                    >
                      View Certificate
                    </Link>
                    
                    <button 
                      className="flex items-center text-gray-700 hover:text-gray-900"
                      aria-label="Download certificate"
                    >
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
