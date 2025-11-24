'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserGraduate, FaBook, FaClock, FaChalkboardTeacher, FaCalendarAlt, FaCheck } from 'react-icons/fa';

// Import course data from the courses page
// In a real application, this would be fetched from an API or database

// Star Rating Component
function StarRating({ rating }: { rating: string }) {
  const ratingNum = parseFloat(rating);
  const fullStars = Math.floor(ratingNum);
  const hasHalfStar = ratingNum % 1 >= 0.5;
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
}
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
    image: '/images/courses/course1.jpg',
    category: 'Fundamentals',
    featured: true,
    description: 'Learn the essential principles of land investment, including market analysis, valuation techniques, and risk assessment strategies.',
    enrollmentStatus: 'Open',
    startDate: 'July 15, 2025',
    fullDescription: 'This comprehensive course covers all the fundamental aspects of land investment that every aspiring investor needs to know. From understanding market trends to performing accurate valuations, you\'ll gain the knowledge and confidence to make informed investment decisions. The course includes real-world case studies, interactive exercises, and expert interviews to provide a well-rounded educational experience.',
    whatYouWillLearn: [
      'Identify high-potential land investment opportunities',
      'Perform accurate land valuations using multiple methods',
      'Understand zoning regulations and their impact on land value',
      'Assess and mitigate investment risks',
      'Navigate the land acquisition process from start to finish',
      'Create a strategic land investment plan'
    ],
    courseContent: [
      {
        title: 'Introduction to Land Investment',
        lessons: ['Understanding the Land Market', 'Types of Land Investments', 'Investment Goals and Strategies']
      },
      {
        title: 'Land Valuation Techniques',
        lessons: ['Comparative Market Analysis', 'Income Approach', 'Cost Approach', 'Residual Valuation Method']
      },
      {
        title: 'Due Diligence and Risk Assessment',
        lessons: ['Title Research', 'Environmental Assessments', 'Zoning and Regulations', 'Infrastructure Analysis']
      },
      {
        title: 'Acquisition Strategies',
        lessons: ['Direct Purchase', 'Options and Rights', 'Partnerships and Joint Ventures', 'Creative Financing']
      },
      {
        title: 'Investment Management',
        lessons: ['Short-term vs. Long-term Strategies', 'Passive Income Opportunities', 'Exit Strategies', 'Portfolio Diversification']
      }
    ],
    instructorBio: 'Dr. Sarah Johnson has over 15 years of experience in real estate investment and land development. She holds a Ph.D. in Urban Planning and has successfully managed a portfolio of land investments worth over $50 million. As a former consultant for major development firms, she brings practical insights and proven strategies to her teaching.'
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
    image: '/images/courses/course2.jpg',
    category: 'Acquisition',
    featured: true,
    description: 'Master sophisticated techniques for identifying, negotiating, and acquiring high-potential land parcels in competitive markets.',
    enrollmentStatus: 'Open',
    startDate: 'August 1, 2025',
    fullDescription: 'Take your land acquisition skills to the next level with this advanced course designed for experienced investors. Learn how to identify undervalued properties, negotiate complex deals, and structure acquisitions for maximum return on investment. This course provides in-depth analysis of market dynamics and advanced strategies used by successful land investors.',
    whatYouWillLearn: [
      'Develop advanced market analysis techniques',
      'Master negotiation strategies for complex land deals',
      'Structure creative financing solutions',
      'Identify and capitalize on market inefficiencies',
      'Build a network of industry contacts and resources',
      'Create sophisticated acquisition models'
    ],
    courseContent: [
      {
        title: 'Advanced Market Analysis',
        lessons: ['Demographic Trend Analysis', 'Economic Indicator Interpretation', 'Growth Pattern Recognition', 'Competitive Landscape Assessment']
      },
      {
        title: 'Deal Sourcing Strategies',
        lessons: ['Off-Market Properties', 'Distressed Asset Identification', 'Networking and Relationship Building', 'Digital Sourcing Techniques']
      },
      {
        title: 'Negotiation Mastery',
        lessons: ['Psychology of Negotiation', 'Complex Deal Structures', 'Contingency Planning', 'Win-Win Scenarios']
      },
      {
        title: 'Creative Financing',
        lessons: ['Seller Financing Options', 'Private Equity Partnerships', 'Syndication Strategies', 'Leveraging Existing Assets']
      },
      {
        title: 'Portfolio Integration',
        lessons: ['Strategic Acquisition Planning', 'Portfolio Balancing', 'Risk Distribution', 'Long-term Growth Management']
      }
    ],
    instructorBio: 'Michael Rodriguez holds an MBA with a specialization in Real Estate Finance and has completed over $100 million in land acquisition deals throughout his 20-year career. As the former director of acquisitions for a national development firm, he brings practical experience and strategic insights to the classroom.'
  },
]

export default function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const params = useParams();
  const courseId = params.courseId as string;
  
  const course = coursesData.find(c => c.id === courseId);
  
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  
  // If course not found
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-8">The course you are looking for does not exist.</p>
        <Link href="/courses" className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
          Back to Courses
        </Link>
      </div>
    );
  }
  
  // Get related courses (same category, excluding current course)
  const relatedCourses = coursesData
    .filter(c => c.category === course.category && c.id !== course.id)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="flex items-center mb-4">
                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                  {course.category}
                </span>
                <span className="text-gray-600 text-sm">{course.level}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              
              <div className="flex items-center mb-4">
                <FaUserGraduate className="text-gray-500 mr-2" />
                <span className="text-gray-600">{course.instructor}</span>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <StarRating rating={course.rating} />
                  <span className="text-sm text-gray-600 ml-2">{course.rating} ({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center mr-4">
                  <FaClock className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <FaBook className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">{course.lectures} lectures</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setIsEnrolled(!isEnrolled)}
                  className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  {isEnrolled ? 'Enrolled' : `Enroll Now - ${course.price}`}
                </button>
                <Link href="/courses" className="bg-transparent border border-black text-black px-6 py-3 rounded-md font-medium hover:bg-black/5 transition-colors">
                  Back to Courses
                </Link>
              </div>
            </div>
            
            <div className="relative h-80 lg:h-96" data-aos="fade-left">
              <Image 
                src={course.image} 
                alt={course.title}
                fill
                style={{objectFit: 'cover'}}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Navigation */}
      <section className="border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('content')} 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'content' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
            >
              Course Content
            </button>
            <button 
              onClick={() => setActiveTab('instructor')} 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'instructor' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
            >
              Instructor
            </button>
          </div>
        </div>
      </section>
      
      {/* Course Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {activeTab === 'overview' && (
            <div data-aos="fade-up">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">About This Course</h2>
                <p className="text-gray-700 mb-6">{course.fullDescription}</p>
                
                <div className="flex items-center mb-6">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Starts {course.startDate}</span>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="h-6 w-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                        <FaCheck size={12} />
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">Enrollment Status: <span className="font-medium">{course.enrollmentStatus}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">What You Will Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <span className="h-5 w-5 rounded-full bg-gray-100 text-black flex items-center justify-center">
                          <FaCheck size={10} />
                        </span>
                      </div>
                      <p className="ml-3 text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'content' && (
            <div data-aos="fade-up">
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {course.courseContent.map((section, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0">
                    <div className="bg-gray-50 px-6 py-4">
                      <h3 className="font-bold text-lg">{section.title}</h3>
                    </div>
                    <div className="px-6 py-2">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="py-3 border-b border-gray-100 last:border-b-0 flex items-center">
                          <FaChalkboardTeacher className="text-gray-500 mr-3" />
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'instructor' && (
            <div data-aos="fade-up">
              <h2 className="text-2xl font-bold mb-6">Your Instructor</h2>
              <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                    <FaUserGraduate size={32} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{course.instructor}</h3>
                  <p className="text-gray-700 mb-4">{course.instructorBio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-2xl font-bold mb-8" data-aos="fade-up">Related Courses</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCourses.map((relatedCourse, index) => (
                <div 
                  key={relatedCourse.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative h-48">
                    <Image 
                      src={relatedCourse.image} 
                      alt={relatedCourse.title}
                      fill
                      style={{objectFit: 'cover'}}
                      className="transition-transform hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2">{relatedCourse.title}</h3>
                    
                    <div className="flex items-center mb-2">
                      <StarRating rating={relatedCourse.rating} />
                      <span className="text-sm text-gray-600 ml-1">{relatedCourse.rating}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{relatedCourse.price}</span>
                      <Link href={`/courses/${relatedCourse.id}`} className="text-black hover:text-gray-700 font-medium text-sm">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg mb-8">Join thousands of successful investors who have transformed their approach to land investment.</p>
            <button 
              onClick={() => setIsEnrolled(!isEnrolled)}
              className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              {isEnrolled ? 'Access Your Course' : `Enroll Now - ${course.price}`}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}