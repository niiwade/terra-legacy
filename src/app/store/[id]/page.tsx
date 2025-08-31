'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import store products data and cart context
import { storeProducts } from '@/app/store/data';
import { useCart, CartProduct } from '@/app/context/CartContext';

// Define product type based on the data structure
type StoreProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  description: string;
  rating: string;
  reviews: string;
  bestseller: boolean;
  fileType?: string;
  fileSize?: string;
  pages?: number;
  lessons?: number;
  templates?: number;
};

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });

    // Resolve the async params
    params.then(resolvedParams => {
      const productId = resolvedParams.id;
      setId(productId);

      // Find the product by ID
      const foundProduct = storeProducts.find((p: StoreProduct) => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Product not found, redirect to store
        router.push('/store');
      }
      
      setIsLoading(false);
    });
  }, [params, router]);

  const handleAddToCart = () => {
    if (product) {
      // Convert to CartProduct type and add to cart
      const cartProduct: CartProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      };
      
      // Add to cart using CartContext
      addToCart(cartProduct);
      console.log(`Adding to cart: ${product.title}, Quantity: ${quantity}`);
      
      // Show success message
      setAddedToCart(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  const handleBuyNow = () => {
    // In a real application, this would add the product to cart and redirect to checkout
    if (product && id) {
      console.log(`Buying now: ${product.title}, Quantity: ${quantity}`);
      router.push(`/store/checkout?productId=${id}&quantity=${quantity}`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 h-96 bg-gray-200 rounded"></div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="flex gap-4 mb-6">
                <div className="h-12 bg-gray-200 rounded w-32"></div>
                <div className="h-12 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/store" className="bg-burgundy text-white px-6 py-3 rounded-md font-medium hover:bg-burgundy/90 transition-colors">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-600 mb-8" data-aos="fade-up">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/store" className="hover:text-burgundy transition-colors">Store</Link>
        <span className="mx-2">/</span>
        You&apos;re looking at <span className='font-bold'>{product?.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2" data-aos="fade-right">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <Image 
              src={product.image} 
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {product.bestseller && (
              <div className="absolute top-4 left-4 bg-burgundy text-white text-sm font-medium px-3 py-1 rounded">
                BESTSELLER
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2" data-aos="fade-left">
          <span className="text-sm text-burgundy font-medium mb-2 block">{product.category}</span>
          <h1 className="text-3xl font-bold text-black mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="text-yellow-500 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-gray-600 text-sm">{product.rating} · {product.reviews}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-burgundy mb-4">{product.price}</h2>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Digital Product Details */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Product Details:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Instant digital delivery
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Secure PDF format
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Lifetime access
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                30-day money-back guarantee
              </li>
            </ul>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="text-gray-700 mr-4">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 min-w-[140px] bg-white border-2 border-burgundy text-burgundy py-3 px-6 rounded-md font-medium hover:bg-burgundy/5 transition-colors"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 min-w-[140px] bg-burgundy text-white py-3 px-6 rounded-md font-medium hover:bg-burgundy/90 transition-colors"
            >
              Buy Now
            </button>
          </div>
          
          {/* Success Message */}
          {addedToCart && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Product added to cart successfully!
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {product && storeProducts
            .filter((p: StoreProduct) => p.id !== id && p.category === product.category)
            .slice(0, 4)
            .map((relatedProduct: StoreProduct) => (
              <div 
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/store/${relatedProduct.id}`}>
                  <div className="relative aspect-[4/3]">
                    <Image 
                      src={relatedProduct.image} 
                      alt={relatedProduct.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    {relatedProduct.bestseller && (
                      <div className="absolute top-2 left-2 bg-burgundy text-white text-xs font-medium px-2 py-1 rounded">
                        BESTSELLER
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-burgundy text-white text-sm font-bold px-2 py-1 rounded">
                      {relatedProduct.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-burgundy font-medium mb-1 block">{relatedProduct.category}</span>
                    <h3 className="text-lg font-semibold text-black mb-1 line-clamp-1">{relatedProduct.title}</h3>
                    <div className="flex items-center">
                      <div className="text-yellow-500 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-xs">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
