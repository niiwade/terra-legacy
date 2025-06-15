'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Store products data
const storeProducts = [
  {
    id: '1',
    image: '/images/properties/1.jpg',
    title: 'Land Investment Guide',
    category: 'E-Book',
    price: '$24.99',
    rating: '4.8/5',
    reviews: '124 reviews',
    bestseller: true,
    description: 'A comprehensive guide to investing in land properties with strategies for long-term growth and passive income.'
  },
  {
    id: '2',
    image: '/images/properties/2.jpg',
    title: 'Property Analysis Toolkit',
    category: 'Digital Tool',
    price: '$49.99',
    rating: '4.6/5',
    reviews: '89 reviews',
    bestseller: false,
    description: 'Interactive spreadsheets and calculators to analyze property values, ROI, and investment potential.'
  },
  {
    id: '3',
    image: '/images/properties/3.jpg',
    title: 'Rural Land Evaluation Course',
    category: 'Online Course',
    price: '$199.99',
    rating: '4.9/5',
    reviews: '256 reviews',
    bestseller: true,
    description: 'Learn how to evaluate rural properties, understand zoning laws, and identify high-potential investment opportunities.'
  },
  {
    id: '4',
    image: '/images/properties/4.jpg',
    title: 'Land Flipping Masterclass',
    category: 'Video Course',
    price: '$299.99',
    rating: '4.7/5',
    reviews: '178 reviews',
    bestseller: true,
    description: 'Master the art of buying undervalued land and selling it for profit with our step-by-step video course.'
  },
  {
    id: '5',
    image: '/images/properties/5.jpg',
    title: 'Property Investment Calculator',
    category: 'Digital Tool',
    price: '$39.99',
    rating: '4.5/5',
    reviews: '63 reviews',
    bestseller: false,
    description: 'Calculate potential returns, mortgage payments, and cash flow for any property investment with this easy-to-use tool.'
  },
  {
    id: '6',
    image: '/images/properties/6.jpg',
    title: 'Land Ownership Legal Guide',
    category: 'E-Book',
    price: '$19.99',
    rating: '4.8/5',
    reviews: '92 reviews',
    bestseller: false,
    description: 'Navigate the legal aspects of land ownership, including titles, easements, and property rights.'
  },
  {
    id: '7',
    image: '/images/properties/7.jpg',
    title: 'Passive Income Through Land',
    category: 'Online Course',
    price: '$249.99',
    rating: '4.9/5',
    reviews: '215 reviews',
    bestseller: true,
    description: 'Discover multiple strategies to generate passive income from your land investments without active management.'
  },
  {
    id: '8',
    image: '/images/properties/8.jpg',
    title: 'Land Due Diligence Kit',
    category: 'Digital Tool',
    price: '$79.99',
    rating: '4.7/5',
    reviews: '142 reviews',
    bestseller: false,
    description: 'Complete toolkit for performing thorough due diligence on land purchases, including checklists and document templates.'
  },
  {
    id: '9',
    image: '/images/properties/9.jpg',
    title: 'Rural Property Valuation Guide',
    category: 'E-Book',
    price: '$34.99',
    rating: '4.6/5',
    reviews: '87 reviews',
    bestseller: false,
    description: 'Learn professional techniques for accurately valuing rural properties and land parcels in any market.'
  },
  {
    id: '10',
    image: '/images/properties/10.jpg',
    title: 'Land Subdivision Secrets',
    category: 'Video Course',
    price: '$349.99',
    rating: '4.8/5',
    reviews: '167 reviews',
    bestseller: true,
    description: 'Step-by-step guide to subdividing land for maximum profit, including permitting, zoning, and marketing strategies.'
  },
  {
    id: '11',
    image: '/images/properties/11.jpg',
    title: 'Property Marketing Toolkit',
    category: 'Digital Tool',
    price: '$59.99',
    rating: '4.5/5',
    reviews: '78 reviews',
    bestseller: false,
    description: 'Marketing templates, social media assets, and advertising strategies specifically designed for land and property sales.'
  },
  {
    id: '12',
    image: '/images/properties/12.jpg',
    title: 'Tax Strategies for Land Investors',
    category: 'E-Book',
    price: '$29.99',
    rating: '4.7/5',
    reviews: '103 reviews',
    bestseller: false,
    description: 'Maximize your investment returns with tax strategies specifically designed for land investors and property flippers.'
  }
];

// Product categories
const categories = [
  'All',
  'E-Book',
  'Online Course',
  'Video Course',
  'Digital Tool'
];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(storeProducts);
  const [sortOption, setSortOption] = useState('featured');
  
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  
  // Filter products function wrapped in useCallback to prevent unnecessary re-renders
  const filterProducts = useCallback(() => {
    let filtered = [...storeProducts];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        break;
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortOption]);
  
  // Apply filters whenever category or sort option changes
  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-pink-200 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terra Legacy Store</h1>
            <p className="text-xl mb-8">Educational resources to help you succeed in land investment</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-white transition-colors">
                Browse Courses
              </button>
              <button className="bg-transparent border border-black text-black px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors">
                View E-Books
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter and Sort Section */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2" data-aos="fade-right">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md whitespace-nowrap ${
                    selectedCategory === category 
                      ? 'bg-burgundy text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2" data-aos="fade-left">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-burgundy hover:translate-y-[-5px]"
                data-aos="fade-up"
                data-aos-delay={index % 3 * 100}
              >
                <div className="relative">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image 
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {product.bestseller && (
                    <div className="absolute top-4 left-4 bg-burgundy text-white text-xs font-medium px-2 py-1 rounded">
                      BESTSELLER
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-burgundy text-white text-lg font-bold px-3 py-1 rounded">
                    {product.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <span className="text-sm text-burgundy font-medium mb-1 block">{product.category}</span>
                  <h3 className="text-xl font-semibold text-black mb-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-500 mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-gray-600 text-sm">{product.rating} · {product.reviews}</span>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-burgundy hover:bg-burgundy/90 text-white py-2 rounded transition-colors duration-300">
                      Add to Cart
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium text-gray-600">No products found</h3>
              <p className="text-gray-500 mt-2">Try changing your filters or check back later for new products.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-black mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">Get the latest updates on new products, special offers, and educational content.</p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgundy"
              />
              <button className="bg-burgundy text-white px-6 py-3 rounded-md font-medium hover:bg-burgundy/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
