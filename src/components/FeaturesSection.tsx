'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Mock store products data
const allProducts = [
  // Page 1
  [
    {
      id: '1',
      image: '/images/properties/1.jpg',
      title: 'Land Investment Guide',
      category: 'E-Book',
      price: '$24.99',
      rating: '4.8/5',
      reviews: '124 reviews',
      bestseller: true
    },
    {
      id: '2',
      image: '/images/properties/2.jpg',
      title: 'Property Analysis Toolkit',
      category: 'Digital Tool',
      price: '$49.99',
      rating: '4.6/5',
      reviews: '89 reviews',
      bestseller: false
    },
    {
      id: '3',
      image: '/images/properties/3.jpg',
      title: 'Rural Land Evaluation Course',
      category: 'Online Course',
      price: '$199.99',
      rating: '4.9/5',
      reviews: '256 reviews',
      bestseller: true
    }
  ],
  // Page 2
  [
    {
      id: '4',
      image: '/images/properties/4.jpg',
      title: 'Land Flipping Masterclass',
      category: 'Video Course',
      price: '$299.99',
      rating: '4.7/5',
      reviews: '178 reviews',
      bestseller: true
    },
    {
      id: '5',
      image: '/images/properties/5.jpg',
      title: 'Property Investment Calculator',
      category: 'Digital Tool',
      price: '$39.99',
      rating: '4.5/5',
      reviews: '63 reviews',
      bestseller: false
    },
    {
      id: '6',
      image: '/images/properties/6.jpg',
      title: 'Land Ownership Legal Guide',
      category: 'E-Book',
      price: '$19.99',
      rating: '4.8/5',
      reviews: '92 reviews',
      bestseller: false
    }
  ],
  // Page 3
  [
    {
      id: '7',
      image: '/images/properties/7.jpg',
      title: 'Passive Income Through Land',
      category: 'Online Course',
      price: '$249.99',
      rating: '4.9/5',
      reviews: '215 reviews',
      bestseller: true
    },
    {
      id: '8',
      image: '/images/properties/8.jpg',
      title: 'Land Due Diligence Kit',
      category: 'Digital Tool',
      price: '$79.99',
      rating: '4.7/5',
      reviews: '142 reviews',
      bestseller: false
    },
    {
      id: '9',
      image: '/images/properties/9.jpg',
      title: 'Rural Property Valuation Guide',
      category: 'E-Book',
      price: '$34.99',
      rating: '4.6/5',
      reviews: '87 reviews',
      bestseller: false
    }
  ],
  // Page 4
  [
    {
      id: '10',
      image: '/images/properties/10.jpg',
      title: 'Land Subdivision Secrets',
      category: 'Video Course',
      price: '$349.99',
      rating: '4.8/5',
      reviews: '167 reviews',
      bestseller: true
    },
    {
      id: '11',
      image: '/images/properties/11.jpg',
      title: 'Property Marketing Toolkit',
      category: 'Digital Tool',
      price: '$59.99',
      rating: '4.5/5',
      reviews: '78 reviews',
      bestseller: false
    },
    {
      id: '12',
      image: '/images/properties/12.jpg',
      title: 'Tax Strategies for Land Investors',
      category: 'E-Book',
      price: '$29.99',
      rating: '4.7/5',
      reviews: '103 reviews',
      bestseller: false
    }
  ],
  // Page 5
  [
    {
      id: '13',
      image: '/images/properties/13.jpg',
      title: 'Land Acquisition Masterclass',
      category: 'Online Course',
      price: '$279.99',
      rating: '4.9/5',
      reviews: '192 reviews',
      bestseller: true
    },
    {
      id: '14',
      image: '/images/properties/14.jpg',
      title: 'Property Deal Analyzer Pro',
      category: 'Digital Tool',
      price: '$89.99',
      rating: '4.8/5',
      reviews: '124 reviews',
      bestseller: true
    },
    {
      id: '15',
      image: '/images/properties/15.jpg',
      title: 'Land Banking Strategy Guide',
      category: 'E-Book',
      price: '$24.99',
      rating: '4.6/5',
      reviews: '86 reviews',
      bestseller: false
    }
  ]
];

export default function FeaturesSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState(allProducts[0]);
  
  // Initialize with the first page of products
  useEffect(() => {
    setProducts(allProducts[currentPage]);
    AOS.init();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < allProducts.length) {
      setCurrentPage(pageIndex);
    }
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-black">Explore Our Store</h2>
            <p className="text-gray-600">Educational resources to help you succeed in land investment</p>
          </div>
          
          <Link href="/store" className="text-burgundy font-medium hover:underline flex items-center mt-4 md:mt-0">
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-burgundy hover:translate-y-[-5px]" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
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
                <div className="flex items-center mb-4">
                  <div className="text-yellow-500 mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">{product.rating} · {product.reviews}</span>
                </div>
                
                <div className="mt-4">
                  <button className="w-full bg-fern hover:bg-opacity-90 text-mist py-2 rounded-full hover:scale-105 transition-all duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-3">
            {allProducts.map((_, index) => (
              <button 
                key={index}
                onClick={() => handlePageChange(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${currentPage === index ? 'bg-burgundy w-4' : 'bg-gray-600'}`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
