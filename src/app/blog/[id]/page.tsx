'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AOS from 'aos';

// Blog post interface
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
  tags: string | null;
  authorName: string | null;
  authorEmail: string | null;
  viewCount: number | null;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // Fetch blog post
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/public/content/${postId}`);

        if (!res.ok) {
          throw new Error('Blog post not found');
        }

        const data = await res.json();
        setPost(data.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchBlog();
    }
  }, [postId]);

  // Fetch related posts
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch('/api/public/content?type=blogs&limit=4');
        const data = await res.json();
        if (data.data) {
          // Filter out current post
          const filtered = data.data.filter((p: any) => p.id !== postId).slice(0, 3);
          setRelatedPosts(filtered);
        }
      } catch (err) {
        console.error('Error fetching related posts:', err);
      }
    };

    if (postId) {
      fetchRelated();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3c4b33]"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link href="/blog" className="text-[#3c4b33] hover:text-[#4a5d3f] font-medium">
            ← Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  // Parse tags
  let category = 'News';
  if (post.tags) {
    try {
      const parsed = JSON.parse(post.tags);
      if (Array.isArray(parsed) && parsed.length > 0) {
        category = parsed[0];
      }
    } catch {
      category = 'News';
    }
  }

  // Format date
  const dateStr = post.publishedAt || post.createdAt;
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const authorName = post.authorName || 'Terra Legacy';
  const coverImage = post.coverImageUrl || '/images/blog/1.jpg';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6" data-aos="fade-up">
          <Link href="/blog" className="text-[#3c4b33] hover:text-[#4a5d3f] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all posts
          </Link>
        </div>

        <article className="bg-white rounded-lg overflow-hidden shadow-md" data-aos="fade-up">
          <div className="relative h-96 w-full">
            <Image
              src={coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8">
            <div className="mb-4">
              <span className="text-sm font-medium text-[#6f8d5e] uppercase tracking-wider">{category}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex items-center mb-8">
              <div className="flex-shrink-0">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-[#3c4b33] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {authorName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{authorName}</p>
                <div className="flex space-x-1 text-xs text-gray-500">
                  <time dateTime={dateStr}>{formattedDate}</time>
                  {post.viewCount !== null && post.viewCount > 0 && (
                    <>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.viewCount} views</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {post.excerpt && (
              <div className="mb-6 p-4 bg-gray-50 border-l-4 border-[#3c4b33] rounded">
                <p className="text-gray-700 italic">{post.excerpt}</p>
              </div>
            )}

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden bg-[#3c4b33] flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {authorName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">Written by {authorName}</h3>
                  <p className="text-gray-600">Contributing author at Terra Legacy Land Services</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-16" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => {
                // Parse related post data
                let relatedCategory = 'News';
                if (relatedPost.tags) {
                  try {
                    const parsed = JSON.parse(relatedPost.tags);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                      relatedCategory = parsed[0];
                    }
                  } catch {
                    relatedCategory = 'News';
                  }
                }

                const relatedDate = new Date(relatedPost.publishedAt || relatedPost.createdAt);
                const relatedFormattedDate = relatedDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                });

                const relatedImage = relatedPost.coverImageUrl || '/images/blog/1.jpg';
                const relatedAuthor = relatedPost.authorName || 'Terra Legacy';

                return (
                  <div
                    key={relatedPost.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Link href={`/blog/${relatedPost.id}`} className="block">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={relatedImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-[#6f8d5e] uppercase tracking-wider">{relatedCategory}</span>
                      </div>
                      <Link href={`/blog/${relatedPost.id}`} className="block">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#3c4b33] transition-colors">
                          {relatedPost.title}
                        </h3>
                      </Link>

                      <div className="flex items-center mt-4">
                        <div className="flex-shrink-0">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden bg-[#3c4b33] flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {relatedAuthor.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{relatedAuthor}</p>
                          <div className="flex space-x-1 text-xs text-gray-500">
                            <time dateTime={relatedPost.publishedAt || relatedPost.createdAt}>{relatedFormattedDate}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
