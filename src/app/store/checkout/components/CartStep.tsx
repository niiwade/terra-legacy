'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

interface CartStepProps {
  onNextUrl: string;
  continueShoppingUrl: string;
}

export default function CartStep({ continueShoppingUrl }: CartStepProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  // Function to handle navigation to the next step
  const handleProceedToShipping = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate programmatically and force a page reload to ensure hash change is detected
    window.location.href = '/store/checkout#shipping';
  };
  
  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-medium text-gray-600">Your cart is empty</h3>
        <p className="text-gray-500 mt-2 mb-6">Add some products to your cart to continue.</p>
        <Link 
          href={continueShoppingUrl}
          className="inline-block bg-burgundy text-white px-6 py-3 rounded-md font-medium hover:bg-burgundy/90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
            <div className="relative w-24 h-24 rounded-md overflow-hidden">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill
                className="object-cover"
              />
            </div>
            
            <div className="ml-4 flex-1">
              <h4 className="text-lg font-medium">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-burgundy font-medium">{item.price}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-gray-400 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-lg font-medium">
          <span>Subtotal:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Shipping and taxes calculated at checkout</p>
      </div>
      
      <div className="flex justify-between mt-6">
        <Link 
          href={continueShoppingUrl}
          className="inline-block px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Continue Shopping
        </Link>
        <a 
          href="#shipping"
          onClick={handleProceedToShipping}
          className="inline-block bg-burgundy text-black px-6 py-2 rounded-md hover:bg-burgundy/90 transition-colors"
        >
          Proceed to Shipping
        </a>
      </div>
    </div>
  );
}
