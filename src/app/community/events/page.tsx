'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaFilter, FaUser, FaUsers } from 'react-icons/fa';

// Basic structure for now - we'll expand this in parts
// Event categories
const categories = [
  'All Events',
  'Workshops',
  'Seminars',
  'Community Gatherings',
  'Volunteer Opportunities',
  'Webinars',
  'Networking'
];

// Event locations
const locations = [
  'All Locations',
  'Terra Legacy Headquarters',
  'Community Center',
  'Central Park',
  'Virtual',
  'Downtown Conference Center',
  'Riverside Community'
];

// Event data
type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  image: string;
  attendees: number;
  speaker?: string;
  featured?: boolean;
};

const eventsData: Event[] = [
  {
    id: 'e1',
    title: 'Community Garden Day',
    date: 'July 15, 2025',
    time: '9:00 AM - 2:00 PM',
    location: 'Central Park',
    category: 'Community Gatherings',
    description: 'Join us for a day of planting, gardening workshops, and community building. Learn sustainable gardening practices and connect with fellow community members.',
    image: '/images/events/1.jpg',
    attendees: 45,
    featured: true
  },
  {
    id: 'e2',
    title: 'Sustainable Housing Workshop',
    date: 'July 22, 2025',
    time: '10:00 AM - 12:00 PM',
    location: 'Terra Legacy Headquarters',
    category: 'Workshops',
    description: 'Discover the latest innovations in sustainable housing. Expert speakers will discuss eco-friendly building materials, energy efficiency, and sustainable design principles.',
    image: '/images/events/2.jpg',
    attendees: 32,
    speaker: 'Dr. Emily Chen',
    featured: true
  },
  {
    id: 'e3',
    title: 'Neighborhood Cleanup Initiative',
    date: 'July 29, 2025',
    time: '8:00 AM - 11:00 AM',
    location: 'Riverside Community',
    category: 'Volunteer Opportunities',
    description: 'Help make our community cleaner and greener! Join fellow residents in this cleanup initiative. Equipment and refreshments will be provided.',
    image: '/images/events/3.jpg',
    attendees: 28
  },
  {
    id: 'e4',
    title: 'Real Estate Investment Seminar',
    date: 'August 5, 2025',
    time: '6:00 PM - 8:00 PM',
    location: 'Downtown Conference Center',
    category: 'Seminars',
    description: 'A comprehensive seminar on real estate investment strategies, market trends, and financial planning for property investments.',
    image: '/images/events/4.jpg',
    attendees: 75,
    speaker: 'Michael Rodriguez, MBA'
  },
  {
    id: 'e5',
    title: 'Community Art Festival',
    date: 'August 12, 2025',
    time: '11:00 AM - 6:00 PM',
    location: 'Central Park',
    category: 'Community Gatherings',
    description: 'A celebration of local artists featuring exhibitions, performances, and interactive art installations throughout the neighborhood.',
    image: '/images/events/5.jpg',
    attendees: 120,
    featured: true
  },
  {
    id: 'e6',
    title: 'Digital Marketing for Real Estate',
    date: 'August 19, 2025',
    time: '2:00 PM - 4:00 PM',
    location: 'Virtual',
    category: 'Webinars',
    description: 'Learn effective digital marketing strategies specifically tailored for real estate professionals and property developers.',
    image: '/images/events/6.jpg',
    attendees: 65,
    speaker: 'Sarah Johnson'
  },
  {
    id: 'e7',
    title: 'Networking Mixer: Real Estate Professionals',
    date: 'August 26, 2025',
    time: '7:00 PM - 9:00 PM',
    location: 'Terra Legacy Headquarters',
    category: 'Networking',
    description: 'Connect with fellow real estate professionals, investors, and developers in a relaxed setting. Appetizers and refreshments will be served.',
    image: '/images/events/7.jpg',
    attendees: 50
  },
  {
    id: 'e8',
    title: 'Sustainable Landscaping Workshop',
    date: 'September 2, 2025',
    time: '10:00 AM - 12:00 PM',
    location: 'Community Center',
    category: 'Workshops',
    description: 'Learn how to create beautiful, eco-friendly landscapes that conserve water and support local wildlife.',
    image: '/images/events/8.jpg',
    attendees: 35,
    speaker: 'Dr. Lisa Green'
  }
];

export default function EventsPage() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter events based on search term, category, and location
  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Events' || event.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || event.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });
  
  // Get featured events
  const featuredEvents = eventsData.filter(event => event.featured);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <Image 
            src="/images/events/events-hero.jpg" 
            alt="Terra Legacy Events" 
            fill
            className="object-cover z-0"
            priority
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terra Legacy Events</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Connect with our community through workshops, seminars, and social gatherings
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="#upcoming-events" 
                className="bg-primary hover:bg-primary-dark text-black font-medium px-6 py-3 rounded-md transition-colors"
              >
                Explore Events
              </Link>
              <Link 
                href="/community/events/calendar" 
                className="bg-white hover:bg-gray-100 text-gray-900 font-medium px-6 py-3 rounded-md transition-colors"
              >
                View Calendar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8" id="upcoming-events">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
          
          {/* Filter Toggle */}
          <div className="mb-6">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <FaFilter className="mr-2" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 animate-fadeIn">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Event Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Featured Events</h2>
            <p className="text-center text-gray-600 mb-12">Don&apos;t miss these special upcoming events</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map(event => (
                <div 
                  key={event.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                  data-aos="fade-up"
                >
                  <div className="relative h-48 w-full">
                    <Image 
                      src={event.image} 
                      alt={event.title} 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-primary text-black m-2 px-3 py-1 rounded-full font-medium text-sm">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-500 mb-1">
                      <FaCalendarAlt className="mr-2" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-500">
                        <FaUsers className="mr-1" />
                        <span>{event.attendees} attending</span>
                      </div>
                      <Link href={`/community/events/${event.id}`} className="text-primary font-medium hover:underline">
                        Learn more →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Events List Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">Upcoming Events</h2>
        <p className="text-center text-gray-600 mb-12">Browse our upcoming events and join us to learn, connect, and grow together.</p>
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t find any events matching your search criteria. Try adjusting your filters or check back later.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Events');
                  setSelectedLocation('All Locations');
                }}
                className="bg-primary hover:bg-primary-dark text-black font-medium px-6 py-3 rounded-md transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div 
                key={event.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                data-aos="fade-up"
              >
                <div className="relative h-48 w-full">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover"
                  />
                  {event.speaker && (
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white m-2 px-3 py-1 rounded-full text-sm flex items-center">
                      <FaUser className="mr-1" />
                      <span>{event.speaker}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center text-gray-500 mb-1">
                      <FaCalendarAlt className="h-5 w-5 mr-2" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <FaMapMarkerAlt className="h-5 w-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {event.category}
                    </span>
                    <Link href={`/community/events/${event.id}`} className="text-primary font-medium hover:underline">
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Call to Action Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-4">Host Your Own Event</h2>
            <p className="text-lg text-gray-800 mb-8">
              Are you interested in hosting a community event? We welcome proposals from community members, organizations, and businesses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/community/events/propose" 
                className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                Propose an Event
              </Link>
              <Link 
                href="/community/events/guidelines" 
                className="bg-white hover:bg-gray-100 text-black font-medium px-6 py-3 rounded-md transition-colors"
              >
                Event Guidelines
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
