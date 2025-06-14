'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import BlogSidebar from '@/components/BlogSidebar';

// Blog post interface
interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/beach.jpg',
    date: 'August 20, 2022',
    author: {
      name: 'Randy Wilson',
      avatar: '/images/avatars/avatar1.jpg'
    }
  },
  {
    id: 2,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/venice.jpg',
    date: 'August 20, 2022',
    author: {
      name: 'Jason Friedman',
      avatar: '/images/avatars/avatar2.jpg'
    }
  },
  {
    id: 3,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/car-orange.jpg',
    date: 'August 20, 2022',
    author: {
      name: 'Elizabeth Smith',
      avatar: '/images/avatars/avatar3.jpg'
    }
  },
  {
    id: 4,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/cottage.jpg',
    date: 'August 20, 2022',
    author: {
      name: 'Alex Smith',
      avatar: '/images/avatars/avatar4.jpg'
    }
  },
  {
    id: 5,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/rocks.jpg',
    date: 'August 20, 2022',
    author: {
      name: 'Michael Davis',
      avatar: '/images/avatars/avatar5.jpg'
    }
  },
  {
    id: 6,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/car-blue.jpg',
    date: 'August 20, 2022',
    author: {
      name: 'John Smith',
      avatar: '/images/avatars/avatar6.jpg'
    }
  },
  {
    id: 7,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/iphone.jpg',
    date: 'August 20, 2022',
    author: {
      name: 'Jason Friedman',
      avatar: '/images/avatars/avatar2.jpg'
    }
  },
  {
    id: 8,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/island.jpg',
    date: 'August 20, 2022',
    author: {
      name: 'Elizabeth Smith',
      avatar: '/images/avatars/avatar3.jpg'
    }
  },
  {
    id: 9,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/watch.jpg',
    date: 'August 20, 2022',
    author: {
      name: 'John Smith',
      avatar: '/images/avatars/avatar6.jpg'
    }
  }
];

export default function BlogPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Posts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of articles about real estate trends, home buying tips, and investment strategies.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <Link href={`/blog/${post.id}`} className="block">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">{post.category}</span>
                    </div>
                    <Link href={`/blog/${post.id}`} className="block">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-burgundy transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center mt-4">
                      <div className="flex-shrink-0">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <Image 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                        <div className="flex space-x-1 text-xs text-gray-500">
                          <time dateTime={post.date}>{post.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center" data-aos="fade-up">
              <nav className="inline-flex rounded-md shadow">
                <a href="#" className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </a>
                <a href="#" className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-burgundy">
                  1
                </a>
                <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </a>
                <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </a>
                <a href="#" className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next
                </a>
              </nav>
            </div>
          </div>
          
          <div className="lg:w-1/4 mt-8 lg:mt-0">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}