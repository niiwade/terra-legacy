'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from '@/context/FavoritesContext';
import { FaTrash, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [mounted, setMounted] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Saved Properties</h1>
          <p className="text-gray-600">
            {favorites.length > 0
              ? `You have ${favorites.length} saved ${favorites.length === 1 ? 'property' : 'properties'}`
              : 'You have no saved properties yet'}
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={() => setShowConfirmClear(true)}
            className="mt-4 md:mt-0 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md flex items-center gap-2 transition-colors"
          >
            <FaTrash className="text-sm" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 animate-fade-in"
            >
              <Link href={`/property-details/${property.id}`} className="block">
                <div className="relative h-48 w-full">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
                </div>
              </Link>
              <div className="p-5">
                <Link href={`/property-details/${property.id}`} className="block">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-burgundy transition-colors">
                    {property.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <p className="text-burgundy font-bold text-xl mb-4">{property.price}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 text-gray-700">
                    <div className="flex items-center gap-1">
                      <FaBed />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBath />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRulerCombined />
                      <span>{property.area}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFavorite(property.id);
                    }}
                    className="text-gray-500 hover:text-burgundy transition-colors p-2"
                    aria-label="Remove from favorites"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Saved Properties</h2>
            <p className="text-gray-600 mb-6">
              Start exploring properties and save your favorites to view them here.
            </p>
            <Link 
              href="/search" 
              className="px-6 py-3 bg-burgundy hover:bg-opacity-90 text-white rounded-md transition-colors inline-block"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-xl p-6 max-w-md w-full animate-scale-in"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Clear All Saved Properties?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove all your saved properties? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearFavorites();
                  setShowConfirmClear(false);
                }}
                className="px-4 py-2 bg-burgundy hover:bg-opacity-90 text-white rounded-md transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
