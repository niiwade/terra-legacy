import React from 'react';
import Image from 'next/image';

export default function ClientsSection() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Our Valued Clients
        </h2>
        
        <p className="text-gray-300 mb-12 max-w-3xl text-lg">
          We've had the privilege of working with a diverse range of clients, from individuals seeking their first home to major corporations establishing their headquarters.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ClientCard 
            company="ABC Corporation"
            industry="Technology"
            logo="/images/clients/client-1.png"
            testimonial="Terra Legacy helped us find the perfect location for our new headquarters. Their understanding of our needs and market expertise made the process seamless."
            author="James Wilson, CEO"
          />
          
          <ClientCard 
            company="GreenTech Enterprises"
            industry="Renewable Energy"
            logo="/images/clients/client-2.png"
            testimonial="Working with Terra Legacy was a game-changer for our expansion plans. Their team's dedication and attention to detail exceeded our expectations."
            author="Lisa Chen, Operations Director"
          />
        </div>
      </div>
    </section>
  );
}

function ClientCard({ company, industry, logo, testimonial, author }) {
  return (
    <div className="bg-charcoal bg-opacity-50 p-8 rounded-lg border border-gray-800 hover:border-burgundy transition-all duration-300">
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 relative flex-shrink-0 bg-white rounded-md overflow-hidden">
          <Image
            src={logo}
            alt={company}
            fill
            className="object-contain p-2"
          />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white">{company}</h3>
          <p className="text-burgundy text-sm mb-4">{industry}</p>
          
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-burgundy mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-gray-400 italic">{testimonial}</p>
          </div>
          
          <p className="text-gray-300 text-sm">{author}</p>
        </div>
      </div>
    </div>
  );
}
