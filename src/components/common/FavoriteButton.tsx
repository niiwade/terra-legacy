'use client';

import React, { useState } from 'react';
import { useFavorites, SavedProperty } from '@/context/FavoritesContext';

interface FavoriteButtonProps {
  property: SavedProperty;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function FavoriteButton({ 
  property, 
  className = '', 
  size = 'md',
  showText = false 
}: FavoriteButtonProps): React.ReactElement {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isFav = isFavorite(property.id);
  
  const handleToggleFavorite = () => {
    setIsAnimating(true);
    
    if (isFav) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Size classes for the button and icon
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };
  
  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleFavorite();
      }}
      className={`flex items-center gap-1.5 rounded-full bg-black bg-opacity-70 hover:bg-opacity-90 transition-all ${sizeClasses[size]} ${className}`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={`${iconSizeClasses[size]} ${isAnimating ? 'animate-heartbeat' : ''} ${isFav ? 'text-burgundy fill-burgundy' : 'text-white'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFav ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      
      {showText && (
        <span className={`text-white ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>
          {isFav ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}
