'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserGraduate, FaBook, FaClock, FaChalkboardTeacher, FaCalendarAlt, FaCheck } from 'react-icons/fa';

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

// Course type from database
interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instructor: string | null;
  level: string | null;
  duration: string | null;
  lectures: number | null;
  price: string;
  salePrice: string | null;
  rating: string | null;
  reviews: number | null;
  imageUrl: string | null;
  category: string | null;
  isFeatured: boolean;
  isActive: boolean;
  enrollmentStatus: string | null;
  startDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);

  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/public/content/${courseId}?type=course`);

        if (!res.ok) {
          throw new Error('Course not found');
        }

        const data = await res.json();
        setCourse(data.data);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err instanceof Error ? err.message : 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  // Fetch related courses
  useEffect(() => {
    const fetchRelated = async () => {
      if (!course) return;

      try {
        const res = await fetch('/api/public/content?type=courses&limit=4');
        const data = await res.json();
        if (data.data) {
          // Filter out current course
          const filtered = data.data.filter((c: any) => c.id !== courseId).slice(0, 3);
          setRelatedCourses(filtered);
        }
      } catch (err) {
        console.error('Error fetching related courses:', err);
      }
    };

    if (course) {
      fetchRelated();
    }
  }, [course, courseId]);

  // If loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3c4b33]"></div>
      </div>
    );
  }

  // If course not found
  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-8">{error || 'The course you are looking for does not exist.'}</p>
        <Link href="/courses" className="bg-[#3c4b33] text-white px-6 py-3 rounded-md font-medium hover:bg-[#4a5d3f] transition-colors">
          Back to Courses
        </Link>
      </div>
    );
  }

  const displayPrice = course.salePrice ? parseFloat(course.salePrice) : parseFloat(course.price);
  const originalPrice = course.salePrice ? parseFloat(course.price) : null;
  const courseImage = course.imageUrl || '/images/courses/default.jpg';
  const formattedStartDate = course.startDate
    ? new Date(course.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Available Now';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="flex items-center mb-4">
                {course.category && (
                  <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                    {course.category}
                  </span>
                )}
                {course.level && (
                  <span className="text-gray-600 text-sm">{course.level}</span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>

              {course.instructor && (
                <div className="flex items-center mb-4">
                  <FaUserGraduate className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{course.instructor}</span>
                </div>
              )}

              <div className="flex items-center mb-6 flex-wrap gap-4">
                {course.rating && (
                  <div className="flex items-center mr-4">
                    <StarRating rating={course.rating} />
                    <span className="text-sm text-gray-600 ml-2">
                      {course.rating} {course.reviews && `(${course.reviews} reviews)`}
                    </span>
                  </div>
                )}
                {course.duration && (
                  <div className="flex items-center mr-4">
                    <FaClock className="text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">{course.duration}</span>
                  </div>
                )}
                {course.lectures && (
                  <div className="flex items-center">
                    <FaBook className="text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">{course.lectures} lectures</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                {originalPrice && (
                  <span className="text-xl text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
                )}
                <span className="text-2xl font-bold text-[#3c4b33]">${displayPrice.toFixed(2)}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsEnrolled(!isEnrolled)}
                  className="bg-[#3c4b33] text-white px-8 py-3 rounded-md font-medium hover:bg-[#4a5d3f] transition-colors"
                >
                  {isEnrolled ? 'Enrolled' : `Enroll Now`}
                </button>
                <Link href="/courses" className="bg-transparent border border-[#3c4b33] text-[#3c4b33] px-6 py-3 rounded-md font-medium hover:bg-[#3c4b33]/5 transition-colors">
                  Back to Courses
                </Link>
              </div>
            </div>

            <div className="relative h-80 lg:h-96" data-aos="fade-left">
              <Image
                src={courseImage}
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
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-[#3c4b33] border-b-2 border-[#3c4b33]' : 'text-gray-500 hover:text-[#3c4b33]'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('instructor')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'instructor' ? 'text-[#3c4b33] border-b-2 border-[#3c4b33]' : 'text-gray-500 hover:text-[#3c4b33]'}`}
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
                {course.description && (
                  <div className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: course.description }} />
                )}

                <div className="flex items-center mb-6">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Starts {formattedStartDate}</span>
                </div>

                {course.enrollmentStatus && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <span className="h-6 w-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                          <FaCheck size={12} />
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          Enrollment Status: <span className="font-medium capitalize">{course.enrollmentStatus}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'instructor' && (
            <div data-aos="fade-up">
              <h2 className="text-2xl font-bold mb-6">Your Instructor</h2>
              <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-[#3c4b33] flex items-center justify-center text-white text-2xl font-bold">
                    {course.instructor ? course.instructor.charAt(0).toUpperCase() : 'T'}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{course.instructor || 'Terra Legacy Instructor'}</h3>
                  <p className="text-gray-700">Expert instructor at Terra Legacy Land Services with years of experience in the field.</p>
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
              {relatedCourses.map((relatedCourse, index) => {
                const relPrice = relatedCourse.salePrice || relatedCourse.price;
                const relImage = relatedCourse.imageUrl || '/images/courses/default.jpg';

                return (
                  <div
                    key={relatedCourse.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="relative h-48">
                      <Image
                        src={relImage}
                        alt={relatedCourse.title}
                        fill
                        style={{objectFit: 'cover'}}
                        className="transition-transform hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{relatedCourse.title}</h3>

                      {relatedCourse.rating && (
                        <div className="flex items-center mb-2">
                          <StarRating rating={relatedCourse.rating} />
                          <span className="text-sm text-gray-600 ml-1">{relatedCourse.rating}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-bold">${parseFloat(relPrice).toFixed(2)}</span>
                        <Link href={`/courses/${relatedCourse.id}`} className="text-[#3c4b33] hover:text-[#4a5d3f] font-medium text-sm">
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-[#3c4b33] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg mb-8">Join thousands of successful investors who have transformed their approach to land investment.</p>
            <button
              onClick={() => setIsEnrolled(!isEnrolled)}
              className="bg-white text-[#3c4b33] px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              {isEnrolled ? 'Access Your Course' : `Enroll Now`}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
