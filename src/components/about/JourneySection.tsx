import Image from 'next/image';

export default function JourneySection() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Our Journey
            </h1>
            <p className="text-gray-300 mb-8 text-lg">
              Terra Legacy began with a vision to transform the real estate industry through innovation, 
              transparency, and exceptional service. Since our founding, we&apos;ve grown from a small 
              team of passionate individuals to a leading force in the market.
            </p>
            
            <div className="flex flex-wrap gap-12 mt-10">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-burgundy">250+</p>
                <p className="text-sm text-gray-400">Properties Listed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-burgundy">100+</p>
                <p className="text-sm text-gray-400">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-burgundy">15+</p>
                <p className="text-sm text-gray-400">Years Experience</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full h-[300px] md:h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 border-4 border-burgundy rounded-lg transform rotate-6"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-black rounded-lg transform -rotate-3"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                      <Image
                        src="/images/modern-house.jpg"
                        alt="Modern House"
                        fill
                        className="object-cover rounded-lg"
                        style={{ objectPosition: 'center' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-black rounded-full flex items-center justify-center border-2 border-burgundy">
                  <div className="relative w-full h-full p-4">
                    <div className="w-full h-full relative">
                      <Image
                        src="/images/hand-house.jpg"
                        alt="Hand holding house model"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
