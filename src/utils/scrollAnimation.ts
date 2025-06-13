'use client';

/**
 * Utility for adding scroll-triggered animations to elements
 * To use: 
 * 1. Add the 'reveal' class to elements you want to animate
 * 2. Add additional animation classes like 'animate-fade-in'
 * 3. Call initScrollAnimation() in your component's useEffect
 */

export function initScrollAnimation() {
  if (typeof window === 'undefined') return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once animation is triggered
      }
    });
  };

  // Create observer
  const observer = new IntersectionObserver(handleIntersect, observerOptions);

  // Find all elements with the 'reveal' class and observe them
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(element => {
    observer.observe(element);
  });

  // Cleanup function to disconnect observer when component unmounts
  return () => {
    observer.disconnect();
  };
}

/**
 * Adds staggered animation to child elements
 * @param parentSelector - CSS selector for the parent element
 * @param childSelector - CSS selector for the child elements to animate
 * @param animationClass - CSS animation class to apply
 * @param delayIncrement - Delay increment in seconds between each child
 */
export function addStaggeredAnimation(
  parentSelector: string,
  childSelector: string,
  animationClass: string,
  delayIncrement: number = 0.1
) {
  if (typeof window === 'undefined') return;

  const parentElements = document.querySelectorAll(parentSelector);
  
  parentElements.forEach(parent => {
    const children = parent.querySelectorAll(childSelector);
    
    children.forEach((child, index) => {
      const delay = index * delayIncrement;
      (child as HTMLElement).style.animationDelay = `${delay}s`;
      child.classList.add(animationClass);
    });
  });
}
