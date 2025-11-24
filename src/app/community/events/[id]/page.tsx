'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaUsers, FaTicketAlt } from 'react-icons/fa';

// Event type from database
interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  date: string;
  time: string | null;
  location: string | null;
  category: string | null;
  imageUrl: string | null;
  speaker: string | null;
  attendees: number | null;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EventDetailsPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<any[]>([]);

  const params = useParams();
  const eventId = params.id as string;

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/public/content/${eventId}?type=event`);

        if (!res.ok) {
          throw new Error('Event not found');
        }

        const data = await res.json();
        setEvent(data.data);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError(err instanceof Error ? err.message : 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  // Fetch related events
  useEffect(() => {
    const fetchRelated = async () => {
      if (!event) return;

      try {
        const res = await fetch('/api/public/content?type=events&limit=4');
        const data = await res.json();
        if (data.data) {
          // Filter out current event
          const filtered = data.data.filter((e: any) => e.id !== eventId).slice(0, 3);
          setRelatedEvents(filtered);
        }
      } catch (err) {
        console.error('Error fetching related events:', err);
      }
    };

    if (event) {
      fetchRelated();
    }
  }, [event, eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3c4b33]"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
          <Link href="/community/events" className="text-[#3c4b33] hover:text-[#4a5d3f] font-medium">
            ← Back to all events
          </Link>
        </div>
      </div>
    );
  }

  const eventImage = event.imageUrl || '/images/events/default.jpg';
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/community/events"
          className="inline-flex items-center text-[#3c4b33] hover:text-[#4a5d3f] font-medium mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Event Header Image */}
          <div className="relative h-96 w-full" data-aos="fade-in">
            <Image
              src={eventImage}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            {event.isFeatured && (
              <div className="absolute top-4 right-4 bg-[#e9c770] text-[#000000] px-4 py-2 rounded-full font-bold text-sm">
                Featured Event
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              {event.category && (
                <span className="inline-block bg-[#6f8d5e] text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {event.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-6" data-aos="fade-up">
                {event.title}
              </h1>

              {/* Event Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-start">
                  <FaCalendarAlt className="text-[#3c4b33] mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Date</p>
                    <p className="text-gray-600">{formattedDate}</p>
                  </div>
                </div>

                {event.time && (
                  <div className="flex items-start">
                    <FaClock className="text-[#3c4b33] mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Time</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-[#3c4b33] mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                )}

                {event.speaker && (
                  <div className="flex items-start">
                    <FaUser className="text-[#3c4b33] mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Speaker/Organizer</p>
                      <p className="text-gray-600">{event.speaker}</p>
                    </div>
                  </div>
                )}

                {event.attendees !== null && (
                  <div className="flex items-start">
                    <FaUsers className="text-[#3c4b33] mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Attendees</p>
                      <p className="text-gray-600">{event.attendees} registered</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {event.description && (
                <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                  <div
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </div>
              )}

              {/* Register Button */}
              <div className="border-t border-gray-200 pt-8" data-aos="fade-up" data-aos-delay="300">
                <button className="w-full md:w-auto bg-[#3c4b33] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#4a5d3f] transition-colors flex items-center justify-center">
                  <FaTicketAlt className="mr-2" />
                  Register for This Event
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Registration confirmation will be sent to your email
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="mt-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">More Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedEvents.map((relatedEvent, index) => {
                const relEventImage = relatedEvent.imageUrl || '/images/events/default.jpg';
                const relEventDate = new Date(relatedEvent.date);
                const relFormattedDate = relEventDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <Link
                    key={relatedEvent.id}
                    href={`/community/events/${relatedEvent.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="relative h-48">
                      <Image
                        src={relEventImage}
                        alt={relatedEvent.title}
                        fill
                        className="object-cover"
                      />
                      {relatedEvent.category && (
                        <div className="absolute top-4 left-4 bg-[#6f8d5e] text-white text-xs font-medium px-2 py-1 rounded">
                          {relatedEvent.category}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <FaCalendarAlt className="mr-2" />
                        {relFormattedDate}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {relatedEvent.title}
                      </h3>
                      {relatedEvent.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="mr-2" />
                          {relatedEvent.location}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
