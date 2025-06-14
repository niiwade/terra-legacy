'use client'
import { useState, useEffect } from 'react';
import AOS from 'aos';
import Image from 'next/image';

interface Testimonial {
  id: number;
  category: string;
  text: string;
  rating: number;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    category: 'Great Work',
    text: '"Terra Legacy made our home buying experience seamless. Their team went above and beyond to find us the perfect property that matched all our requirements. Truly exceptional service!"',
    rating: 5,
    author: {
      name: 'Ali Tufan',
      role: 'Marketing',
      image: '/images/testimonials/1.jpg'
    }
  },
  {
    id: 2,
    category: 'Good Job',
    text: '"I was impressed with how Terra Legacy handled our property listing. Their marketing strategy attracted multiple offers, and we sold above asking price. The virtual tours and professional photography made all the difference."',
    rating: 4,
    author: {
      name: 'Albert Flores',
      role: 'Designer',
      image: '/images/testimonials/2.jpg'
    }
  },
  {
    id: 3,
    category: 'Perfect',
    text: '"As a first-time homebuyer, I was nervous about the entire process. Terra Legacy guided me through every step with patience and expertise. Their knowledge of the local market helped me find a beautiful home in my ideal neighborhood."',
    rating: 5,
    author: {
      name: 'Robert Fox',
      role: 'Developer',
      image: '/images/testimonials/3.jpg'
    }
  },
  {
    id: 4,
    category: 'Work Hard',
    text: '"Terra Legacy\'s property management services exceeded our expectations. They\'ve maintained our rental properties efficiently, responded quickly to maintenance issues, and kept our tenants happy. Their attention to detail is remarkable."',
    rating: 4,
    author: {
      name: 'Marvin McKinney',
      role: 'Marketing',
      image: '/images/testimonials/4.jpg'
    }
  }
];

export default function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = testimonials.length;

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">People Love Working with Terra Legacy</h2>
          <p className="text-gray-500">What our valued clients say about their real estate journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:scale-[1.03]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="font-semibold mb-4">{testimonial.category}</h3>
              <p className="text-gray-700 mb-6 text-sm">
                {testimonial.text}
              </p>
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <Image 
                    src={testimonial.author.image} 
                    alt={testimonial.author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.author.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.author.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center items-center mt-10 space-x-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === index ? 'w-4 bg-black' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
