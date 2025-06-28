'use client';

import { useState, useEffect, useCallback } from 'react';

// Import components
import CartStep from './components/CartStep';
import ShippingStep from './components/ShippingStep';
import PaymentStep from './components/PaymentStep';
import ConfirmationStep from './components/ConfirmationStep';
import CheckoutSteps from './components/CheckoutSteps';

// Step interface for checkout process
interface CheckoutStep {
  id: string;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}



// Main checkout page component
export default function CheckoutPage() {
  
  // State for checkout steps
  const [steps, setSteps] = useState<CheckoutStep[]>([
    { id: 'cart', title: 'Cart', isCompleted: false, isActive: true },
    { id: 'shipping', title: 'Shipping', isCompleted: false, isActive: false },
    { id: 'payment', title: 'Payment', isCompleted: false, isActive: false },
    { id: 'confirmation', title: 'Confirmation', isCompleted: false, isActive: false },
  ]);
  
  // Current step
  const [currentStep, setCurrentStep] = useState('cart');
  
  // Order number for confirmation
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form data
  const [formData] = useState({
    // Shipping info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment info
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  // Generate a random order number when needed
  useEffect(() => {
    if (currentStep === 'confirmation' && !orderNumber) {
      const randomOrderNumber = 'TL-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(randomOrderNumber);
    }
  }, [currentStep, orderNumber]);
  
  // Handle step navigation
  const handleStepChange = useCallback((step: string) => {
    const targetStepIndex = steps.findIndex(s => s.id === step);
    
    // Update steps status
    setSteps(prevSteps => 
      prevSteps.map((s, index) => ({
        ...s,
        isCompleted: index < targetStepIndex,
        isActive: index === targetStepIndex
      }))
    );
    
    setCurrentStep(step);
    window.scrollTo(0, 0);
  }, [steps, setCurrentStep, setSteps]);
  
  // Render current step with appropriate props
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'cart':
        return (
          <CartStep 
            onNextUrl="#shipping" 
            continueShoppingUrl="/store" 
          />
        );
      case 'shipping':
        return (
          <ShippingStep 
            formData={formData}
            nextStepUrl="#payment"
            previousStepUrl="#cart"
          />
        );
      case 'payment':
        return (
          <PaymentStep 
            formData={formData}
            submitOrderUrl="#confirmation"
            previousStepUrl="#shipping"
          />
        );
      case 'confirmation':
        return (
          <ConfirmationStep 
            orderNumber={orderNumber}
            onContinueShoppingUrl="/store"
          />
        );
      default:
        return null;
    }
  };
  
  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['cart', 'shipping', 'payment', 'confirmation'].includes(hash)) {
        handleStepChange(hash);
      }
    };
    
    // Set initial step based on URL hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleStepChange]);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-burgundy text-white py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Checkout steps */}
        <div className="mb-8">
          <CheckoutSteps steps={steps} />
        </div>
        
        {/* Current step content */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {renderCurrentStep()}
        </div>
      </main>
    </div>
  );
}
