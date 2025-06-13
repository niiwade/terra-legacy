import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full flex flex-col lg:flex-row items-center justify-between py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="w-full lg:w-1/2 mb-16 lg:mb-0 z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-charcoal">
          Discover Your Dream<br />Property with Terra Legacy
        </h1>
        <p className="text-charcoal/80 mb-8 max-w-lg text-lg">
          Find the perfect place to call home with our extensive collection of properties. 
          Our experts are here to guide you every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/listings" className="bg-burgundy text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 text-center transition-colors shadow-md">
            View Listings
          </Link>
          <Link href="/contact" className="border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-blush hover:text-burgundy hover:border-burgundy text-center transition-all">
            Get in Touch
          </Link>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 relative h-[350px] sm:h-[400px] lg:h-[500px]">
        <div className="absolute top-0 right-0 w-[250px] h-[250px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] bg-gradient-to-br from-blue-400 to-burgundy rounded-md transform rotate-3 shadow-xl">
          <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>
        </div>
        <div className="absolute top-10 right-10 w-[250px] h-[250px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] bg-gradient-to-br from-blush to-burgundy rounded-md transform -rotate-3 shadow-xl">
          <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>
        </div>
      </div>
      
      <div className="absolute -bottom-1 left-0 right-0 flex justify-center gap-8 sm:gap-16 md:gap-32 py-6 md:py-8 bg-white shadow-md rounded-t-3xl">
        <div className="text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-burgundy">250+</p>
          <p className="text-xs sm:text-sm text-charcoal">Properties Listed</p>
        </div>
        <div className="text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-burgundy">100+</p>
          <p className="text-xs sm:text-sm text-charcoal">Happy Customers</p>
        </div>
        <div className="text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-burgundy">15+</p>
          <p className="text-xs sm:text-sm text-charcoal">Years of Experience</p>
        </div>
      </div>
    </section>
  );
}
