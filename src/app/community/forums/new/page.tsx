'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Category = {
  id: string;
  name: string;
};

const CATEGORIES: Category[] = [
  { id: '1', name: 'Real Estate Market' },
  { id: '2', name: 'Buying & Selling' },
  { id: '3', name: 'Home Improvement' },
  { id: '4', name: 'Neighborhoods & Communities' },
  { id: '5', name: 'Investment Properties' },
];

// Create a separate client component that uses useSearchParams
// This component must be wrapped in Suspense in the parent component
import { useSearchParams } from 'next/navigation';

function NewTopicFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category');
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categoryParam || '');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{title?: string; category?: string; content?: string}>({});
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
    
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [categoryParam]);
  
  const validateForm = () => {
    const newErrors: {title?: string; category?: string; content?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real application, you would submit the form data to your backend
      console.log({
        title,
        category,
        content
      });
      
      // Redirect to the forums page
      router.push('/community/forums');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Header */}
      <div className="mb-8">
        <Link href="/community/forums" className="text-primary hover:underline flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Forums
        </Link>
        
        <h1 className="text-3xl font-bold mb-2" data-aos="fade-up">Create New Topic</h1>
        <p className="text-gray-600" data-aos="fade-up" data-aos-delay="100">
          Start a new discussion in our community forums. Please make sure your topic follows our community guidelines.
        </p>
      </div>
      
      {/* New Topic Form */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="200">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Topic Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter a descriptive title for your topic"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={10}
              placeholder="Write your topic content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
            <p className="mt-2 text-sm text-gray-500">
              You can use basic formatting: **bold**, *italic*, [link text](url)
            </p>
          </div>
          
          <div className="flex justify-end">
            <Link
              href="/community/forums"
              className="px-6 py-2 mr-4 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors duration-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-300 flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Create Topic'
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Forum Guidelines */}
      <div className="bg-blue-50 rounded-lg p-6 mt-8" data-aos="fade-up" data-aos-delay="300">
        <h3 className="text-lg font-medium text-blue-800 mb-4">Forum Guidelines</h3>
        <ul className="list-disc pl-5 text-blue-700 space-y-2">
          <li>Be respectful and courteous to other members.</li>
          <li>Stay on topic and keep discussions relevant to the category.</li>
          <li>No promotional content or spam.</li>
          <li>Do not share personal information of others without consent.</li>
          <li>Use descriptive titles that summarize your topic.</li>
          <li>Search before posting to avoid duplicate topics.</li>
        </ul>
      </div>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          
          <div className="flex justify-end">
            <div className="h-10 bg-gray-200 rounded w-24 mr-4"></div>
            <div className="h-10 bg-primary-light rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component that wraps the form in a Suspense boundary
export default function NewTopicPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NewTopicFormContent />
    </Suspense>
  );
}
