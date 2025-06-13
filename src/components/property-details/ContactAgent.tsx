import React from 'react';
import Image from 'next/image';

interface AgentProps {
  name: string;
  phone: string;
  email: string;
  image: string;
}

interface ContactAgentProps {
  agent: AgentProps;
}

export default function ContactAgent({ agent }: ContactAgentProps): React.ReactElement {
  return (
    <section className="bg-charcoal bg-opacity-50 p-6 rounded-xl mb-8 border border-gray-800 shadow-lg reveal animate-fade-in">
      <h3 className="text-xl font-semibold mb-6 text-burgundy">Inquire About This Property</h3>
      
      <div className="flex items-center mb-6 bg-black bg-opacity-40 p-4 rounded-lg">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-burgundy">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-white text-lg">{agent.name}</h4>
          <p className="text-burgundy text-sm font-medium">Luxury Property Specialist</p>
          <div className="flex items-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>
      
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
            Your Name
          </label>
          <input 
            type="text" 
            id="name" 
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
            placeholder="Enter your name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
            Your Email
          </label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
            Your Phone
          </label>
          <input 
            type="tel" 
            id="phone" 
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
            placeholder="Enter your phone number"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
            Message
          </label>
          <textarea 
            id="message" 
            rows={4}
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
            placeholder="I'm interested in this property"
            defaultValue="I'm interested in this property and would like to schedule a viewing. Please contact me with more information."
          ></textarea>
        </div>
        
        <button className="w-full bg-burgundy hover:bg-opacity-90 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-lg hover:shadow-burgundy/30 transform hover:-translate-y-1">
          Send Message
        </button>
      </form>
      
      <div className="mt-6 pt-6 border-t border-gray-700 bg-black bg-opacity-30 p-4 rounded-lg -mx-2">
        <div className="flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a href={`tel:${agent.phone}`} className="text-gray-300 hover:text-burgundy transition-colors">
            {agent.phone}
          </a>
        </div>
        
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a href={`mailto:${agent.email}`} className="text-gray-300 hover:text-burgundy transition-colors">
            {agent.email}
          </a>
        </div>
      </div>
    </section>
  );
}
