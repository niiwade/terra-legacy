'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { withAuth } from '@/contexts/AuthContext';

import MarketplaceSection from '@/components/community/MarketplaceSection';
import CTASection from '@/components/CTASection';

function MarketplacePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">Community Marketplace</h1>
            <p className="text-xl mb-8" data-aos="fade-up" data-aos-delay="100">
              Advertise your websites, services, and products to connect with the Terra Legacy community.
            </p>
            <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
              <a 
                href="#listings" 
                className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-colors duration-300"
              >
                Browse Listings
              </a>
              <a 
                href="#create" 
                className="px-6 py-3 bg-transparent border border-white text-black font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
              >
                Create Listing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-aos="fade-up">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-gray-600">Active Listings</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-gray-600">Monthly Visitors</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <div id="listings">
        <MarketplaceSection />
      </div>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

export default withAuth(MarketplacePage, {
  requireAuth: true,
  requireMembership: 'gold'
});
