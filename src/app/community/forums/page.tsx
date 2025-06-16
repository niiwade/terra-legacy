'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

type ForumCategory = {
  id: string;
  name: string;
  description: string;
  topics: number;
  posts: number;
  lastPost: {
    title: string;
    author: string;
    date: string;
  };
};

type ForumTopic = {
  id: string;
  title: string;
  category: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  isSticky: boolean;
};

const FORUM_CATEGORIES: ForumCategory[] = [
  {
    id: '1',
    name: 'Real Estate Market',
    description: 'Discussions about current market trends, forecasts, and analysis.',
    topics: 24,
    posts: 142,
    lastPost: {
      title: 'Market forecast for Q3 2025',
      author: 'David Wilson',
      date: '2 hours ago',
    },
  },
  {
    id: '2',
    name: 'Buying & Selling',
    description: 'Tips, advice, and discussions for buyers and sellers.',
    topics: 36,
    posts: 287,
    lastPost: {
      title: 'Tips for first-time homebuyers in today&apos;s market',
      author: 'Sarah Johnson',
      date: '5 hours ago',
    },
  },
  {
    id: '3',
    name: 'Home Improvement',
    description: 'Renovation ideas, DIY projects, and contractor recommendations.',
    topics: 42,
    posts: 315,
    lastPost: {
      title: 'Sustainable landscaping ideas for urban properties',
      author: 'Michael Chen',
      date: '1 day ago',
    },
  },
  {
    id: '4',
    name: 'Neighborhoods & Communities',
    description: 'Discussions about specific neighborhoods, schools, and community amenities.',
    topics: 28,
    posts: 196,
    lastPost: {
      title: 'Best neighborhoods for families in the metro area',
      author: 'Emily Rodriguez',
      date: '2 days ago',
    },
  },
  {
    id: '5',
    name: 'Investment Properties',
    description: 'Discussions on rental properties, flipping houses, and investment strategies.',
    topics: 19,
    posts: 124,
    lastPost: {
      title: 'Investment property tax considerations',
      author: 'David Wilson',
      date: '3 days ago',
    },
  },
];

const POPULAR_TOPICS: ForumTopic[] = [
  {
    id: '1',
    title: 'Tips for first-time homebuyers in today&apos;s market',
    category: 'Buying & Selling',
    author: 'Sarah Johnson',
    replies: 24,
    views: 342,
    lastActivity: '5 hours ago',
    isSticky: true,
  },
  {
    id: '2',
    title: 'Sustainable landscaping ideas for urban properties',
    category: 'Home Improvement',
    author: 'Michael Chen',
    replies: 18,
    views: 256,
    lastActivity: '1 day ago',
    isSticky: false,
  },
  {
    id: '3',
    title: 'Best neighborhoods for families in the metro area',
    category: 'Neighborhoods & Communities',
    author: 'Emily Rodriguez',
    replies: 32,
    views: 478,
    lastActivity: '2 days ago',
    isSticky: false,
  },
  {
    id: '4',
    title: 'Investment property tax considerations',
    category: 'Investment Properties',
    author: 'David Wilson',
    replies: 15,
    views: 189,
    lastActivity: '3 days ago',
    isSticky: false,
  },
  {
    id: '5',
    title: 'Market forecast for Q3 2025',
    category: 'Real Estate Market',
    author: 'David Wilson',
    replies: 8,
    views: 132,
    lastActivity: '2 hours ago',
    isSticky: true,
  },
];

export default function ForumsPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">Community Forums</h1>
          <p className="text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Connect with fellow community members, share insights, ask questions, and participate in discussions about real estate and community topics.
          </p>
        </div>
        
        {/* Forum Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-aos="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">149</div>
              <div className="text-gray-600 text-sm">Topics</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">1,064</div>
              <div className="text-gray-600 text-sm">Posts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">5,243</div>
              <div className="text-gray-600 text-sm">Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">Sarah J.</div>
              <div className="text-gray-600 text-sm">Newest Member</div>
            </div>
          </div>
        </div>
        
        {/* Forum Categories */}
        <div className="mb-12" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-2xl font-bold mb-6">Forum Categories</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:flex bg-gray-100 px-6 py-3 text-sm font-medium text-gray-500">
              <div className="w-1/2">Category</div>
              <div className="w-1/6 text-center">Topics</div>
              <div className="w-1/6 text-center">Posts</div>
              <div className="w-1/6 text-center">Last Post</div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {FORUM_CATEGORIES.map((category) => (
                <div key={category.id} className="hover:bg-gray-50">
                  <Link href={`/community/forums/category/${category.id}`} className="block">
                    <div className="px-6 py-4 flex flex-col md:flex-row">
                      <div className="w-full md:w-1/2 mb-3 md:mb-0">
                        <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                      </div>
                      <div className="w-full md:w-1/6 flex md:justify-center items-center mb-2 md:mb-0">
                        <span className="text-sm text-gray-500">{category.topics}</span>
                      </div>
                      <div className="w-full md:w-1/6 flex md:justify-center items-center mb-2 md:mb-0">
                        <span className="text-sm text-gray-500">{category.posts}</span>
                      </div>
                      <div className="w-full md:w-1/6 flex md:justify-center items-center">
                        <div className="text-sm">
                          <p className="text-primary truncate">{category.lastPost.title}</p>
                          <p className="text-gray-500 text-xs">
                            by {category.lastPost.author} • {category.lastPost.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Popular Topics */}
        <div className="mb-12" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:flex bg-gray-100 px-6 py-3 text-sm font-medium text-gray-500">
              <div className="w-1/2">Topic</div>
              <div className="w-1/6 text-center">Author</div>
              <div className="w-1/12 text-center">Replies</div>
              <div className="w-1/12 text-center">Views</div>
              <div className="w-1/6 text-center">Last Activity</div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {POPULAR_TOPICS.map((topic) => (
                <div key={topic.id} className="hover:bg-gray-50">
                  <Link href={`/community/forums/${topic.id}`} className="block">
                    <div className="px-6 py-4 flex flex-col md:flex-row">
                      <div className="w-full md:w-1/2 mb-3 md:mb-0 flex items-start">
                        {topic.isSticky && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                            Sticky
                          </span>
                        )}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{topic.title}</h3>
                          <p className="mt-1 text-xs text-gray-500">in {topic.category}</p>
                        </div>
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
        </div>
        
        {/* Create New Topic */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
          <Link 
            href="/community/forums/new" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Topic
          </Link>
        </div>
      </div>
    </div>
  );
}
