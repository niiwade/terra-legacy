'use client';
import Image from 'next/image';
import { useState } from 'react';

type MarketplaceListing = {
  id: string;
  title: string;
  description: string;
  websiteUrl: string;
  image: string;
  category: string;
  owner: {
    name: string;
    avatar: string;
  };
  featured: boolean;
  createdAt: string;
};

const CATEGORIES = [
  'All',
  'Real Estate',
  'Home Services',
  'Community Projects',
  'Local Businesses',
  'Events',
  'Education',
  'Camping & Outdoors',
  'Farming & Gardening',
  'Cross-Promotion',
  'Collaboration',
];

const LISTINGS: MarketplaceListing[] = [
  {
    id: '1',
    title: 'Eco-Friendly Home Designs',
    description: 'Explore our portfolio of sustainable home designs with modern aesthetics and energy-efficient features.',
    websiteUrl: 'https://example.com/eco-homes',
    image: '/images/marketplace/1.jpg',
    category: 'Real Estate',
    owner: {
      name: 'Green Living Architects',
      avatar: '/images/avatars/1.jpg',
    },
    featured: true,
    createdAt: '2025-06-15',
  },
  {
    id: '2',
    title: 'Community Garden Supplies',
    description: 'Quality gardening tools, organic seeds, and supplies for community gardens and home gardeners.',
    websiteUrl: 'https://example.com/garden-supplies',
    image: '/images/marketplace/2.jpg',
    category: 'Home Services',
    owner: {
      name: 'Urban Gardener Co.',
      avatar: '/images/avatars/2.jpg',
    },
    featured: false,
    createdAt: '2025-06-10',
  },
  {
    id: '3',
    title: 'Solar Panel Installation Services',
    description: 'Professional solar panel installation for residential and commercial properties. Free consultations available.',
    websiteUrl: 'https://example.com/solar-services',
    image: '/images/marketplace/3.jpg',
    category: 'Home Services',
    owner: {
      name: 'SunPower Solutions',
      avatar: '/images/avatars/3.jpg',
    },
    featured: true,
    createdAt: '2025-06-08',
  },
  {
    id: '4',
    title: 'Neighborhood Watch App',
    description: 'A mobile application designed to help communities organize and maintain neighborhood watch programs.',
    websiteUrl: 'https://example.com/watch-app',
    image: '/images/marketplace/4.jpg',
    category: 'Community Projects',
    owner: {
      name: 'SafeStreet Technologies',
      avatar: '/images/avatars/4.jpg',
    },
    featured: false,
    createdAt: '2025-06-05',
  },
  {
    id: '5',
    title: 'Local Farmers Market',
    description: 'Weekly farmers market featuring local produce, artisanal foods, and handcrafted goods.',
    websiteUrl: 'https://example.com/farmers-market',
    image: '/images/marketplace/5.jpg',
    category: 'Local Businesses',
    owner: {
      name: 'Community Harvest',
      avatar: '/images/avatars/5.jpg',
    },
    featured: true,
    createdAt: '2025-06-01',
  },
  {
    id: '6',
    title: 'Sustainable Living Workshop',
    description: 'Online workshop series teaching practical skills for sustainable living and reducing environmental impact.',
    websiteUrl: 'https://example.com/eco-workshops',
    image: '/images/marketplace/6.jpg',
    category: 'Education',
    owner: {
      name: 'EcoLife Academy',
      avatar: '/images/avatars/6.jpg',
    },
    featured: false,
    createdAt: '2025-05-28',
  },
  {
    id: '7',
    title: 'Outdoor Adventure Gear',
    description: 'Premium camping equipment and outdoor gear for your next wilderness adventure. High-quality tents, backpacks, and survival tools.',
    websiteUrl: 'https://example.com/outdoor-gear',
    image: '/images/marketplace/7.jpg',
    category: 'Camping & Outdoors',
    owner: {
      name: 'Wilderness Outfitters',
      avatar: '/images/avatars/7.jpg',
    },
    featured: true,
    createdAt: '2025-05-25',
  },
  {
    id: '8',
    title: 'Organic Seeds & Garden Tools',
    description: 'Heirloom organic seeds and professional-grade gardening tools. Everything you need to start your sustainable garden.',
    websiteUrl: 'https://example.com/organic-garden',
    image: '/images/marketplace/8.jpg',
    category: 'Farming & Gardening',
    owner: {
      name: 'Heritage Gardens',
      avatar: '/images/avatars/8.jpg',
    },
    featured: false,
    createdAt: '2025-05-20',
  },
  {
    id: '9',
    title: 'Partnership: Land Conservation Project',
    description: 'Seeking collaborative partners for a large-scale land conservation initiative. Perfect for cross-promotion and community impact.',
    websiteUrl: 'https://example.com/conservation-partner',
    image: '/images/marketplace/9.jpg',
    category: 'Cross-Promotion',
    owner: {
      name: 'Green Earth Initiative',
      avatar: '/images/avatars/9.jpg',
    },
    featured: true,
    createdAt: '2025-05-18',
  },
];

export default function MarketplaceSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const filteredListings = LISTINGS.filter(listing => {
    const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-gray-50" id="marketplace">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-aos="fade-up">Community Marketplace</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
          A dedicated space where users can advertise their websites, services, and products. Upload posts, videos, and promotional content designed to foster collaboration and cross-promotion within our community.
        </p>
        
        {/* Search and Filter */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between" data-aos="fade-up" data-aos-delay="150">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-primary text-black font-medium' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Create Listing Button */}
        <div className="text-center mb-10" data-aos="fade-up">
          <button 
            id="create"
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            {showCreateForm ? 'Cancel' : 'Create New Listing'}
          </button>
        </div>

        {/* Create Listing Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-10" data-aos="fade-up">
            <h3 className="text-2xl font-semibold mb-4">Create New Listing</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter listing title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  {CATEGORIES.filter(cat => cat !== 'All').map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input
                  type="url"
                  id="websiteUrl"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe your website, service, or product"
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">Upload Video (Optional)</label>
                <input
                  type="file"
                  id="video"
                  accept="video/*"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Upload a promotional video to showcase your business or service (Max 50MB)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promotional Content Type</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Website/Service Promotion</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Cross-promotion Opportunity</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Community Collaboration</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
                <input
                  type="text"
                  id="contactInfo"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Email or phone number for collaboration inquiries"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-300"
                >
                  Submit Listing
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Featured Listings */}
        {filteredListings.some(listing => listing.featured) && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6" data-aos="fade-up">Featured Listings</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredListings
                .filter(listing => listing.featured)
                .map((listing) => (
                  <div 
                    key={listing.id} 
                    className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
                    data-aos="fade-up"
                  >
                    <div className="relative h-60 md:h-auto md:w-2/5">
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Image</span>
                      </div>
                      <Image 
                        src={listing.image} 
                        alt={listing.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                          Featured
                        </span>
                        <span className="text-sm text-gray-500">{listing.category}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                      <p className="text-gray-600 mb-4">{listing.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                            <Image 
                              src={listing.owner.avatar} 
                              alt={listing.owner.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-700">{listing.owner.name}</span>
                        </div>
                        <a 
                          href={listing.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium hover:underline"
                        >
                          Visit Website →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Listings */}
        <div>
          <h3 className="text-2xl font-semibold mb-6" data-aos="fade-up">All Listings</h3>
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings
                .filter(listing => !listing.featured)
                .map((listing) => (
                  <div 
                    key={listing.id} 
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                    data-aos="fade-up"
                    data-aos-delay={`${parseInt(listing.id) * 50}`}
                  >
                    <div className="relative h-48 w-full">
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Image</span>
                      </div>
                      <Image 
                        src={listing.image} 
                        alt={listing.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{listing.title}</h3>
                        <span className="text-sm text-gray-500">{listing.category}</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">{listing.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                            <Image 
                              src={listing.owner.avatar} 
                              alt={listing.owner.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-700">{listing.owner.name}</span>
                        </div>
                        <a 
                          href={listing.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium hover:underline"
                        >
                          Visit →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow">
              <p className="text-gray-500">No listings found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12" data-aos="fade-up">
          <nav className="inline-flex rounded-md shadow">
            <a href="#" className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="px-4 py-2 border-t border-b border-gray-300 bg-primary text-black">
              1
            </a>
            <a href="#" className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              2
            </a>
            <a href="#" className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              3
            </a>
            <a href="#" className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              Next
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
