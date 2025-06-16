'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ForumDetailsSection from '@/components/community/ForumDetailsSection';

type ForumTopicPageProps = {
  params: {
    id: string;
  };
};

export default function ForumTopicPage({ params }: ForumTopicPageProps) {
  const { id } = params;
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ForumDetailsSection />
    </div>
  );
}
