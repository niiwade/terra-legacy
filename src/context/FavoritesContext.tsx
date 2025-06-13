'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the property type
export interface SavedProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
}

// Define the context type
interface FavoritesContextType {
  favorites: SavedProperty[];
  addFavorite: (property: SavedProperty) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

// Create context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider component
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<SavedProperty[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('terraLegacyFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error);
        setFavorites([]);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('terraLegacyFavorites', JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  // Add a property to favorites
  const addFavorite = (property: SavedProperty) => {
    setFavorites(prev => {
      // Check if property already exists in favorites
      if (prev.some(fav => fav.id === property.id)) {
        return prev;
      }
      return [...prev, property];
    });
  };

  // Remove a property from favorites
  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(property => property.id !== id));
  };

  // Check if a property is in favorites
  const isFavorite = (id: string) => {
    return favorites.some(property => property.id === id);
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to use the favorites context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
