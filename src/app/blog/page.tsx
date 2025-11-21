'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import BlogSidebar from '@/components/BlogSidebar';

// Blog post interface
interface BlogPost {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
}

// Fallback blog posts data
const fallbackBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Starting Your Homestead: Essential Steps for Beginners',
    category: 'Homesteading',
    image: '/images/blog/1.jpg',
    date: 'December 15, 2024',
    author: {
      name: 'Randy Wilson',
      avatar: '/images/avatars/1.jpg'
    }
  },
  {
    id: '2',
    title: 'Sustainable Farming Practices for Small Acreage',
    category: 'Farming',
    image: '/images/blog/2.jpg',
    date: 'December 12, 2024',
    author: {
      name: 'Jason Friedman',
      avatar: '/images/avatars/2.jpg'
    }
  },
  {
    id: '3',
    title: 'Organic Gardening: From Soil to Harvest',
    category: 'Gardening',
    image: '/images/blog/3.jpg',
    date: 'December 10, 2024',
    author: {
      name: 'Elizabeth Smith',
      avatar: '/images/avatars/3.jpg'
    }
  },
  {
    id: '4',
    title: 'Land Investment Strategies for Rural Properties',
    category: 'Real Estate',
    image: '/images/blog/4.jpg',
    date: 'December 8, 2024',
    author: {
      name: 'Alex Smith',
      avatar: '/images/avatars/4.jpg'
    }
  },
  {
    id: '5',
    title: 'Building Self-Sufficiency Through Homesteading',
    category: 'Homesteading',
    image: '/images/blog/1.jpg',
    date: 'December 5, 2024',
    author: {
      name: 'Michael Davis',
      avatar: '/images/avatars/1.jpg'
    }
  },
  {
    id: '6',
    title: 'Permaculture Design for Your Property',
    category: 'Farming',
    image: '/images/blog/2.jpg',
    date: 'December 3, 2024',
    author: {
      name: 'John Smith',
      avatar: '/images/avatars/2.jpg'
    }
  },
  {
    id: '7',
    title: 'Seasonal Gardening: What to Plant When',
    category: 'Gardening',
    image: '/images/blog/3.jpg',
    date: 'December 1, 2024',
    author: {
      name: 'Jason Friedman',
      avatar: '/images/avatars/3.jpg'
    }
  },
  {
    id: '8',
    title: 'Evaluating Land for Agricultural Potential',
    category: 'Investment',
    image: '/images/blog/4.jpg',
    date: 'November 28, 2024',
    author: {
      name: 'Elizabeth Smith',
      avatar: '/images/avatars/4.jpg'
    }
  },
  {
    id: '9',
    title: 'Water Management for Rural Properties',
    category: 'Homesteading',
    image: '/images/blog/1.jpg',
    date: 'November 25, 2024',
    author: {
      name: 'John Smith',
      avatar: '/images/avatars/1.jpg'
    }
  }
];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(fallbackBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/public/content?type=blogs&limit=20');
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          // Transform API data to match component structure
          const transformedPosts: BlogPost[] = data.data.map((item: {
            id: string;
            title: string;
            tags: string | null;
            coverImageUrl: string | null;
            publishedAt: string | null;
            createdAt: string;
            authorName?: string | null;
            authorImage?: string | null;
          }) => {
            // Parse tags to get category
            let category = 'News';
            if (item.tags) {
              try {
                const parsed = JSON.parse(item.tags);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  category = parsed[0];
                }
              } catch {
                category = 'News';
              }
            }

            // Format date
            const dateStr = item.publishedAt || item.createdAt;
            const date = new Date(dateStr);
            const formattedDate = date.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            });

            return {
              id: item.id,
              title: item.title,
              category,
              image: item.coverImageUrl || '/images/blog/1.jpg',
              date: formattedDate,
              author: {
                name: item.authorName || 'Terra Legacy',
                avatar: item.authorImage || '/images/avatars/1.jpg'
              }
            };
          });
          setBlogPosts(transformedPosts);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3c4b33]"></div>
              </div>
            ) : (
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
            )}

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