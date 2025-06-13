import React from 'react';

export default function ValuesSection() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
          Our Values
        </h2>
        
        <p className="text-gray-300 mb-12 max-w-3xl text-lg">
          At Terra Legacy, our values guide everything we do. We believe in creating exceptional experiences 
          for our clients while maintaining the highest standards of integrity and professionalism.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ValueCard 
            icon={<CircleIcon className="w-8 h-8 text-burgundy" />}
            title="Trust"
            description="We build lasting relationships based on trust and transparency, ensuring our clients feel confident in every decision."
          />
          
          <ValueCard 
            icon={<LightbulbIcon className="w-8 h-8 text-burgundy" />}
            title="Innovation"
            description="We constantly explore new ideas and technologies to provide cutting-edge solutions for our clients' real estate needs."
          />
          
          <ValueCard 
            icon={<UsersIcon className="w-8 h-8 text-burgundy" />}
            title="Client-Centric"
            description="We put our clients at the center of everything we do, tailoring our services to meet their unique requirements."
          />
          
          <ValueCard 
            icon={<StarIcon className="w-8 h-8 text-burgundy" />}
            title="Excellence"
            description="We strive for excellence in every aspect of our work, from property selection to client communication and beyond."
          />
        </div>
      </div>
    </section>
  );
}

function ValueCard({ icon, title, description }:{icon: React.ReactNode, title: string, description: string}) {
  return (
    <div className="bg-charcoal bg-opacity-50 p-6 rounded-lg border border-gray-800 hover:border-burgundy transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-black bg-opacity-50 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Icon Components
function CircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11.5a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}
