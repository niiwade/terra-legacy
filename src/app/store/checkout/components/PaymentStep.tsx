'use client';

import { useCart } from '../../../context/CartContext';
import { useState } from 'react';
import Link from 'next/link';

interface PaymentStepProps {
  formData: {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  submitOrderUrl: string;
  previousStepUrl: string;
}

export default function PaymentStep({ formData, previousStepUrl }: PaymentStepProps) {
  const { getCartTotal } = useCart();
  
  // Local state for form fields
  const [cardName, setCardName] = useState(formData.cardName);
  const [cardNumber, setCardNumber] = useState(formData.cardNumber);
  const [expiryDate, setExpiryDate] = useState(formData.expiryDate);
  const [cvv, setCvv] = useState(formData.cvv);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment and navigate to confirmation using direct URL manipulation
    window.location.href = '/store/checkout#confirmation';
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Information</h2>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="flex justify-between text-lg font-medium">
          <span>Order Total:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
            Name on Card *
          </label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Card Number *
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
            maxLength={19}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date (MM/YY) *
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
              maxLength={5}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
            />
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV *
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              required
              maxLength={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
            />
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              className="h-4 w-4 text-burgundy focus:ring-burgundy border-gray-300 rounded"
            />
            <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
              Save card for future purchases
            </label>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Link
            href={previousStepUrl}
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Back to Shipping
          </Link>
          
          <button
            type="submit"
            className="inline-block px-6 py-3 bg-burgundy text-black rounded-md font-medium hover:bg-burgundy/90 transition-colors"
          >
            Complete Order
          </button>
        </div>
      </form>
    </div>
  );
}
