import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import EventDetailsSection from '@/components/community/EventDetailsSection';

// Define the type for event data
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  longDescription: string;
  image: string;
  organizer: string;
  organizerContact: string;
  registrationRequired: boolean;
  registrationLink?: string;
  capacity: number;
  attendees: number;
  tags: string[];
}

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
    description: 'Help beautify our community by participating in our cleanup day. Supplies will be provided, just bring your enthusiasm and community spirit!',
    longDescription: 'The Neighborhood Cleanup Initiative is a quarterly event that brings residents together to beautify our community spaces and foster a sense of shared responsibility for our environment.\n\nThis summer\'s cleanup will focus on the Riverside Community area, including the riverfront walking paths, community playgrounds, and public green spaces. We\'ll be removing litter, clearing invasive plant species, and performing basic maintenance on community facilities.\n\nAll necessary supplies will be provided, including gloves, trash bags, tools, and safety equipment. Volunteers should wear comfortable clothing and closed-toe shoes appropriate for outdoor work. Sunscreen and water bottles are recommended.\n\nThis is a family-friendly event, with age-appropriate tasks available for children accompanied by adults. It\'s a great opportunity to meet neighbors, build community connections, and make a visible positive impact on our shared spaces.\n\nNo registration is required - simply show up ready to help! Refreshments will be provided for all volunteers.',
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
    longDescription: 'The Homebuyers Workshop is designed specifically for first-time homebuyers who want to understand the entire process of purchasing a home, from initial financial preparation through closing.\n\nOur experienced real estate professionals will guide you through each step of the homebuying journey, explaining complex concepts in accessible terms and providing practical advice based on current market conditions.\n\nTopics covered will include:\n\n- Assessing your financial readiness to buy a home\n- Understanding mortgage options and the pre-approval process\n- Determining your budget and identifying your needs vs. wants\n- Working with real estate agents, lenders, and other professionals\n- Navigating the home search process efficiently\n- Making competitive offers in today\'s market\n- Understanding inspection reports and negotiating repairs\n- Preparing for closing and associated costs\n\nParticipants will receive a comprehensive homebuyer\'s guide, worksheets to help with budgeting and home evaluation, and a certificate of completion that may qualify for certain first-time homebuyer assistance programs.\n\nSpace is limited to ensure personalized attention, so advance registration is required.',
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

// Define the params type
type EventParams = {
  id: string;
}

// Main page component
export default function EventPage({ params }: { params: EventParams }) {
  const id = params.id;
  const event = EVENTS[id as keyof typeof EVENTS] as Event | undefined;
  
  if (!event) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <EventDetailsSection event={event} />
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: EventParams 
}): Promise<Metadata> {
  const id = params.id;
  const event = EVENTS[id as keyof typeof EVENTS] as Event | undefined;
  
  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }
  
  return {
    title: event.title,
    description: event.description,
  };
}
