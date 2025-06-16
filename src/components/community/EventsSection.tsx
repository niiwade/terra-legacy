'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  category: 'upcoming' | 'past';
};

const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Community Garden Day',
    date: 'June 25, 2025',
    location: 'Central Park Community Garden',
    description: 'Join us for a day of planting, gardening workshops, and community building. Learn sustainable gardening practices and connect with fellow community members.',
    image: '/images/events/1.jpg',
    category: 'upcoming',
  },
  {
    id: '2',
    title: 'Sustainable Housing Workshop',
    date: 'July 10, 2025',
    location: 'Terra Legacy Headquarters',
    description: 'Discover the latest innovations in sustainable housing. Expert speakers will discuss eco-friendly building materials, energy efficiency, and sustainable design principles.',
    image: '/images/events/2.jpg',
    category: 'upcoming',
  },
  {
    id: '3',
    title: 'Neighborhood Cleanup Initiative',
    date: 'July 18, 2025',
    location: 'Riverside Community',
    description: 'Help make our community cleaner and greener! Join fellow residents in this cleanup initiative. Equipment and refreshments will be provided.',
    image: '/images/events/3.jpg',
    category: 'upcoming',
  },
  {
    id: '4',
    title: 'Real Estate Investment Seminar',
    date: 'May 15, 2025',
    location: 'Grand Conference Center',
    description: 'A comprehensive seminar on real estate investment strategies, market trends, and financial planning for property investments.',
    image: '/images/events/4.jpg',
    category: 'past',
  },
  {
    id: '5',
    title: 'Community Art Festival',
    date: 'April 22, 2025',
    location: 'Downtown Arts District',
    description: 'A celebration of local artists featuring exhibitions, performances, and interactive art installations throughout the neighborhood.',
    image: '/images/events/5.jpg',
    category: 'past',
  },
];

export default function EventsSection() {
  const [activeCategory, setActiveCategory] = useState<'upcoming' | 'past'>('upcoming');
  
  const filteredEvents = EVENTS.filter(event => event.category === activeCategory);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-aos="fade-up">Community Events</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
          Join us at our upcoming events or browse through our past gatherings to see how we&apos;re building stronger communities.
        </p>
        
        <div className="flex justify-center mb-10" data-aos="fade-up" data-aos-delay="150">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-6 py-2 text-sm font-medium rounded-l-lg ${
                activeCategory === 'upcoming' 
                  ? 'bg-primary text-black' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory('upcoming')}
            >
              Upcoming Events
            </button>
            <button
              type="button"
              className={`px-6 py-2 text-sm font-medium rounded-r-lg ${
                activeCategory === 'past' 
                  ? 'bg-primary text-black' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory('past')}
            >
              Past Events
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={`${parseInt(event.id) * 50}`}
            >
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
                {/* Uncomment when images are available */}
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  className="object-cover"
                /> 
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                </div>
                <div className="mb-4">
                  <div className="flex items-center text-gray-500 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                <Link href={`/community/events/${event.id}`} className="text-primary font-medium hover:underline">
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {activeCategory === 'upcoming' && (
          <div className="text-center mt-12" data-aos="fade-up">
            <Link 
              href="/community/calendar" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
            >
              View Full Calendar
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
