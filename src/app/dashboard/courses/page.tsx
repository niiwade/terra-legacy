'use client';

import { useState,}from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlay, FaCertificate } from 'react-icons/fa';
// This would come from a user's enrollment data in a real application
// For now, we'll mock this data
const enrolledCoursesData = [
  {
    id: 'c1',
    title: 'Land Investment Fundamentals',
    instructor: 'Dr. Sarah Johnson',
    image: '/images/courses/course1.jpg',
    progress: 35, // percentage
    lastAccessed: 'Module 2: Land Valuation Techniques',
    completedModules: ['Introduction to Land Investment'],
    certificateEarned: false
  },
  {
    id: 'c2',
    title: 'Advanced Land Acquisition Strategies',
    instructor: 'Michael Rodriguez, MBA',
    image: '/images/courses/course2.jpg',
    progress: 100, // percentage
    lastAccessed: 'Module 5: Negotiation Mastery',
    completedModules: [
      'Advanced Market Analysis', 
      'Off-Market Property Sourcing', 
      'Due Diligence Masterclass',
      'Creative Financing Structures',
      'Negotiation Mastery'
    ],
    certificateEarned: true
  }
];

export default function EnrolledCoursesPage() {
  const [enrolledCourses] = useState(enrolledCoursesData);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="mt-2 text-gray-600">Continue your learning journey</p>
        </div>
        
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <h2 className="text-xl font-medium text-gray-900">You havent enrolled in any courses yet</h2>
            <p className="mt-2 text-gray-600">Browse our course catalog to find courses that interest you</p>
            <Link 
              href="/courses" 
              className="mt-6 inline-block bg-burgundy text-white px-6 py-3 rounded-md hover:bg-burgundy/90 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    style={{objectFit: 'cover'}}
                    className="transition-transform hover:scale-105"
                  />
                  {course.certificateEarned && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full">
                      <FaCertificate size={20} />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">Instructor: {course.instructor}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-burgundy h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Last accessed:</span> {course.lastAccessed}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/dashboard/courses/${course.id}`}
                      className="inline-flex items-center bg-burgundy text-black px-4 py-2 rounded-md hover:bg-burgundy/90 transition-colors"
                    >
                      <FaPlay className="mr-2" size={14} />
                      Continue Learning
                    </Link>
                    
                    {course.certificateEarned && (
                      <Link 
                        href={`/dashboard/courses/${course.id}/certificate`}
                        className="inline-flex items-center text-green-600 hover:text-green-800"
                      >
                        <FaCertificate className="mr-1" size={16} />
                        View Certificate
                      </Link>
                    )}
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
