'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="bg-burgundy w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">TL</span>
          </div>
          <Link href="/" className="font-bold text-xl text-charcoal">Terra Legacy</Link>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="font-medium text-sm text-charcoal hover:text-burgundy transition-colors">Home</Link>
        <Link href="/search" className="font-medium text-sm text-charcoal hover:text-burgundy transition-colors">Properties</Link>
        <Link href="/favorites" className="font-medium text-sm text-charcoal hover:text-burgundy transition-colors">Favorites</Link>
        <Link href="/about" className="font-medium text-sm text-charcoal hover:text-burgundy transition-colors">About Us</Link>
        <Link href="/contact" className="font-medium text-sm text-charcoal hover:text-burgundy transition-colors">Contact</Link>
      </nav>
      
      <div className="flex items-center gap-4">
        <button className="hidden md:block px-4 py-2 text-sm font-medium text-charcoal hover:bg-gray-100 rounded-md transition-colors">Login</button>
        <button className="px-4 py-2 bg-burgundy text-white text-sm font-medium rounded-md hover:bg-opacity-90 transition-colors">Sign Up</button>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link 
              href="/" 
              className="font-medium text-charcoal hover:text-burgundy transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/search" 
              className="font-medium text-charcoal hover:text-burgundy transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Properties
            </Link>
            <Link 
              href="/favorites" 
              className="font-medium text-charcoal hover:text-burgundy transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link 
              href="/about" 
              className="font-medium text-charcoal hover:text-burgundy transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="font-medium text-charcoal hover:text-burgundy transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <button className="w-full text-left font-medium text-charcoal hover:text-burgundy transition-colors">
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
