'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export default function AOSInitializer() {
  useEffect(() => {
    // Initialize AOS with custom settings
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
      delay: 100,
      offset: 120,
    });
  }, []);

  return null; // This component doesn't render anything
}
