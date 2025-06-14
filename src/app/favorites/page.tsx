'use client';

import React, { useState, useEffect } from 'react';


export default function FavoritesPage() {

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
      
        </div>

      
      </div>

     

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
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
