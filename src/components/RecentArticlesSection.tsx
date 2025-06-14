'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import AOS from 'aos';

// Article data type
interface Article {
  id: string;
  image: string;
  category: string;
  date: string;
  title: string;
  link: string;
}

// Sample article data
const articles: Article[] = [
  {
    id: '1',
    image: '/images/blog/1.jpg',
    category: 'Apartment',
    date: 'March 19, 2024',
    title: 'Housing Markets That Changed the Most This Week',
    link: '/blog/housing-markets'
  },
  {
    id: '2',
    image: '/images/blog/2.jpg',
    category: 'Apartment',
    date: 'March 19, 2024',
    title: 'Read Unveils the Best Canadian Cities for Biking',
    link: '/blog/canadian-cities-biking'
  },
  {
    id: '3',
    image: '/images/blog/3.jpg',
    category: 'Office',
    date: 'March 19, 2024',
    title: '10 Walkable Cities Where You Can Live Affordably',
    link: '/blog/walkable-cities'
  },
  {
    id: '4',
    image: '/images/blog/4.jpg',
    category: 'Shop',
    date: 'March 19, 2024',
    title: 'New Apartment Nice in the Best Canadian Cities',
    link: '/blog/new-apartment-canadian-cities'
  }
];

export default function RecentArticlesSection() {
  // Initialize AOS when component mounts
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Recent Articles & News</h2>
            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <Link href="/blog" className="text-burgundy font-medium hover:underline flex items-center mt-4 md:mt-0">
            View All News
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <div 
              key={article.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-48 w-full">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{article.category}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">{article.title}</h3>
                <Link href={article.link} className="text-burgundy text-sm font-medium hover:underline flex items-center">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
