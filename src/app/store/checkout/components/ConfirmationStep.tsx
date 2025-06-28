'use client';

import Link from 'next/link';

interface ConfirmationStepProps {
  orderNumber: string;
  onContinueShoppingUrl: string;
}

export default function ConfirmationStep({ orderNumber, onContinueShoppingUrl }: ConfirmationStepProps) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
      
      <div className="bg-gray-50 p-4 rounded-md inline-block mb-6">
        <p className="text-sm text-gray-500">Order Number</p>
        <p className="text-lg font-medium">{orderNumber}</p>
      </div>
      
      <p className="text-gray-600 mb-8">
        We&apos;ve sent a confirmation email to your inbox with all the details.<br />
        Your digital products will be available in your account shortly.
      </p>
      
      <Link
        href={onContinueShoppingUrl}
        className="inline-block bg-burgundy text-white px-6 py-3 rounded-md font-medium hover:bg-burgundy/90 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
