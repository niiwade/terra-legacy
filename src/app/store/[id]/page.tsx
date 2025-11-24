'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import cart context
import { useCart, CartProduct } from '@/app/context/CartContext';

// Define product type based on database schema
type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  price: string;
  salePrice: string | null;
  categoryId: string | null;
  imageUrl: string | null;
  images: string | null;
  fileUrl: string | null;
  productType: string;
  stockQuantity: number | null;
  isFree: boolean;
  isActive: boolean;
  isFeatured: boolean;
  metadata: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const productId = params.id as string;

  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/public/content/${productId}?type=product`);

        if (!res.ok) {
          throw new Error('Product not found');
        }

        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Fetch related products
  useEffect(() => {
    const fetchRelated = async () => {
      if (!product) return;

      try {
        const res = await fetch('/api/public/content?type=products&limit=5');
        const data = await res.json();
        if (data.data) {
          // Filter out current product
          const filtered = data.data.filter((p: any) => p.id !== productId).slice(0, 4);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };

    if (product) {
      fetchRelated();
    }
  }, [product, productId]);

  const handleAddToCart = () => {
    if (product) {
      // Convert to CartProduct type and add to cart
      const cartProduct: CartProduct = {
        id: product.id,
        title: product.name,
        price: product.salePrice || product.price,
        image: product.imageUrl || '/images/products/default.jpg',
        category: 'Product',
        quantity: quantity
      };

      // Add to cart using CartContext
      addToCart(cartProduct);
      console.log(`Adding to cart: ${product.name}, Quantity: ${quantity}`);

      // Show success message
      setAddedToCart(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // For free products, download instantly
      if (product.isFree && product.fileUrl) {
        setIsDownloading(true);

        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = product.fileUrl;
        link.download = `${product.slug}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success message
        setTimeout(() => {
          setIsDownloading(false);
        }, 3000);
      } else {
        // For paid products, go to checkout
        console.log(`Buying now: ${product.name}, Quantity: ${quantity}`);
        router.push(`/store/checkout?productId=${productId}&quantity=${quantity}`);
      }
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

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The product you\'re looking for doesn\'t exist or has been removed.'}</p>
          <Link href="/store" className="bg-[#3c4b33] text-white px-6 py-3 rounded-md font-medium hover:bg-[#4a5d3f] transition-colors">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  const displayPrice = product.salePrice ? parseFloat(product.salePrice) : parseFloat(product.price);
  const originalPrice = product.salePrice ? parseFloat(product.price) : null;
  const productImage = product.imageUrl || '/images/products/default.jpg';

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-600 mb-8" data-aos="fade-up">
        <Link href="/" className="hover:text-[#3c4b33] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/store" className="hover:text-[#3c4b33] transition-colors">Store</Link>
        <span className="mx-2">/</span>
        You&apos;re looking at <span className='font-bold'>{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2" data-aos="fade-right">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={productImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {product.isFeatured && (
              <div className="absolute top-4 left-4 bg-[#3c4b33] text-white text-sm font-medium px-3 py-1 rounded">
                FEATURED
              </div>
            )}
            {product.isFree ? (
              <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded">
                FREE
              </div>
            ) : product.salePrice && (
              <div className="absolute top-4 right-4 bg-[#e9c770] text-[#000000] text-sm font-bold px-3 py-1 rounded">
                SALE
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2" data-aos="fade-left">
          <span className="text-sm text-[#6f8d5e] font-medium mb-2 block uppercase">{product.productType}</span>
          <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            {product.isFree ? (
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                <span className="text-2xl font-bold">FREE</span>
              </div>
            ) : (
              <>
                {originalPrice && (
                  <span className="text-xl text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
                )}
                <h2 className="text-2xl font-bold text-[#3c4b33]">${displayPrice.toFixed(2)}</h2>
              </>
            )}
          </div>

          {product.shortDescription && (
            <p className="text-gray-700 mb-4 font-medium">{product.shortDescription}</p>
          )}

          {product.description && (
            <div className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: product.description }} />
          )}
          
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
          
          {/* Quantity Selector - Only show for paid products */}
          {!product.isFree && (
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
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {!product.isFree && (
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[140px] bg-white border-2 border-[#3c4b33] text-[#3c4b33] py-3 px-6 rounded-md font-medium hover:bg-[#3c4b33]/5 transition-colors"
              >
                Add to Cart
              </button>
            )}
            <button
              onClick={handleBuyNow}
              disabled={product.isFree && !product.fileUrl}
              className="flex-1 min-w-[140px] bg-[#3c4b33] text-white py-3 px-6 rounded-md font-medium hover:bg-[#4a5d3f] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.isFree ? (product.fileUrl ? 'Download Free' : 'No Download Available') : 'Buy Now'}
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

          {/* Download Success Message */}
          {isDownloading && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Your free download has started! Check your downloads folder.
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct: any) => {
              const relPrice = relatedProduct.salePrice || relatedProduct.price;
              const relImage = relatedProduct.imageUrl || '/images/products/default.jpg';

              return (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/store/${relatedProduct.id}`}>
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={relImage}
                        alt={relatedProduct.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                      {relatedProduct.isFeatured && (
                        <div className="absolute top-2 left-2 bg-[#3c4b33] text-white text-xs font-medium px-2 py-1 rounded">
                          FEATURED
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 bg-[#3c4b33] text-white text-sm font-bold px-2 py-1 rounded">
                        ${parseFloat(relPrice).toFixed(2)}
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-[#6f8d5e] font-medium mb-1 block uppercase">{relatedProduct.productType}</span>
                      <h3 className="text-lg font-semibold text-black mb-1 line-clamp-1">{relatedProduct.name}</h3>
                      {relatedProduct.shortDescription && (
                        <p className="text-sm text-gray-600 line-clamp-2">{relatedProduct.shortDescription}</p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
