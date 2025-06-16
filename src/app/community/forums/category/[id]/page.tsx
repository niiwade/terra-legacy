'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

type ForumTopic = {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  isSticky: boolean;
};

type CategoryPageProps = {
  params: {
    id: string;
  };
};

// Sample category data
const CATEGORIES = {
  '1': {
    name: 'Real Estate Market',
    description: 'Discussions about current market trends, forecasts, and analysis.',
    topics: [
      {
        id: '5',
        title: 'Market forecast for Q3 2025',
        author: 'David Wilson',
        replies: 8,
        views: 132,
        lastActivity: '2 hours ago',
        isSticky: true,
      },
      {
        id: '6',
        title: 'Impact of remote work on housing demand',
        author: 'Lisa Park',
        replies: 12,
        views: 187,
        lastActivity: '1 day ago',
        isSticky: false,
      },
      {
        id: '7',
        title: 'Interest rate trends and predictions',
        author: 'Michael Chen',
        replies: 15,
        views: 203,
        lastActivity: '3 days ago',
        isSticky: false,
      },
      {
        id: '8',
        title: 'Regional market differences - Q2 analysis',
        author: 'Emily Rodriguez',
        replies: 6,
        views: 98,
        lastActivity: '5 days ago',
        isSticky: false,
      },
    ]
  },
  '2': {
    name: 'Buying & Selling',
    description: 'Tips, advice, and discussions for buyers and sellers.',
    topics: [
      {
        id: '1',
        title: 'Tips for first-time homebuyers in today&apos;s market',
        author: 'Sarah Johnson',
        replies: 24,
        views: 342,
        lastActivity: '5 hours ago',
        isSticky: true,
      },
      {
        id: '9',
        title: 'How to stage your home for maximum appeal',
        author: 'Lisa Park',
        replies: 16,
        views: 215,
        lastActivity: '2 days ago',
        isSticky: false,
      },
      {
        id: '10',
        title: 'Negotiation strategies for buyers',
        author: 'David Wilson',
        replies: 19,
        views: 267,
        lastActivity: '4 days ago',
        isSticky: false,
      },
      {
        id: '11',
        title: 'Working with real estate agents - tips and expectations',
        author: 'Michael Chen',
        replies: 14,
        views: 193,
        lastActivity: '1 week ago',
        isSticky: false,
      },
    ]
  },
  '3': {
    name: 'Home Improvement',
    description: 'Renovation ideas, DIY projects, and contractor recommendations.',
    topics: [
      {
        id: '2',
        title: 'Sustainable landscaping ideas for urban properties',
        author: 'Michael Chen',
        replies: 18,
        views: 256,
        lastActivity: '1 day ago',
        isSticky: false,
      },
      {
        id: '12',
        title: 'Budget-friendly kitchen renovation ideas',
        author: 'Emily Rodriguez',
        replies: 22,
        views: 298,
        lastActivity: '3 days ago',
        isSticky: true,
      },
      {
        id: '13',
        title: 'Finding reliable contractors - community recommendations',
        author: 'Sarah Johnson',
        replies: 27,
        views: 312,
        lastActivity: '5 days ago',
        isSticky: false,
      },
      {
        id: '14',
        title: 'DIY vs Professional: When to call the experts',
        author: 'David Wilson',
        replies: 16,
        views: 187,
        lastActivity: '1 week ago',
        isSticky: false,
      },
    ]
  },
  '4': {
    name: 'Neighborhoods & Communities',
    description: 'Discussions about specific neighborhoods, schools, and community amenities.',
    topics: [
      {
        id: '3',
        title: 'Best neighborhoods for families in the metro area',
        author: 'Emily Rodriguez',
        replies: 32,
        views: 478,
        lastActivity: '2 days ago',
        isSticky: false,
      },
      {
        id: '15',
        title: 'School district rankings and reviews',
        author: 'Sarah Johnson',
        replies: 29,
        views: 387,
        lastActivity: '4 days ago',
        isSticky: true,
      },
      {
        id: '16',
        title: 'Community amenities that increase property values',
        author: 'Michael Chen',
        replies: 14,
        views: 176,
        lastActivity: '1 week ago',
        isSticky: false,
      },
      {
        id: '17',
        title: 'Neighborhood watch programs - getting started',
        author: 'Lisa Park',
        replies: 18,
        views: 203,
        lastActivity: '2 weeks ago',
        isSticky: false,
      },
    ]
  },
  '5': {
    name: 'Investment Properties',
    description: 'Discussions on rental properties, flipping houses, and investment strategies.',
    topics: [
      {
        id: '4',
        title: 'Investment property tax considerations',
        author: 'David Wilson',
        replies: 15,
        views: 189,
        lastActivity: '3 days ago',
        isSticky: false,
      },
      {
        id: '18',
        title: 'House flipping in today&apos;s market - still profitable?',
        author: 'Michael Chen',
        replies: 23,
        views: 312,
        lastActivity: '5 days ago',
        isSticky: true,
      },
      {
        id: '19',
        title: 'Managing rental properties - tips and software',
        author: 'Emily Rodriguez',
        replies: 19,
        views: 243,
        lastActivity: '1 week ago',
        isSticky: false,
      },
      {
        id: '20',
        title: 'Multi-family vs Single-family investments',
        author: 'Sarah Johnson',
        replies: 17,
        views: 198,
        lastActivity: '2 weeks ago',
        isSticky: false,
      },
    ]
  },
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params;
  const category = CATEGORIES[id as keyof typeof CATEGORIES];
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-8">The category you are looking for does not exist.</p>
          <Link 
            href="/community/forums" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            Back to Forums
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-6">
          <Link href="/community/forums" className="text-primary hover:underline flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Forums
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2" data-aos="fade-up">{category.name}</h1>
          <p className="text-gray-600" data-aos="fade-up" data-aos-delay="100">{category.description}</p>
        </div>
        
        {/* Topics List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8" data-aos="fade-up" data-aos-delay="200">
          <div className="flex justify-between items-center bg-gray-100 px-6 py-3">
            <h2 className="text-lg font-medium text-gray-900">Topics</h2>
            <Link 
              href={`/community/forums/new?category=${id}`} 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Topic
            </Link>
          </div>
          
          <div className="hidden md:flex bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500">
            <div className="w-1/2">Topic</div>
            <div className="w-1/6 text-center">Author</div>
            <div className="w-1/12 text-center">Replies</div>
            <div className="w-1/12 text-center">Views</div>
            <div className="w-1/6 text-center">Last Activity</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {category.topics.map((topic) => (
              <div key={topic.id} className="hover:bg-gray-50">
                <Link href={`/community/forums/${topic.id}`} className="block">
                  <div className="px-6 py-4 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 mb-3 md:mb-0 flex items-start">
                      {topic.isSticky && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                          Sticky
                        </span>
                      )}
                      <h3 className="text-lg font-medium text-gray-900">{topic.title}</h3>
                    </div>
                    <div className="w-full md:w-1/6 flex md:justify-center items-center mb-2 md:mb-0">
                      <span className="text-sm text-gray-500">{topic.author}</span>
                    </div>
                    <div className="w-full md:w-1/12 flex md:justify-center items-center mb-2 md:mb-0">
                      <span className="text-sm text-gray-500">{topic.replies}</span>
                    </div>
                    <div className="w-full md:w-1/12 flex md:justify-center items-center mb-2 md:mb-0">
                      <span className="text-sm text-gray-500">{topic.views}</span>
                    </div>
                    <div className="w-full md:w-1/6 flex md:justify-center items-center">
                      <span className="text-sm text-gray-500">{topic.lastActivity}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        {/* Forum Rules */}
        <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Forum Rules</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Be respectful and courteous to other members.</li>
            <li>Stay on topic and keep discussions relevant to the category.</li>
            <li>No promotional content or spam.</li>
            <li>Do not share personal information of others without consent.</li>
            <li>Follow our community guidelines at all times.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
