'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import AOS from 'aos';

export default function CTASection() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="w-full py-12 px-6 md:px-12 bg-burgundy text-white transition-all duration-500" data-aos="fade-up">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4" data-aos="fade" data-aos-delay="200">Start Your Real Estate Journey Today</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Whether you&apos;re looking to buy, sell, or rent, our team of experienced professionals is here to help you every step of the way.
        </p>
        <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-100 hover:text-burgundy transition-all duration-300 transform hover:scale-105 inline-block">
          Talk To Us
        </Link>
      </div>
    </section>
  );
}
