'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PopularPost {
  id: number;
  title: string;
  image: string;
  date: string;
}

const popularPosts: PopularPost[] = [
  {
    id: 1,
    title: 'The Impact of Technology on the Workplace',
    image: '/images/blog/1.jpg',
    date: 'August 20, 2022'
  },
  {
    id: 2,
    title: 'How to Stage Your Home for a Quick Sale',
    image: '/images/blog/2.jpg',
    date: 'August 15, 2022'
  },
  {
    id: 3,
    title: 'Investment Strategies for First-Time Buyers',
    image: '/images/blog/3.jpg',
    date: 'August 10, 2022'
  }
];

const categories = [
  { name: 'Technology', count: 12 },
  { name: 'Real Estate', count: 8 },
  { name: 'Investment', count: 6 },
  { name: 'Home Decor', count: 5 },
  { name: 'Market Trends', count: 4 }
];

const tags = [
  'Real Estate', 'Technology', 'Investment', 'Home Buying', 
  'Selling Tips', 'Market Analysis', 'Interior Design', 'Smart Homes'
];

export default function BlogSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm" data-aos="fade-up">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </form>
      </div>
      
      {/* Categories */}
      <div className="bg-white p-6 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link 
                href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex justify-between items-center text-gray-700 hover:text-burgundy transition-colors"
              >
                <span>{category.name}</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Popular Posts */}
      <div className="bg-white p-6 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Posts</h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="flex items-center group">
              <div className="flex-shrink-0 relative h-16 w-16 rounded-md overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-burgundy transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Tags */}
      <div className="bg-white p-6 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="300">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Link 
              key={index}
              href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-gray-100 hover:bg-burgundy hover:text-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-burgundy text-white p-6 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="400">
        <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
        <p className="text-sm mb-4 opacity-90">Get the latest updates and insights delivered to your inbox.</p>
        <form className="space-y-3">
          <input
            type="email"
            className="w-full border border-white/20 bg-white/10 rounded-md py-2 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            placeholder="Your email address"
          />
          <button
            type="submit"
            className="w-full bg-white text-burgundy font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
