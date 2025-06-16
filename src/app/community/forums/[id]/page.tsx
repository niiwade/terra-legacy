'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ForumDetailsSection from '@/components/community/ForumDetailsSection';

export default function ForumTopicPage() {
  // Access the id directly from params - will be used when implementing forum data
  // const id = params.id;
  
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
