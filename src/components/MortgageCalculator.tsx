'use client';

import { useState, useEffect, useCallback } from 'react';
import AOS from 'aos';

export default function MortgageCalculator() {
  // State for calculator inputs
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPayment, setDownPayment] = useState(60000);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  
  // Function to calculate monthly mortgage payment
  const calculateMonthlyPayment = useCallback(() => {
    // Calculate loan amount after down payment
    const principal = loanAmount - downPayment;
    
    // Convert annual interest rate to monthly decimal
    const monthlyRate = interestRate / 100 / 12;
    
    // Convert years to months
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly payment using formula: P * (r(1+r)^n) / ((1+r)^n - 1)
    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      const monthlyPaymentValue = 
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      setMonthlyPayment(monthlyPaymentValue);
    }
  }, [loanAmount, interestRate, loanTerm, downPayment]);
  
  // Calculate monthly payment whenever inputs change
  useEffect(() => {
    calculateMonthlyPayment();
  }, [calculateMonthlyPayment]);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up">
      <h2 className="text-2xl font-bold text-black mb-6">Mortgage Calculator</h2>
      
      <div className="space-y-6">
        {/* Home Price */}
        <div>
          <label htmlFor="home-price" className="block text-sm font-medium text-black mb-1">
            Home Price: {formatCurrency(loanAmount)}
          </label>
          <input
            type="range"
            id="home-price"
            min="50000"
            max="2000000"
            step="10000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-burgundy"
          />
          <div className="flex justify-between text-xs text-black mt-1">
            <span>$50k</span>
            <span>$2M</span>
          </div>
        </div>
        
        {/* Down Payment */}
        <div>
          <label htmlFor="down-payment" className="block text-sm font-medium text-black mb-1">
            Down Payment: {formatCurrency(downPayment)} ({Math.round((downPayment / loanAmount) * 100)}%)
          </label>
          <input
            type="range"
            id="down-payment"
            min="0"
            max={loanAmount * 0.8}
            step="5000"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-burgundy"
          />
          <div className="flex justify-between text-xs text-black mt-1">
            <span>$0</span>
            <span>{formatCurrency(loanAmount * 0.8)}</span>
          </div>
        </div>
        
        {/* Interest Rate */}
        <div>
          <label htmlFor="interest-rate" className="block text-sm font-medium text-black mb-1">
            Interest Rate: {interestRate}%
          </label>
          <input
            type="range"
            id="interest-rate"
            min="1"
            max="10"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-burgundy"
          />
          <div className="flex justify-between text-xs text-black mt-1">
            <span>1%</span>
            <span>10%</span>
          </div>
        </div>
        
        {/* Loan Term */}
        <div>
          <label htmlFor="loan-term" className="block text-sm font-medium text-black mb-1">
            Loan Term: {loanTerm} years
          </label>
          <div className="flex gap-2">
            {[15, 20, 30].map((term) => (
              <button
                key={term}
                onClick={() => setLoanTerm(term)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                  loanTerm === term
                    ? 'bg-burgundy text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                {term} years
              </button>
            ))}
          </div>
        </div>
        
        {/* Results */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-black">Monthly Payment</h3>
              <p className="text-sm text-black">Principal & Interest</p>
            </div>
            <div className="text-2xl font-bold text-burgundy">
              {formatCurrency(monthlyPayment)}
            </div>
          </div>
          
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-black mb-2">Loan Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-black">Principal Loan Amount</div>
              <div className="text-right font-medium">{formatCurrency(loanAmount - downPayment)}</div>
              
              <div className="text-black">Down Payment</div>
              <div className="text-right font-medium">{formatCurrency(downPayment)}</div>
              
              <div className="text-black">Total Interest</div>
              <div className="text-right font-medium">
                {formatCurrency(monthlyPayment * loanTerm * 12 - (loanAmount - downPayment))}
              </div>
              
              <div className="text-black">Total Payment</div>
              <div className="text-right font-medium">{formatCurrency(monthlyPayment * loanTerm * 12)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


