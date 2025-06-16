'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EventDetailsSection from '@/components/community/EventDetailsSection';

// Sample event data
const EVENTS = {
  '1': {
    id: '1',
    title: 'Community Garden Day',
    date: 'June 25, 2025',
    time: '10:00 AM - 3:00 PM',
    location: 'Central Park Community Garden',
    address: '123 Park Avenue, Greenville, CA 94301',
    description: 'Join us for a day of planting, gardening workshops, and community building. Learn sustainable gardening practices and connect with fellow community members.',
    longDescription: 'The Community Garden Day is our flagship annual event bringing together gardening enthusiasts, sustainability advocates, and community members for a day of learning, sharing, and growing together.\n\nThis year\'s event will feature expert-led workshops on organic gardening techniques, composting, urban farming, and native plant cultivation. Families are welcome, with special activities planned for children to learn about plants and ecosystems in a fun, interactive way.\n\nParticipants will have the opportunity to contribute to our community garden expansion project, planting vegetables, herbs, and flowers that will later be harvested for local food banks and community kitchens.\n\nRefreshments will be provided, featuring locally-sourced ingredients and produce from our very own community garden. This is a wonderful opportunity to meet neighbors, share gardening tips, and contribute to a greener, more sustainable community.',
    image: '/images/events/garden-day.jpg',
    organizer: 'Terra Legacy Community Outreach',
    organizerContact: 'community@terralegacy.com',
    registrationRequired: true,
    registrationLink: 'https://terralegacy.com/events/register/1',
    capacity: 75,
    attendees: 42,
    tags: ['Gardening', 'Sustainability', 'Community'],
  },
  '2': {
    id: '2',
    title: 'Sustainable Housing Workshop',
    date: 'July 10, 2025',
    time: '1:00 PM - 5:00 PM',
    location: 'Terra Legacy Headquarters',
    address: '456 Main Street, Suite 200, Greenville, CA 94302',
    description: 'Discover the latest innovations in sustainable housing. Expert speakers will discuss eco-friendly building materials, energy efficiency, and sustainable design principles.',
    longDescription: 'The Sustainable Housing Workshop is designed for homeowners, architects, builders, and anyone interested in creating more environmentally friendly living spaces.\n\nOur panel of expert speakers includes award-winning green architects, sustainable materials specialists, and energy efficiency consultants who will share their knowledge and insights on creating homes that are both beautiful and environmentally responsible.\n\nTopics covered will include:\n\n- Latest innovations in eco-friendly building materials\n- Energy-efficient design principles and technologies\n- Water conservation systems for residential properties\n- Smart home technologies that reduce environmental impact\n- Cost considerations and return on investment for sustainable upgrades\n- Available tax incentives and rebates for green home improvements\n\nAttendees will have the opportunity to view material samples, product demonstrations, and connect with vendors and service providers specializing in sustainable home solutions.\n\nWhether you\'re planning a new build, renovating an existing property, or simply interested in making your home more sustainable, this workshop will provide valuable information and practical steps you can take.',
    image: '/images/events/sustainable-workshop.jpg',
    organizer: 'Dr. Michael Chen, Sustainability Director',
    organizerContact: 'mchen@terralegacy.com',
    registrationRequired: true,
    registrationLink: 'https://terralegacy.com/events/register/2',
    capacity: 50,
    attendees: 38,
    tags: ['Sustainability', 'Housing', 'Education'],
  },
  '3': {
    id: '3',
    title: 'Neighborhood Cleanup Initiative',
    date: 'July 18, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'Riverside Community',
    address: '789 River Road, Greenville, CA 94303',
    description: 'Help make our community cleaner and greener! Join fellow residents in this cleanup initiative. Equipment and refreshments will be provided.',
    longDescription: 'The Neighborhood Cleanup Initiative is part of our ongoing commitment to maintaining beautiful, clean, and safe communities for all residents.\n\nParticipants will be organized into teams to clean up litter, remove invasive plants, and beautify public spaces throughout the Riverside Community. All necessary equipment will be provided, including gloves, trash bags, and safety vests.\n\nThis is a family-friendly event, with age-appropriate tasks available for children accompanied by adults. It\'s a great opportunity to teach younger generations about environmental stewardship and community responsibility.\n\nFollowing the cleanup activities, all volunteers are invited to a community picnic with refreshments, music, and games. This is a wonderful chance to meet neighbors, build community connections, and celebrate our collective efforts to improve our shared spaces.\n\nIn case of inclement weather, a rain date will be announced. Please wear comfortable clothing and closed-toe shoes suitable for outdoor work.',
    image: '/images/events/cleanup.jpg',
    organizer: 'Sarah Johnson, Community Relations',
    organizerContact: 'sjohnson@terralegacy.com',
    registrationRequired: false,
    capacity: 100,
    attendees: 35,
    tags: ['Community', 'Environment', 'Volunteer'],
  },
  '4': {
    id: '4',
    title: 'Homebuyers Workshop',
    date: 'August 5, 2025',
    time: '6:00 PM - 8:30 PM',
    location: 'Terra Legacy Learning Center',
    address: '321 Oak Street, Greenville, CA 94301',
    description: 'A comprehensive workshop for first-time homebuyers covering the entire purchasing process, from financing to closing.',
    longDescription: 'Buying your first home can be an exciting but overwhelming experience. Our Homebuyers Workshop is designed to demystify the process and equip you with the knowledge and tools you need to make informed decisions.\n\nLed by experienced real estate professionals, mortgage specialists, and legal experts, this workshop will walk you through each step of the home buying journey.\n\nTopics covered include:\n\n- Assessing your readiness to buy a home\n- Understanding your credit score and improving it if necessary\n- Saving for a down payment and closing costs\n- Getting pre-approved for a mortgage\n- Different types of loans and financing options\n- Working with real estate agents\n- The home search process\n- Making an offer and negotiating\n- Home inspections and appraisals\n- The closing process and what to expect\n\nParticipants will receive a comprehensive homebuyer\'s guide, worksheets to help with budgeting and planning, and access to exclusive resources for first-time buyers.\n\nRefreshments will be provided, and there will be ample opportunity for questions and one-on-one consultations with our experts after the presentation.',
    image: '/images/events/homebuyers.jpg',
    organizer: 'Emily Rodriguez, Education Coordinator',
    organizerContact: 'erodriguez@terralegacy.com',
    registrationRequired: true,
    registrationLink: 'https://terralegacy.com/events/register/4',
    capacity: 40,
    attendees: 22,
    tags: ['Education', 'Homebuying', 'Finance'],
  },
  '5': {
    id: '5',
    title: 'Community Association Leadership Summit',
    date: 'August 15, 2025',
    time: '9:00 AM - 4:00 PM',
    location: 'Greenville Conference Center',
    address: '555 Convention Way, Greenville, CA 94305',
    description: 'A day-long summit for HOA board members and community leaders to learn best practices in community governance, conflict resolution, and planning.',
    longDescription: 'The Community Association Leadership Summit is an intensive, informative day designed specifically for homeowners association board members, committee chairs, and other community leaders.\n\nThis professional development opportunity will help you become a more effective leader in your community association, equipped with the knowledge, skills, and network to tackle common challenges and implement best practices.\n\nThe summit will feature keynote speakers, panel discussions, and breakout sessions covering topics such as:\n\n- Legal responsibilities and risk management for board members\n- Financial management and budgeting for community associations\n- Effective communication strategies with homeowners\n- Conflict resolution and community mediation techniques\n- Strategic planning and capital improvements\n- Technology solutions for modern community management\n- Enhancing community engagement and volunteerism\n\nParticipants will have the opportunity to network with peers from other communities, share experiences, and learn from each other\'s successes and challenges.\n\nRegistration includes all sessions, materials, breakfast, lunch, and refreshments throughout the day. Space is limited to ensure quality interaction and discussion.',
    image: '/images/events/leadership-summit.jpg',
    organizer: 'David Wilson, Community Relations Director',
    organizerContact: 'dwilson@terralegacy.com',
    registrationRequired: true,
    registrationLink: 'https://terralegacy.com/events/register/5',
    capacity: 60,
    attendees: 48,
    tags: ['Leadership', 'HOA', 'Education'],
  }
};

export default function EventPage({ params }: { params: { id: string } }) {
  // Access the id directly from params
  const id = params.id;
  const event = EVENTS[id as keyof typeof EVENTS];
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);
  
  if (!event) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <EventDetailsSection event={event} />
    </div>
  );
}
