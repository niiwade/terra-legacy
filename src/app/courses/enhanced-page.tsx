'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserGraduate, FaBook, FaClock, FaLock, FaCrown } from 'react-icons/fa';
import { useCourses } from '@/hooks/useFrappeAPI';
import { useAuth } from '@/contexts/AuthContext';
import type { Course } from '@/lib/frappe-api';

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-400" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
      ))}
    </div>
  );
};

// Course access badge component
const CourseAccessBadge = ({ course, userMembership }: { 
  course: Course; 
  userMembership: any; 
}) => {
  const canAccess = checkCourseAccess(course, userMembership);
  
  if (canAccess) {
    return (
      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
        INCLUDED
      </div>
    );
  }
  
  if (course.price === 0) {
    return (
      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
        FREE
      </div>
    );
  }
  
  return (
    <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
      <FaLock className="mr-1" size={10} />
      PREMIUM
    </div>
  );
};

// Check if user can access course based on membership
const checkCourseAccess = (course: Course, membership: any): boolean => {
  if (course.price === 0) return true; // Free courses
  if (!membership) return false;
  
  // Free membership gets Permaculture course
  if (membership.type === 'free' && course.title.toLowerCase().includes('permaculture')) {
    return true;
  }
  
  // Gold and Platinum memberships get premium courses
  if (membership.type === 'gold' || membership.type === 'platinum') {
    return course.price <= (membership.type === 'gold' ? 50 : 100); // Price limits
  }
  
  return false;
};

export default function EnhancedCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  
  const { user, isAuthenticated, membership } = useAuth();
  const { data: courses, loading, error } = useCourses();
  
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  
  // Filter courses function
  const filterCourses = useCallback(() => {
    if (!courses) return;
    
    let filtered = [...courses];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'featured':
      default:
        // Sort by featured status and then by date
        filtered.sort((a, b) => {
          if (a.status === 'Featured' && b.status !== 'Featured') return -1;
          if (b.status === 'Featured' && a.status !== 'Featured') return 1;
          return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
        });
        break;
    }
    
    setFilteredCourses(filtered);
  }, [courses, selectedCategory, sortOption]);
  
  // Apply filters whenever data changes
  useEffect(() => {
    filterCourses();
  }, [filterCourses]);
  
  // Get unique categories from courses
  const categories = courses ? [...new Set(courses.map(course => course.category))] : [];
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-forest mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading courses: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-forest text-mist px-6 py-3 rounded-full font-medium hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-mist text-black py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terra Legacy Courses</h1>
            <p className="text-xl mb-8">Comprehensive education for land investment success and sustainable living</p>
            
            {/* Membership Status */}
            {isAuthenticated && membership && (
              <div className="bg-white rounded-lg p-4 mb-8 border border-gray-200">
                <div className="flex items-center">
                  {membership.type === 'platinum' && <FaCrown className="text-yellow-500 mr-2" />}
                  {membership.type === 'gold' && <FaCrown className="text-yellow-400 mr-2" />}
                  <span className="font-medium capitalize">{membership.type} Membership</span>
                  <span className="ml-auto text-sm text-gray-600">
                    {membership.features.coursesIncluded} courses included
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              <Link href="#courses" className="bg-forest text-mist px-6 py-3 rounded-full font-medium hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
                Browse All Courses
              </Link>
              <Link href="/courses?filter=free" className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium hover:bg-forest hover:text-mist transition-all duration-300">
                View Free Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter and Sort Section */}
      <section id="courses" className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSelectedCategory('All')} 
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'All' ? 'bg-forest text-mist' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                All Courses ({courses?.length || 0})
              </button>
              {categories.map(category => (
                <button 
                  key={category}
                  onClick={() => setSelectedCategory(category)} 
                  className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === category ? 'bg-forest text-mist' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {category} ({courses?.filter(c => c.category === category).length || 0})
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
              <select 
                id="sort" 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-forest"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No courses found for the selected filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCourses.map((course, index) => (
                <div 
                  key={course.name}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative h-48">
                    <Image 
                      src={course.image || '/images/courses/default.jpg'} 
                      alt={course.title}
                      fill
                      style={{objectFit: 'cover'}}
                      className="transition-transform hover:scale-105"
                    />
                    <CourseAccessBadge course={course} userMembership={membership} />
                    {course.status === 'Featured' && (
                      <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {course.category}
                      </span>
                      <span className="text-gray-600 text-sm font-bold">
                        {course.price === 0 ? 'FREE' : `$${course.price}`}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{course.title}</h3>
                    
                    <div className="flex items-center mb-2">
                      <FaUserGraduate className="text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">{course.instructor}</span>
                    </div>
                    
                    {course.rating && (
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <StarRating rating={course.rating} />
                          <span className="text-sm text-gray-600 ml-1">
                            {course.rating} ({course.reviews_count || 0})
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <FaBook className="mr-1" />
                        <span>{course.total_lessons} lessons</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${
                        course.enrollment_status === 'Open' ? 'text-green-600' : 
                        course.enrollment_status === 'Limited' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {course.enrollment_status}
                      </span>
                      <Link 
                        href={`/courses/${course.name}`} 
                        className="text-forest hover:text-forest/80 font-medium text-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Membership CTA */}
      {!isAuthenticated && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <div className="max-w-3xl mx-auto" data-aos="fade-up">
              <h2 className="text-3xl font-bold mb-4">Unlock Premium Courses</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join Terra Legacy with a membership to access premium courses and exclusive content.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/auth/register" className="bg-fern text-mist px-8 py-3 rounded-full font-medium hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
                  Start Free Trial
                </Link>
                <Link href="/membership" className="bg-transparent border-2 border-fern text-fern px-8 py-3 rounded-full font-medium hover:bg-fern hover:text-mist transition-all duration-300">
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter Section */}
      <section className="py-16 bg-forest text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">Subscribe to our newsletter for the latest course updates and exclusive learning resources.</p>
            
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button 
                type="submit" 
                className="bg-mist text-forest px-6 py-3 rounded-md font-medium hover:bg-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}