'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import store products data
import { storeProducts, categories } from './data';
// Import cart context
import { useCart, CartProduct } from '../context/CartContext';

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Keep searchQuery state but add a search input in the UI later
  const [filteredProducts, setFilteredProducts] = useState(storeProducts);
  const [sortOption, setSortOption] = useState('featured');
  const router = useRouter();

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

  // Get cart functions from context
  const { addToCart, getCartCount } = useCart();
  
  // Handle adding product to cart
  const handleAddToCart = (productId: string) => {
    console.log('Adding product to cart:', productId);
    const product = storeProducts.find(p => p.id === productId);
    if (product) {
      // Convert to CartProduct type and add to cart
      const cartProduct: CartProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1
      };
      
      console.log('Cart product to add:', cartProduct);
      addToCart(cartProduct);
      console.log('Current cart count after adding:', getCartCount());
      
      // Show a brief notification
      const productElement = document.getElementById(`product-${productId}`);
      if (productElement) {
        const notification = document.createElement('div');
        notification.className = 'absolute top-2 right-2 bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm animate-fade-in-out';
        notification.textContent = 'Added to cart!';
        productElement.appendChild(notification);
        
        setTimeout(() => {
          notification.remove();
        }, 2000);
      }
    }
  };
  
  // Handle view product details
  const handleViewProduct = (productId: string) => {
    router.push(`/store/${productId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-pink-200 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-start">
            <div className="max-w-3xl" data-aos="fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Terra Legacy Store</h1>
              <p className="text-xl mb-8">Educational resources to help you succeed in land investment</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-forest text-mist px-6 py-3 rounded-full font-medium hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
                  Browse Courses
                </button>
                <button className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium hover:bg-forest hover:text-mist transition-all duration-300">
                  View E-Books
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/store/checkout')}
              className="relative bg-white text-burgundy p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="View cart"
              data-aos="fade-left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-burgundy text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              )}
            </button>
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
                id={`product-${product.id}`}
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
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className="flex-1 bg-burgundy hover:bg-burgundy/90 text-white py-2 rounded transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleViewProduct(product.id)}
                      className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
              <button className="bg-fern text-mist px-6 py-3 rounded-full font-medium hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
