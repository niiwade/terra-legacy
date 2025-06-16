'use client';

import { useState } from 'react';
import Link from 'next/link';

type Comment = {
  id: string;
  author: string;
  authorRole: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
};

type ForumPost = {
  id: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  avatar: string;
  content: string;
  date: string;
  views: number;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
};

// Sample forum post data
const FORUM_POST: ForumPost = {
  id: '1',
  title: 'Tips for first-time homebuyers in today&apos;s market',
  category: 'Buying',
  author: 'Sarah Johnson',
  authorRole: 'Real Estate Agent',
  avatar: '/images/avatars/sarah.jpg',
  content: `
    <p>Hello everyone!</p>
    <p>As a first-time homebuyer in this challenging market, I&apos;m looking for advice from those who have recently gone through the process. The current market seems quite competitive, and I&apos;m feeling a bit overwhelmed.</p>
    <p>Here are some specific questions I have:</p>
    <ul>
      <li>How much over asking price is reasonable in the current market?</li>
      <li>Are there any neighborhoods that still offer good value?</li>
      <li>What contingencies are buyers waiving, and which ones should I absolutely keep?</li>
      <li>How long did your home search take from start to finish?</li>
      <li>Any recommendations for lenders with competitive rates for first-time buyers?</li>
    </ul>
    <p>Any insights or personal experiences would be greatly appreciated!</p>
    <p>Thank you in advance for your help.</p>
  `,
  date: 'June 14, 2025',
  views: 342,
  likes: 24,
  isLiked: false,
  comments: [
    {
      id: '1',
      author: 'Michael Chen',
      authorRole: 'Homeowner',
      avatar: '/images/avatars/michael.jpg',
      content: `
        <p>Hi Sarah!</p>
        <p>I just bought my first home three months ago, so I can definitely relate to your concerns. Here&apos;s what worked for me:</p>
        <ol>
          <li>In my area, homes were going for about 5-10% over asking, but it really depends on your local market. Talk to a local agent who knows the specific trends in neighborhoods you&apos;re interested in.</li>
          <li>I found that looking at up-and-coming neighborhoods just outside the most popular areas saved me quite a bit. I&apos;m only a 10-minute drive from the hot neighborhood I originally wanted, but paid about 15% less.</li>
          <li>I kept the inspection contingency but waived the appraisal gap since I had extra cash to cover any difference. Never waive the inspection unless you&apos;re very experienced or planning to tear down the property.</li>
          <li>My search took about 4 months and 12 offers before one was accepted.</li>
          <li>Check out First Community Credit Union - they had a first-time homebuyer program with reduced closing costs that saved me thousands.</li>
        </ol>
        <p>Good luck with your search! It&apos;s stressful but worth it in the end.</p>
      `,
      date: 'June 14, 2025',
      likes: 18,
      isLiked: false,
    },
    {
      id: '2',
      author: 'Emily Rodriguez',
      authorRole: 'Mortgage Broker',
      avatar: '/images/avatars/emily.jpg',
      content: `
        <p>As a mortgage broker, I work with first-time homebuyers every day. Here are some additional tips:</p>
        <ul>
          <li>Get pre-approved, not just pre-qualified. This makes your offer stronger.</li>
          <li>Consider an FHA loan if your credit score is below 700 or you have limited down payment funds.</li>
          <li>Look into first-time homebuyer programs in your state - many offer down payment assistance.</li>
          <li>Don&apos;t forget to budget for closing costs, which typically run 2-5% of the loan amount.</li>
          <li>Interest rates have stabilized somewhat, but shopping around can still save you 0.25-0.5% on your rate.</li>
        </ul>
        <p>Feel free to message me if you have specific questions about financing options!</p>
      `,
      date: 'June 15, 2025',
      likes: 22,
      isLiked: false,
    },
    {
      id: '3',
      author: 'David Wilson',
      authorRole: 'Home Inspector',
      avatar: '/images/avatars/david.jpg',
      content: `
        <p>I strongly agree with Michael about keeping the inspection contingency. As a home inspector, I&apos;ve seen too many buyers regret waiving this crucial step.</p>
        <p>Just last week, I inspected a home for a client who almost waived the inspection to make their offer more competitive. We found foundation issues that would have cost $45,000 to repair!</p>
        <p>If sellers won&apos;t allow a full inspection before making an offer (common in hot markets), see if they&apos;ll at least allow a pre-offer walkthrough with an inspector for major issues. It&apos;s not as thorough but better than nothing.</p>
        <p>Also, budget for repairs even if the home seems move-in ready. Almost every home inspection finds at least $3,000-5,000 in recommended repairs or maintenance items.</p>
      `,
      date: 'June 15, 2025',
      likes: 15,
      isLiked: false,
    },
  ]
};

export default function ForumDetailsSection() {
  const [post, setPost] = useState<ForumPost>(FORUM_POST);
  const [newComment, setNewComment] = useState('');
  
  const handleLikePost = () => {
    setPost(prev => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked
    }));
  };
  
  const handleLikeComment = (commentId: string) => {
    setPost(prev => ({
      ...prev,
      comments: prev.comments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked 
            }
          : comment
      )
    }));
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: `${post.comments.length + 1}`,
      author: 'You',
      authorRole: 'Member',
      avatar: '/images/avatars/default.jpg',
      content: `<p>${newComment}</p>`,
      date: 'Just now',
      likes: 0,
      isLiked: false,
    };
    
    setPost(prev => ({
      ...prev,
      comments: [...prev.comments, newCommentObj]
    }));
    
    setNewComment('');
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6">
          <Link href="/community/forums" className="text-primary hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Forums
          </Link>
        </div>
        
        {/* Post Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 mb-2">
                  {post.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                {/* Avatar placeholder */}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{post.author}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{post.authorRole}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{post.views} views</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>{post.comments.length} comments</span>
                </div>
              </div>
              
              <button 
                onClick={handleLikePost}
                className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill={post.isLiked ? "currentColor" : "none"} 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likes} likes</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Comments ({post.comments.length})</h2>
          
          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                      {/* Avatar placeholder */}
                    </div>
                    <div className="ml-3 flex-grow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{comment.author}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{comment.authorRole}</span>
                            <span className="mx-2">•</span>
                            <span>{comment.date}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center space-x-1 ${comment.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5" 
                            fill={comment.isLiked ? "currentColor" : "none"} 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                      <div className="prose prose-sm max-w-none mt-2" dangerouslySetInnerHTML={{ __html: comment.content }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Add Comment Form */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Add Your Comment</h3>
            <form onSubmit={handleSubmitComment}>
              <div className="mb-4">
                <textarea
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-300"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
