'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default function TawkToChat() {
  useEffect(() => {
    // Don't initialize Tawk.to during development if in development mode
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    // Initialize Tawk.to
    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    
    s1.async = true;
    s1.src = 'https://embed.tawk.to/YOUR_TAWK_TO_PROPERTY_ID/default'; // Replace with your actual Tawk.to property ID
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    }

    // Tawk.to API customization options
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Optional: Customize the chat widget
    window.Tawk_API.onLoad = function() {
      // Set visitor attributes
      window.Tawk_API.setAttributes({
        name: 'Terra Legacy Visitor',
        hash: '' // For secure mode (optional)
      }, function(error: any) {
        // Handle error if needed
      });

      // Customize chat widget colors to match Terra Legacy theme
      window.Tawk_API.customStyle = {
        zIndex: 1000,
        color: '#8B0000', // Burgundy color
        visibility: {
          desktop: {
            position: 'br', // bottom right
            xOffset: '20px',
            yOffset: '20px'
          },
          mobile: {
            position: 'br', // bottom right
            xOffset: '10px',
            yOffset: '10px'
          }
        }
      };
    };

    // Clean up function
    return () => {
      if (window.Tawk_API && window.Tawk_API.onLoad) {
        // Remove the script if component unmounts
        const tawkScript = document.querySelector('script[src^="https://embed.tawk.to"]');
        if (tawkScript && tawkScript.parentNode) {
          tawkScript.parentNode.removeChild(tawkScript);
        }
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
