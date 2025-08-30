'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserGraduate, FaBook, FaClock } from 'react-icons/fa';

// Star rating component
const StarRating = ({ rating }: { rating: string }) => {
  const ratingNum = parseFloat(rating);
  const fullStars = Math.floor(ratingNum);
  const hasHalfStar = ratingNum - fullStars >= 0.5;
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

// Course data
const coursesData = [
  {
    id: 'c1',
    title: 'Land Investment Fundamentals',
    instructor: 'Dr. Sarah Johnson',
    level: 'Beginner',
    duration: '6 weeks',
    lectures: 24,
    price: '$199',
    rating: '4.9',
    reviews: 128,
    image: '/images/courses/1.jpg',
    category: 'Fundamentals',
    featured: true,
    description: 'Learn the essential principles of land investment, including market analysis, valuation techniques, and risk assessment strategies.',
    enrollmentStatus: 'Open',
    startDate: 'July 15, 2025'
  },
  {
    id: 'c2',
    title: 'Advanced Land Acquisition Strategies',
    instructor: 'Michael Rodriguez, MBA',
    level: 'Advanced',
    duration: '8 weeks',
    lectures: 32,
    price: '$349',
    rating: '4.8',
    reviews: 94,
    image: '/images/courses/2.jpg',
    category: 'Acquisition',
    featured: true,
    description: 'Master sophisticated techniques for identifying, negotiating, and acquiring high-potential land parcels in competitive markets.',
    enrollmentStatus: 'Open',
    startDate: 'August 1, 2025'
  },
  {
    id: 'c3',
    title: 'Land Development and Zoning',
    instructor: 'Prof. Emily Chen',
    level: 'Intermediate',
    duration: '10 weeks',
    lectures: 40,
    price: '$299',
    rating: '4.7',
    reviews: 76,
    image: '/images/courses/3.jpg',
    category: 'Development',
    featured: false,
    description: 'Navigate the complex landscape of zoning regulations, permits, and development planning for maximum land utilization.',
    enrollmentStatus: 'Open',
    startDate: 'July 20, 2025'
  },
  {
    id: 'c4',
    title: 'Rural Land Investment Masterclass',
    instructor: 'James Wilson',
    level: 'Intermediate',
    duration: '6 weeks',
    lectures: 22,
    price: '$249',
    rating: '4.9',
    reviews: 58,
    image: '/images/courses/4.jpg',
    category: 'Rural',
    featured: false,
    description: 'Specialized strategies for identifying, acquiring, and developing rural land parcels with high ROI potential.',
    enrollmentStatus: 'Limited Spots',
    startDate: 'August 10, 2025'
  },
  {
    id: 'c5',
    title: 'Commercial Land Investment',
    instructor: 'Alexandra Davis, CRE',
    level: 'Advanced',
    duration: '12 weeks',
    lectures: 48,
    price: '$499',
    rating: '4.8',
    reviews: 42,
    image: '/images/courses/1.jpg',
    category: 'Commercial',
    featured: true,
    description: 'Comprehensive guide to commercial land investment, including market analysis, financing strategies, and development planning.',
    enrollmentStatus: 'Open',
    startDate: 'September 1, 2025'
  },
  {
    id: 'c6',
    title: 'Land Investment Tax Strategies',
    instructor: 'Robert Thompson, CPA',
    level: 'Intermediate',
    duration: '4 weeks',
    lectures: 16,
    price: '$179',
    rating: '4.7',
    reviews: 63,
    image: '/images/courses/2.jpg',
    category: 'Finance',
    featured: false,
    description: 'Optimize your land investments with tax-efficient strategies, deductions, and long-term planning techniques.',
    enrollmentStatus: 'Open',
    startDate: 'July 25, 2025'
  },
  {
    id: 'c7',
    title: 'Sustainable Land Development',
    instructor: 'Dr. Lisa Green',
    level: 'Intermediate',
    duration: '8 weeks',
    lectures: 30,
    price: '$279',
    rating: '4.9',
    reviews: 47,
    image: '/images/courses/3.jpg',
    category: 'Sustainability',
    featured: false,
    description: 'Learn eco-friendly development practices that maximize both environmental sustainability and investment returns.',
    enrollmentStatus: 'Open',
    startDate: 'August 15, 2025'
  },
  {
    id: 'c8',
    title: 'Land Investment Financing',
    instructor: 'Thomas Parker, MBA',
    level: 'Beginner',
    duration: '6 weeks',
    lectures: 24,
    price: '$229',
    rating: '4.6',
    reviews: 82,
    image: '/images/courses/4.jpg',
    category: 'Finance',
    featured: true,
    description: 'Explore financing options for land investments, from traditional loans to creative funding strategies and partnerships.',
    enrollmentStatus: 'Open',
    startDate: 'July 30, 2025'
  }
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [sortOption, setSortOption] = useState('featured');
  
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  
  // Filter courses function wrapped in useCallback to prevent unnecessary re-renders
  const filterCourses = useCallback(() => {
    let filtered = [...coursesData];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        break;
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredCourses(filtered);
  }, [selectedCategory, sortOption]);
  
  // Apply filters whenever category or sort option changes
  useEffect(() => {
    filterCourses();
  }, [filterCourses]);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-pink-200 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Terra Legacy Courses</h1>
            <p className="text-xl mb-8 text-black">Comprehensive education for land investment success</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-forest text-mist px-6 py-3 rounded-full font-medium hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
                Browse All Courses
              </button>
              <button className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium hover:bg-forest hover:text-mist transition-all duration-300">
                View Free Resources
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter and Sort Section */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSelectedCategory('All')} 
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                All Courses
              </button>
              <button 
                onClick={() => setSelectedCategory('Fundamentals')} 
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'Fundamentals' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                Fundamentals
              </button>
              <button 
                onClick={() => setSelectedCategory('Acquisition')} 
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'Acquisition' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                Acquisition
              </button>
              <button 
                onClick={() => setSelectedCategory('Development')} 
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'Development' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                Development
              </button>
              <button 
                onClick={() => setSelectedCategory('Finance')} 
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'Finance' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                Finance
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
              <select 
                id="sort" 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCourses.map((course, index) => (
              <div 
                key={course.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-48">
                  <Image 
                    src={course.image} 
                    alt={course.title}
                    fill
                    style={{objectFit: 'cover'}}
                    className="transition-transform hover:scale-105"
                  />
                  {course.featured && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 m-2 rounded">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {course.category}
                    </span>
                    <span className="text-gray-600 text-sm">{course.price}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{course.title}</h3>
                  
                  <div className="flex items-center mb-2">
                    <FaUserGraduate className="text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <StarRating rating={course.rating} />
                      <span className="text-sm text-gray-600 ml-1">{course.rating} ({course.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FaBook className="mr-1" />
                      <span>{course.lectures} lectures</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-green-600">{course.enrollmentStatus}</span>
                    <Link href={`/courses/${course.id}`} className="text-black hover:text-gray-700 font-medium text-sm">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg text-gray-600 mb-8">Join thousands of successful investors who have transformed their approach to land investment through our expert-led courses.</p>
            <button className="bg-fern text-mist px-8 py-3 rounded-full font-medium hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
              Enroll Now
            </button>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">Subscribe to our newsletter for the latest course updates and exclusive learning resources.</p>
            
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
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
