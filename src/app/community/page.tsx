'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import EventsSection from '@/components/community/EventsSection';
import ForumsSection from '@/components/community/ForumsSection';
import VolunteerSection from '@/components/community/VolunteerSection';
import ResourcesSection from '@/components/community/ResourcesSection';
import CTASection from '@/components/CTASection';

export default function CommunityPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">Events & Community</h1>
            <p className="text-xl mb-8" data-aos="fade-up" data-aos-delay="100">
              Connect with neighbors, participate in local events, and build stronger communities together.
            </p>
            <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
              <a 
                href="#events" 
                className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-colors duration-300"
              >
                Explore Events
              </a>
              <a 
                href="#volunteer" 
                className="px-6 py-3 bg-transparent border border-white text-black font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
              >
                Volunteer
              </a>
              <a 
                href="/community/marketplace" 
                className="px-6 py-3 bg-primary-light text-black font-medium rounded-md hover:bg-primary-light hover:bg-opacity-90 transition-colors duration-300"
              >
                Marketplace
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-aos="fade-up">
              <div className="text-4xl font-bold text-primary mb-2">24+</div>
              <div className="text-gray-600">Monthly Events</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="text-4xl font-bold text-primary mb-2">12+</div>
              <div className="text-gray-600">Neighborhoods</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Volunteers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <div id="events">
        <EventsSection />
      </div>

      {/* Forums Section */}
      <div id="forums">
        <ForumsSection />
      </div>

      {/* Volunteer Section */}
      <div id="volunteer">
        <VolunteerSection />
      </div>

      {/* Resources Section */}
      <div id="resources">
        <ResourcesSection />
      </div>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">Stay Connected</h2>
            <p className="text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="100">
              Subscribe to our community newsletter to stay updated on events, volunteer opportunities, and resources.
            </p>
            <form className="flex flex-col md:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-grow max-w-md"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4" data-aos="fade-up" data-aos-delay="300">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
