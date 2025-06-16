'use client';

import { useState } from 'react';
import Link from 'next/link';

type ForumTopic = {
  id: string;
  title: string;
  category: string;
  author: string;
  replies: number;
  lastActivity: string;
  excerpt: string;
};

const FORUM_TOPICS: ForumTopic[] = [
  {
    id: '1',
    title: 'Tips for first-time homebuyers in today\'s market',
    category: 'Buying',
    author: 'Sarah Johnson',
    replies: 24,
    lastActivity: '2 hours ago',
    excerpt: 'I\'m looking to buy my first home and would appreciate any advice on navigating the current market conditions...'
  },
  {
    id: '2',
    title: 'Sustainable landscaping ideas for urban properties',
    category: 'Home Improvement',
    author: 'Michael Chen',
    replies: 18,
    lastActivity: '5 hours ago',
    excerpt: 'Looking for low-maintenance, eco-friendly landscaping solutions for my small urban yard...'
  },
  {
    id: '3',
    title: 'Best neighborhoods for families in the metro area',
    category: 'Neighborhoods',
    author: 'Emily Rodriguez',
    replies: 32,
    lastActivity: '1 day ago',
    excerpt: 'We\'re relocating with our two kids and are trying to find family-friendly neighborhoods with good schools...'
  },
  {
    id: '4',
    title: 'Investment property tax considerations',
    category: 'Investment',
    author: 'David Wilson',
    replies: 15,
    lastActivity: '2 days ago',
    excerpt: 'What are the current tax implications for rental properties? I\'m considering purchasing my first investment property...'
  },
  {
    id: '5',
    title: 'Community garden initiative proposal',
    category: 'Community',
    author: 'Lisa Park',
    replies: 29,
    lastActivity: '3 days ago',
    excerpt: 'I\'d like to propose starting a community garden in the Oakwood neighborhood. Looking for interested participants and advice...'
  },
];

const CATEGORIES = [
  'All Topics',
  'Buying',
  'Selling',
  'Renting',
  'Investment',
  'Home Improvement',
  'Neighborhoods',
  'Community',
];

export default function ForumsSection() {
  const [activeCategory, setActiveCategory] = useState('All Topics');
  
  const filteredTopics = activeCategory === 'All Topics' 
    ? FORUM_TOPICS 
    : FORUM_TOPICS.filter(topic => topic.category === activeCategory);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-aos="fade-up">Community Forums</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
          Connect with fellow community members, share insights, ask questions, and participate in discussions about real estate and community topics.
        </p>
        
        <div className="mb-10 overflow-x-auto" data-aos="fade-up" data-aos-delay="150">
          <div className="flex space-x-2 pb-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden" data-aos="fade-up" data-aos-delay="200">
          <div className="hidden md:flex bg-gray-100 px-6 py-3 text-sm font-medium text-gray-500">
            <div className="w-1/2">Topic</div>
            <div className="w-1/6 text-center">Category</div>
            <div className="w-1/6 text-center">Replies</div>
            <div className="w-1/6 text-center">Last Activity</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="hover:bg-gray-50">
                <Link href={`/community/forums/${topic.id}`} className="block">
                  <div className="px-6 py-4 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 mb-2 md:mb-0">
                      <h3 className="text-lg font-medium text-gray-900">{topic.title}</h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-1 md:hidden">{topic.excerpt}</p>
                      <div className="flex items-center mt-1 md:mt-2">
                        <span className="text-xs text-gray-500">Started by {topic.author}</span>
                      </div>
                    </div>
                    <div className="w-full md:w-1/6 flex md:justify-center items-center mb-2 md:mb-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 md:bg-transparent md:text-gray-500">
                        {topic.category}
                      </span>
                    </div>
                    <div className="w-full md:w-1/6 flex md:justify-center items-center mb-2 md:mb-0">
                      <span className="text-sm text-gray-500">{topic.replies}</span>
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

        <div className="text-center mt-12" data-aos="fade-up">
          <Link 
            href="/community/forums" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            View All Forums
          </Link>
        </div>
      </div>
    </section>
  );
}
