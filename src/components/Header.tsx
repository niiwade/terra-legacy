'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart, CartProduct } from '../app/context/CartContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount, cart } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Update cart count whenever the cart changes
  useEffect(() => {
    console.log('Header: Cart changed, updating count');
    const count = getCartCount();
    console.log('Header: New cart count:', count);
    setCartItemCount(count);
    
    // Also check localStorage directly as a fallback
    try {
      const savedCart = localStorage.getItem('terraLegacyCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart) as CartProduct[];
        const localCount = parsedCart.reduce((total: number, item: CartProduct) => total + item.quantity, 0);
        console.log('Header: Local storage cart count:', localCount);
        if (localCount !== count) {
          setCartItemCount(localCount);
        }
      }
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
    }
  }, [getCartCount, cart]);

  // Handle scroll events to change header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full py-4 px-6 md:px-12 flex items-center justify-between shadow-sm sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white' : 'bg-forest'
    }`}>
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/terra-logo.png" 
            alt="Terra Legacy Land Services Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          {/* <span className={`font-bold text-xl transition-colors duration-300 ${
            isScrolled ? 'text-forest' : 'text-mist'
          }`}>Terra Legacy</span> */}
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className={`font-medium text-sm transition-colors ${
          isScrolled ? 'text-forest hover:text-fern' : 'text-mist hover:text-sunflower'
        }`}>Home</Link>
        <Link href="/blog" className={`font-medium text-sm transition-colors ${
          isScrolled ? 'text-forest hover:text-fern' : 'text-mist hover:text-sunflower'
        }`}>Blog</Link>
        <Link href="/store" className={`font-medium text-sm transition-colors ${
          isScrolled ? 'text-forest hover:text-fern' : 'text-mist hover:text-sunflower'
        }`}>Store</Link>
        <Link href="/courses" className={`font-medium text-sm transition-colors ${
          isScrolled ? 'text-forest hover:text-fern' : 'text-mist hover:text-sunflower'
        }`}>Courses</Link>
        <div className="relative group">
          <button 
            className={`font-medium text-sm transition-colors flex items-center gap-1 ${
              isScrolled ? 'text-forest hover:text-fern' : 'text-mist hover:text-sunflower'
            }`}
            onClick={() => setCommunityDropdownOpen(!communityDropdownOpen)}
            onMouseEnter={() => setCommunityDropdownOpen(true)}
            onMouseLeave={() => setCommunityDropdownOpen(false)}
          >
            Community
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {communityDropdownOpen && (
            <div 
              className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-48 z-50"
              onMouseEnter={() => setCommunityDropdownOpen(true)}
              onMouseLeave={() => setCommunityDropdownOpen(false)}
            >
              <Link href="/community" className="block px-4 py-2 text-sm text-charcoal hover:bg-mist hover:text-forest transition-colors">Community Home</Link>
              <Link href="/community/events" className="block px-4 py-2 text-sm text-charcoal hover:bg-mist hover:text-forest transition-colors">Events</Link>
              <Link href="/community/forums" className="block px-4 py-2 text-sm text-charcoal hover:bg-mist hover:text-forest transition-colors">Forums</Link>
              <Link href="/community/resources" className="block px-4 py-2 text-sm text-charcoal hover:bg-mist hover:text-forest transition-colors">Resources</Link>
              <Link href="/community/marketplace" className="block px-4 py-2 text-sm text-charcoal hover:bg-mist hover:text-forest transition-colors font-medium">Marketplace</Link>
            </div>
          )}
        </div>
        <Link href="/about" className={`font-medium text-sm transition-colors ${
          isScrolled ? 'text-forest hover:text-fern' : 'text-mist hover:text-sunflower'
        }`}>About Us</Link>
        <Link href="/contact" className={`font-medium text-sm transition-colors ${
          isScrolled ? 'text-forest hover:text-fern' : 'text-mist hover:text-sunflower'
        }`}>Contact</Link>
      </nav>
      
      <div className="flex items-center gap-4">
        {/* <button className={`hidden md:block px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'text-forest hover:bg-forest hover:text-mist' 
            : 'text-mist hover:bg-mist hover:text-forest'
        }`}>Login</button> */}
        
        {/* Cart Icon after login button - always visible */}
        {/* <Link href="/store/checkout" className="relative flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${
            isScrolled ? 'text-forest hover:text-fern' : 'text-mist hover:text-sunflower'
          }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-sunflower text-earth text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
         */}
        {/* <button className="px-6 py-2 bg-fern text-mist text-sm font-medium rounded-full hover:bg-opacity-90 hover:scale-105 transition-all duration-300">Sign Up</button> */}
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${
            isScrolled ? 'text-forest' : 'text-mist'
          }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="/store/checkout"
              className="font-medium text-charcoal hover:text-forest transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-sunflower text-earth text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              Cart
            </Link>
            <Link 
              href="/" 
              className="font-medium text-charcoal hover:text-forest transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {/* <Link 
              href="/search" 
              className="font-medium text-charcoal hover:text-forest transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Properties
            </Link> */}
            <Link 
              href="/blog" 
              className="font-medium text-charcoal hover:text-forest transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/store" 
              className="font-medium text-charcoal hover:text-forest transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Store
            </Link>
            <Link 
              href="/courses" 
              className="font-medium text-charcoal hover:text-forest transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <div className="space-y-2">
              <Link 
                href="/community" 
                className="font-medium text-charcoal hover:text-burgundy transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </Link>
              <div className="pl-4 space-y-2 border-l-2 border-gray-200">
                <Link 
                  href="/community/events" 
                  className="font-medium text-sm text-charcoal hover:text-forest transition-colors block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Events
                </Link>
                <Link 
                  href="/community/forums" 
                  className="font-medium text-sm text-charcoal hover:text-forest transition-colors block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Forums
                </Link>
                <Link 
                  href="/community/resources" 
                  className="font-medium text-sm text-charcoal hover:text-forest transition-colors block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link 
                  href="/community/marketplace" 
                  className="text-sm text-charcoal hover:text-forest transition-colors block font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Marketplace
                </Link>
              </div>
            </div>
            <Link 
              href="/about" 
              className="font-medium text-charcoal hover:text-forest transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="font-medium text-charcoal hover:text-forest transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <button className="w-full text-left font-medium text-charcoal hover:text-forest transition-colors">
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
