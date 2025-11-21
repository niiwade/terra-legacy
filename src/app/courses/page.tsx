'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserGraduate, FaBook, FaClock } from 'react-icons/fa';

// Course interface
interface Course {
  id: string;
  title: string;
  instructor: string;
  level: string;
  duration: string;
  lectures: number;
  price: string;
  rating: string;
  reviews: number;
  image: string;
  category: string;
  featured: boolean;
  description: string;
  enrollmentStatus: string;
  startDate: string;
}

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
    category: 'Land Ownership',
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
    category: 'Land Ownership',
    featured: true,
    description: 'Master sophisticated techniques for identifying, negotiating, and acquiring high-potential land parcels in competitive markets.',
    enrollmentStatus: 'Open',
    startDate: 'August 1, 2025'
  },
  {
    id: 'c3',
    title: 'Sustainable Land Development',
    instructor: 'Prof. Emily Chen',
    level: 'Intermediate',
    duration: '10 weeks',
    lectures: 40,
    price: '$299',
    rating: '4.7',
    reviews: 76,
    image: '/images/courses/3.jpg',
    category: 'Sustainable Practices',
    featured: false,
    description: 'Navigate sustainable development practices, eco-friendly zoning, and environmentally conscious land utilization.',
    enrollmentStatus: 'Open',
    startDate: 'July 20, 2025'
  },
  {
    id: 'c4',
    title: 'Organic Farming Essentials',
    instructor: 'James Wilson',
    level: 'Beginner',
    duration: '6 weeks',
    lectures: 22,
    price: '$249',
    rating: '4.9',
    reviews: 58,
    image: '/images/courses/4.jpg',
    category: 'Farming',
    featured: false,
    description: 'Learn the fundamentals of organic farming, from soil preparation to crop rotation and sustainable practices.',
    enrollmentStatus: 'Limited Spots',
    startDate: 'August 10, 2025'
  },
  {
    id: 'c5',
    title: 'Vegetable Gardening Mastery',
    instructor: 'Alexandra Davis, CRE',
    level: 'Beginner',
    duration: '8 weeks',
    lectures: 24,
    price: '$179',
    rating: '4.8',
    reviews: 42,
    image: '/images/courses/1.jpg',
    category: 'Gardening',
    featured: true,
    description: 'Complete guide to growing your own vegetables, from planning and planting to harvesting and preservation.',
    enrollmentStatus: 'Open',
    startDate: 'September 1, 2025'
  },
  {
    id: 'c6',
    title: 'Planting Zones Guide',
    instructor: 'Robert Thompson, CPA',
    level: 'Beginner',
    duration: '2 weeks',
    lectures: 8,
    price: 'Free',
    rating: '4.7',
    reviews: 63,
    image: '/images/courses/2.jpg',
    category: 'Free Resources',
    featured: false,
    description: 'Complete guide to understanding planting zones and selecting the right crops for your region.',
    enrollmentStatus: 'Open',
    startDate: 'Available Now'
  },
  {
    id: 'c7',
    title: 'Permaculture Design Course',
    instructor: 'Dr. Lisa Green',
    level: 'Intermediate',
    duration: '8 weeks',
    lectures: 30,
    price: 'Free',
    rating: '4.9',
    reviews: 47,
    image: '/images/courses/3.jpg',
    category: 'Free Resources',
    featured: false,
    description: 'Learn permaculture design principles and create sustainable agricultural systems on your property.',
    enrollmentStatus: 'Open',
    startDate: 'Available Now'
  },
  {
    id: 'c8',
    title: 'Water Conservation & Harvesting',
    instructor: 'Thomas Parker, MBA',
    level: 'Intermediate',
    duration: '6 weeks',
    lectures: 24,
    price: '$229',
    rating: '4.6',
    reviews: 82,
    image: '/images/courses/4.jpg',
    category: 'Sustainable Practices',
    featured: true,
    description: 'Learn advanced water conservation techniques and rainwater harvesting systems for sustainable land management.',
    enrollmentStatus: 'Open',
    startDate: 'July 30, 2025'
  }
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(coursesData);
  const [sortOption, setSortOption] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/public/content?type=courses&limit=20');
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          // Transform API data to match component structure
          const transformedCourses: Course[] = data.data.map((item: {
            id: string;
            title: string;
            description: string | null;
            instructor: string | null;
            price: string;
            imageUrl: string | null;
            category: string | null;
            isFeatured: boolean;
            duration: string | null;
            level: string | null;
            lectures?: number | null;
            rating?: number | null;
            reviews?: number | null;
            enrollmentStatus?: string | null;
            startDate?: string | null;
          }) => ({
            id: item.id,
            title: item.title,
            instructor: item.instructor || 'Terra Legacy Instructor',
            level: item.level || 'Beginner',
            duration: item.duration || '6 weeks',
            lectures: item.lectures || 24,
            price: item.price === '0' ? 'Free' : (item.price.startsWith('$') ? item.price : `$${item.price}`),
            rating: item.rating ? item.rating.toString() : '4.5',
            reviews: item.reviews || 0,
            image: item.imageUrl || '/images/courses/1.jpg',
            category: item.category || 'Land Ownership',
            featured: item.isFeatured,
            description: item.description || '',
            enrollmentStatus: item.enrollmentStatus || 'Open',
            startDate: item.startDate || 'Coming Soon',
          }));
          setCourses(transformedCourses);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  
  // Filter courses function wrapped in useCallback to prevent unnecessary re-renders
  const filterCourses = useCallback(() => {
    let filtered = [...courses];

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Apply sorting
    switch(sortOption) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.price === 'Free' ? 0 : parseFloat(a.price.replace('$', ''));
          const priceB = b.price === 'Free' ? 0 : parseFloat(b.price.replace('$', ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.price === 'Free' ? 0 : parseFloat(a.price.replace('$', ''));
          const priceB = b.price === 'Free' ? 0 : parseFloat(b.price.replace('$', ''));
          return priceB - priceA;
        });
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
  }, [selectedCategory, sortOption, courses]);
  
  // Apply filters whenever category or sort option changes
  useEffect(() => {
    filterCourses();
  }, [filterCourses]);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Coming Soon Banner */}
      <section className="bg-sunflower text-earth py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center">
            <p className="text-lg font-bold">🚀 Coming Soon - Our comprehensive course platform is launching soon!</p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-mist text-earth py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terra Legacy Courses</h1>
            <p className="text-xl mb-8">Comprehensive education for land investment success</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-forest text-mist px-6 py-3 rounded-full font-medium hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
                Browse All Courses
              </button>
              <button className="bg-fern text-mist px-6 py-3 rounded-full font-medium hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
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
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'All' ? 'bg-forest text-mist' : 'bg-gray-100 text-gray-800'}`}
              >
                All Courses
              </button>
              <button
                onClick={() => setSelectedCategory('Farming')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'Farming' ? 'bg-forest text-mist' : 'bg-gray-100 text-gray-800'}`}
              >
                Farming
              </button>
              <button
                onClick={() => setSelectedCategory('Gardening')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'Gardening' ? 'bg-forest text-mist' : 'bg-gray-100 text-gray-800'}`}
              >
                Gardening
              </button>
              <button
                onClick={() => setSelectedCategory('Land Ownership')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'Land Ownership' ? 'bg-forest text-mist' : 'bg-gray-100 text-gray-800'}`}
              >
                Land Ownership
              </button>
              <button
                onClick={() => setSelectedCategory('Sustainable Practices')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'Sustainable Practices' ? 'bg-forest text-mist' : 'bg-gray-100 text-gray-800'}`}
              >
                Sustainable Practices
              </button>
              <button
                onClick={() => setSelectedCategory('Free Resources')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'Free Resources' ? 'bg-sunflower text-earth' : 'bg-gray-100 text-gray-800'}`}
              >
                Free Resources
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
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3c4b33]"></div>
            </div>
          ) : (
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
          )}
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
