import React from 'react';

export default function ExperienceSection() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Navigating the Terra Legacy Experience
        </h2>
        
        <p className="text-gray-300 mb-12 max-w-3xl text-lg">
          We have designed our process to be seamless and transparent, ensuring you have all the support you need at every stage of your real estate journey.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <ExperienceCard 
            step="Step 1"
            title="Personal Consultation"
            description="We begin with a detailed consultation to understand your unique needs, preferences, and budget constraints."
          />
          
          <ExperienceCard 
            step="Step 2"
            title="Tailored Property Search"
            description="Our experts curate a selection of properties that perfectly align with your requirements and aspirations."
          />
          
          <ExperienceCard 
            step="Step 3"
            title="Guided Tours"
            description="Experience personalized property tours with our knowledgeable agents who can answer all your questions."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ExperienceCard 
            step="Step 4"
            title="Expert Negotiation"
            description="We leverage our market expertise to negotiate the best possible terms and price for your chosen property."
          />
          
          <ExperienceCard 
            step="Step 5"
            title="Seamless Transaction"
            description="Our team handles all paperwork and legal requirements, ensuring a smooth and stress-free closing process."
          />
          
          <ExperienceCard 
            step="Step 6"
            title="Ongoing Support"
            description="Our relationship doesn't end at closing. We provide continued support for all your future real estate needs."
          />
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ step, title, description }: {step: string, title: string, description:string}) {
  return (
    <div className="bg-charcoal bg-opacity-50 p-8 rounded-lg border border-gray-800 hover:border-burgundy transition-all duration-300">
      <div className="flex flex-col h-full">
        <span className="text-burgundy text-sm font-medium mb-2">{step}</span>
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <p className="text-gray-400 flex-grow">{description}</p>
      </div>
    </div>
  );
}
