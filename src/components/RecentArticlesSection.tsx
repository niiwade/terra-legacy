'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AOS from 'aos';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
  tags: string | null;
}

// Fallback data
const fallbackArticles: Article[] = [
  {
    id: '1',
    title: 'Essential Tips for Starting Your Homestead on Raw Land',
    slug: 'homesteading-raw-land',
    excerpt: 'Learn the essential steps to start your homestead journey on raw land.',
    coverImageUrl: '/images/blog/1.jpg',
    publishedAt: '2024-03-19',
    createdAt: '2024-03-19',
    tags: '["Homesteading"]'
  },
  {
    id: '2',
    title: 'Sustainable Farming Practices for Small Acreage',
    slug: 'sustainable-farming-small-acreage',
    excerpt: 'Discover sustainable farming techniques perfect for small properties.',
    coverImageUrl: '/images/blog/2.jpg',
    publishedAt: '2024-03-18',
    createdAt: '2024-03-18',
    tags: '["Farming"]'
  },
  {
    id: '3',
    title: 'Planning Your First Vegetable Garden on Rural Property',
    slug: 'first-vegetable-garden',
    excerpt: 'A complete guide to planning and starting your first vegetable garden.',
    coverImageUrl: '/images/blog/3.jpg',
    publishedAt: '2024-03-17',
    createdAt: '2024-03-17',
    tags: '["Gardening"]'
  },
  {
    id: '4',
    title: 'Market Trends in Rural Land Investment for 2024',
    slug: 'rural-land-investment-trends',
    excerpt: 'Explore the latest trends shaping rural land investment this year.',
    coverImageUrl: '/images/blog/4.jpg',
    publishedAt: '2024-03-16',
    createdAt: '2024-03-16',
    tags: '["Land Investment"]'
  }
];

export default function RecentArticlesSection() {
  const [articles, setArticles] = useState<Article[]>(fallbackArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/public/content?type=blogs&limit=4');
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setArticles(data.data);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getCategory = (tags: string | null) => {
    if (!tags) return 'News';
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : 'News';
    } catch {
      return 'News';
    }
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-mist">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-earth">Recent Articles & News</h2>
            <p className="text-gray-600">Stay updated with the latest insights on land investment, farming, and sustainable living.</p>
          </div>
          <Link href="/blog" className="text-forest font-medium hover:underline flex items-center mt-4 md:mt-0">
            View All News
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-48 w-full bg-gray-200">
                  {article.coverImageUrl ? (
                    <Image
                      src={article.coverImageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{getCategory(article.tags)}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{formatDate(article.publishedAt || article.createdAt)}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 line-clamp-2">{article.title}</h3>
                  <Link href={`/blog/${article.id}`} className="text-forest text-sm font-medium hover:underline flex items-center">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
