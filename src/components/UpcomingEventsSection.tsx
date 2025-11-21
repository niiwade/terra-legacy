'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  description: string | null;
  imageUrl: string | null;
}

// Fallback data
const fallbackEvents: Event[] = [
  {
    id: '1',
    title: 'Community Garden Day',
    date: '2025-06-25',
    time: '10:00 AM',
    location: 'Central Park Community Garden',
    description: 'Join us for a day of planting, gardening workshops, and community building. Learn sustainable gardening practices and connect with fellow community members.',
    imageUrl: '/images/events/1.jpg',
  },
  {
    id: '2',
    title: 'Sustainable Housing Workshop',
    date: '2025-07-10',
    time: '2:00 PM',
    location: 'Terra Legacy Headquarters',
    description: 'Discover the latest innovations in sustainable housing. Expert speakers will discuss eco-friendly building materials, energy efficiency, and sustainable design principles.',
    imageUrl: '/images/events/2.jpg',
  },
  {
    id: '3',
    title: 'Neighborhood Cleanup Initiative',
    date: '2025-07-18',
    time: '9:00 AM',
    location: 'Riverside Community',
    description: 'Help make our community cleaner and greener! Join fellow residents in this cleanup initiative. Equipment and refreshments will be provided.',
    imageUrl: '/images/events/3.jpg',
  }
];

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState<Event[]>(fallbackEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/public/content?type=events&limit=3');
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setEvents(data.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Community Events</h2>
            <p className="text-gray-600 max-w-2xl">
              Join us at these upcoming events to connect with neighbors and build stronger communities.
            </p>
          </div>
          <Link
            href="/community"
            className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            View All Events
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3c4b33]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
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
                      <span>{formatDate(event.date)}{event.time && ` at ${event.time}`}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <Link href={`/community/events/${event.id}`} className="text-primary font-medium hover:underline">
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/community"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
