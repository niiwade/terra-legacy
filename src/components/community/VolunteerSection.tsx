'use client';

import { useState } from 'react';
import Link from 'next/link';

type VolunteerOpportunity = {
  id: string;
  title: string;
  organization: string;
  location: string;
  date: string;
  description: string;
  skills: string[];
  commitment: string;
};

const VOLUNTEER_OPPORTUNITIES: VolunteerOpportunity[] = [
  {
    id: '1',
    title: 'Community Garden Coordinator',
    organization: 'Green Spaces Initiative',
    location: 'Central Park Community Garden',
    date: 'Ongoing',
    description: 'Help coordinate and maintain our community garden. Responsibilities include organizing volunteer schedules, planning planting activities, and ensuring the garden thrives.',
    skills: ['Gardening', 'Organization', 'Leadership'],
    commitment: '5-10 hours per month',
  },
  {
    id: '2',
    title: 'Neighborhood Cleanup Volunteer',
    organization: 'Clean Communities Coalition',
    location: 'Various Neighborhoods',
    date: 'Monthly - Third Saturday',
    description: 'Join our monthly cleanup efforts to keep our neighborhoods beautiful. We provide all necessary equipment and refreshments for volunteers.',
    skills: ['Teamwork', 'Physical Activity'],
    commitment: '3 hours per month',
  },
  {
    id: '3',
    title: 'Housing Assistance Mentor',
    organization: 'Terra Legacy Foundation',
    location: 'Terra Legacy Headquarters',
    date: 'Flexible Schedule',
    description: 'Mentor individuals and families navigating the housing market for the first time. Provide guidance, resources, and support throughout their journey.',
    skills: ['Communication', 'Real Estate Knowledge', 'Empathy'],
    commitment: '8 hours per month',
  },
  {
    id: '4',
    title: 'Community Events Planner',
    organization: 'Neighborhood Association',
    location: 'Community Center',
    date: 'Ongoing',
    description: 'Help plan and execute community events that bring neighbors together. From block parties to educational workshops, your creativity will help build stronger community bonds.',
    skills: ['Event Planning', 'Creativity', 'Organization'],
    commitment: '10 hours per month',
  },
];

export default function VolunteerSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-aos="fade-up">Volunteer Opportunities</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
          Make a difference in your community by volunteering your time and skills. Explore these opportunities to get involved and give back.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VOLUNTEER_OPPORTUNITIES.map((opportunity, index) => (
            <div 
              key={opportunity.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {opportunity.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-gray-500 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{opportunity.organization}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{opportunity.date}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{opportunity.commitment}</span>
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-300 ${expandedId === opportunity.id ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <button 
                    onClick={() => toggleExpand(opportunity.id)} 
                    className="text-primary font-medium hover:underline flex items-center"
                  >
                    {expandedId === opportunity.id ? 'Show less' : 'Show more'}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ml-1 transition-transform duration-300 ${expandedId === opportunity.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <Link 
                    href={`/community/volunteer/${opportunity.id}`} 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up">
          <Link 
            href="/community/volunteer" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            View All Opportunities
          </Link>
        </div>
      </div>
    </section>
  );
}
