'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ResourcesSection from '@/components/community/ResourcesSection';

export default function ResourcesPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of helpful resources for homeowners, buyers, and community members.
            Click on any resource to view detailed information.
          </p>
        </div>

        <ResourcesSection showViewDetailsButton={true} />
      </div>
    </div>
  );
}
