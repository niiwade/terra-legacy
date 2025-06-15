'use client'
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black/40">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/herobg.mp4" type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <Image 
            src="/images/modern-house.jpg" 
            alt="Modern real estate properties" 
            fill 
            priority
            className="object-cover"
          />
        </video>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 z-10 flex flex-col items-center justify-center py-16 text-center">
        {/* Hero content */}
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Empowering Future Landowners
          </h1>
          <p className="text-white text-xl mb-8 max-w-3xl mx-auto">
            Unlock the potential of land ownership with our comprehensive courses and curated land listings. Start your journey towards sustainable land stewardship today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              href="/courses" 
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-medium rounded-md transition-all duration-300 text-lg"
            >
              Explore Courses
            </Link>
            <a 
              href="/store" 
              className="px-8 py-4 bg-white hover:bg-gray-100 text-black font-medium rounded-md transition-all duration-300 text-lg"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
