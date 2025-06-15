import Image from 'next/image';
import React from 'react';

export default function TeamSection() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Meet the Terra Legacy Team
        </h2>
        
        <p className="text-black mb-12 max-w-3xl text-lg">
          Our team of dedicated professionals brings together decades of experience in real estate, architecture, finance, and customer service.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamMember 
            name="Nikohl Ray"
            role="CEO & Founder"
            image="/images/avatars/2.jpg"
          />
          
          <TeamMember 
            name="Sarah Johnson"
            role="Head of Sales"
            image="/images/avatars/3.jpg"
          />
          
          <TeamMember 
            name="Michael Brown"
            role="Lead Architect"
            image="/images/avatars/4.jpg"
          />
          
          <TeamMember 
            name="Emily Chen"
            role="Client Relations"
            image="/images/avatars/1.jpg"
          />
        </div>
      </div>
    </section>
  );
}

function TeamMember({ name, role, image }:{name: string, role: string, image:string}) {
  return (
    <div className="group">
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">{name}</h3>
              <p className="text-sm text-burgundy">{role}</p>
            </div>
            <div className="bg-burgundy rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
