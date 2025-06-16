'use client';

import Link from 'next/link';

type Resource = {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string;
  icon: string;
};

const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'First-Time Homebuyer Guide',
    category: 'Guides',
    description: 'A comprehensive guide for first-time homebuyers covering everything from mortgage basics to closing costs.',
    link: '/community/resources/1',
    icon: 'document',
  },
  {
    id: '2',
    title: 'Local Housing Assistance Programs',
    category: 'Financial',
    description: 'Information about local programs that provide financial assistance for housing, including down payment assistance and tax credits.',
    link: '/community/resources/2',
    icon: 'money',
  },
  {
    id: '3',
    title: 'Community Development Organizations',
    category: 'Community',
    description: 'A directory of local organizations focused on community development, affordable housing, and neighborhood improvement.',
    link: '/community/resources/3',
    icon: 'users',
  },
  {
    id: '4',
    title: 'Sustainable Home Improvement Resources',
    category: 'Home Improvement',
    description: 'Resources for eco-friendly home improvements, energy efficiency upgrades, and sustainable living practices.',
    link: '/community/resources/4',
    icon: 'leaf',
  },
  {
    id: '5',
    title: 'Neighborhood Guides',
    category: 'Neighborhoods',
    description: 'Detailed guides to local neighborhoods, including amenities, schools, transportation, and community features.',
    link: '/community/resources/5',
    icon: 'map',
  },
  {
    id: '6',
    title: 'Real Estate Market Reports',
    category: 'Market',
    description: 'Quarterly market reports with data on housing trends, prices, and forecasts for the local real estate market.',
    link: '/community/resources/6',
    icon: 'chart',
  },
];

type ResourcesSectionProps = {
  showViewDetailsButton?: boolean;
};

export default function ResourcesSection({ showViewDetailsButton = false }: ResourcesSectionProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'money':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'leaf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'map':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-aos="fade-up">Community Resources</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
          Access helpful resources for homeowners, renters, and community members. From financial assistance to neighborhood guides, we&apos;ve got you covered.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESOURCES.map((resource, index) => (
            <div 
              key={resource.id} 
              className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {renderIcon(resource.icon)}
                </div>
                <div className="ml-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 mb-2">
                    {resource.category}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <Link href={resource.link} className="text-primary font-medium hover:underline">
                      Learn more →
                    </Link>
                    {showViewDetailsButton && (
                      <Link 
                        href={resource.link}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300 text-sm"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up">
          <Link 
            href="/community/resources" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            View All Resources
          </Link>
        </div>
      </div>
    </section>
  );
}
