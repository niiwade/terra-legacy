'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import AOS from 'aos';

// Blog post interface
interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

// Sample blog posts data with full content
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/beach.jpg',
    date: 'August 20, 2022',
    content: `
      <p>The real estate industry has undergone significant transformation in recent years, largely due to technological advancements. From virtual tours to blockchain transactions, technology is reshaping how properties are bought, sold, and managed.</p>
      
      <p>One of the most notable changes is the rise of virtual reality (VR) and augmented reality (AR) in property viewings. Potential buyers can now tour homes from the comfort of their own living rooms, saving time and allowing for more efficient property hunting. This technology has proven especially valuable for international buyers or those relocating from distant locations.</p>
      
      <p>Artificial intelligence and machine learning algorithms are also revolutionizing property valuation and market analysis. These technologies can process vast amounts of data to provide more accurate property valuations and market predictions, helping both buyers and sellers make informed decisions.</p>
      
      <h3>The Rise of Smart Homes</h3>
      
      <p>Smart home technology is another area where innovation is changing the real estate landscape. Properties equipped with smart thermostats, security systems, and appliances are becoming increasingly desirable to tech-savvy buyers. These features not only offer convenience but can also improve energy efficiency and home security.</p>
      
      <p>Blockchain technology is beginning to make inroads in real estate transactions as well. By providing a secure and transparent way to record property ownership and transfer, blockchain has the potential to streamline the buying and selling process, reducing the need for intermediaries and lowering transaction costs.</p>
      
      <p>As we look to the future, it's clear that technology will continue to play an increasingly important role in the real estate industry. Those who embrace these innovations will be well-positioned to thrive in this evolving landscape.</p>
    `,
    author: {
      name: 'Randy Wilson',
      avatar: '/images/avatars/avatar1.jpg',
      bio: 'Randy is a real estate technology specialist with over 15 years of experience in the industry.'
    }
  },
  {
    id: 2,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/venice.jpg',
    date: 'August 20, 2022',
    content: `
      <p>The real estate industry has undergone significant transformation in recent years, largely due to technological advancements. From virtual tours to blockchain transactions, technology is reshaping how properties are bought, sold, and managed.</p>
      
      <p>One of the most notable changes is the rise of virtual reality (VR) and augmented reality (AR) in property viewings. Potential buyers can now tour homes from the comfort of their own living rooms, saving time and allowing for more efficient property hunting. This technology has proven especially valuable for international buyers or those relocating from distant locations.</p>
      
      <p>Artificial intelligence and machine learning algorithms are also revolutionizing property valuation and market analysis. These technologies can process vast amounts of data to provide more accurate property valuations and market predictions, helping both buyers and sellers make informed decisions.</p>
      
      <h3>The Rise of Smart Homes</h3>
      
      <p>Smart home technology is another area where innovation is changing the real estate landscape. Properties equipped with smart thermostats, security systems, and appliances are becoming increasingly desirable to tech-savvy buyers. These features not only offer convenience but can also improve energy efficiency and home security.</p>
      
      <p>Blockchain technology is beginning to make inroads in real estate transactions as well. By providing a secure and transparent way to record property ownership and transfer, blockchain has the potential to streamline the buying and selling process, reducing the need for intermediaries and lowering transaction costs.</p>
      
      <p>As we look to the future, it's clear that technology will continue to play an increasingly important role in the real estate industry. Those who embrace these innovations will be well-positioned to thrive in this evolving landscape.</p>
    `,
    author: {
      name: 'Jason Friedman',
      avatar: '/images/avatars/avatar2.jpg',
      bio: 'Jason is a real estate technology specialist with over 15 years of experience in the industry.'
    }
  },
  {
    id: 3,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    category: 'Technology',
    image: '/images/blog/car-orange.jpg',
    date: 'August 20, 2022',
    content: `
      <p>The real estate industry has undergone significant transformation in recent years, largely due to technological advancements. From virtual tours to blockchain transactions, technology is reshaping how properties are bought, sold, and managed.</p>
      
      <p>One of the most notable changes is the rise of virtual reality (VR) and augmented reality (AR) in property viewings. Potential buyers can now tour homes from the comfort of their own living rooms, saving time and allowing for more efficient property hunting. This technology has proven especially valuable for international buyers or those relocating from distant locations.</p>
      
      <p>Artificial intelligence and machine learning algorithms are also revolutionizing property valuation and market analysis. These technologies can process vast amounts of data to provide more accurate property valuations and market predictions, helping both buyers and sellers make informed decisions.</p>
      
      <h3>The Rise of Smart Homes</h3>
      
      <p>Smart home technology is another area where innovation is changing the real estate landscape. Properties equipped with smart thermostats, security systems, and appliances are becoming increasingly desirable to tech-savvy buyers. These features not only offer convenience but can also improve energy efficiency and home security.</p>
      
      <p>Blockchain technology is beginning to make inroads in real estate transactions as well. By providing a secure and transparent way to record property ownership and transfer, blockchain has the potential to streamline the buying and selling process, reducing the need for intermediaries and lowering transaction costs.</p>
      
      <p>As we look to the future, it's clear that technology will continue to play an increasingly important role in the real estate industry. Those who embrace these innovations will be well-positioned to thrive in this evolving landscape.</p>
    `,
    author: {
      name: 'Elizabeth Smith',
      avatar: '/images/avatars/avatar3.jpg',
      bio: 'Elizabeth is a real estate technology specialist with over 15 years of experience in the industry.'
    }
  },
  // Additional posts would follow the same pattern
];

export default function BlogPostPage() {
  const params = useParams();
  const postId = typeof params.id === 'string' ? parseInt(params.id) : 1;
  
  // Find the post with the matching ID
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0];
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // Get related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6" data-aos="fade-up">
          <Link href="/blog" className="text-burgundy hover:text-burgundy-dark flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all posts
          </Link>
        </div>
        
        <article className="bg-white rounded-lg overflow-hidden shadow-md" data-aos="fade-up">
          <div className="relative h-96 w-full">
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="p-8">
            <div className="mb-4">
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">{post.category}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center mb-8">
              <div className="flex-shrink-0">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
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
                  <span aria-hidden="true">&middot;</span>
                  <span>8 min read</span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">Written by {post.author.name}</h3>
                  <p className="text-gray-600">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
        
        <div className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, index) => (
              <div 
                key={relatedPost.id} 
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Link href={`/blog/${relatedPost.id}`} className="block">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">{relatedPost.category}</span>
                  </div>
                  <Link href={`/blog/${relatedPost.id}`} className="block">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-burgundy transition-colors">
                      {relatedPost.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mt-4">
                    <div className="flex-shrink-0">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden">
                        <Image 
                          src={relatedPost.author.avatar} 
                          alt={relatedPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{relatedPost.author.name}</p>
                      <div className="flex space-x-1 text-xs text-gray-500">
                        <time dateTime={relatedPost.date}>{relatedPost.date}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
