'use client';

import React, { useState, useEffect } from 'react';

interface MortgageCalculatorProps {
  propertyPrice: string;
}

export default function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps): React.ReactElement {
  // Convert price string to number (remove $ and commas)
  const defaultPrice = parseInt(propertyPrice.replace(/[$,]/g, ''), 10);
  
  const [loanAmount, setLoanAmount] = useState(defaultPrice * 0.8); // 20% down payment by default
  const [downPayment, setDownPayment] = useState(defaultPrice * 0.2);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationSchedule, setAmortizationSchedule] = useState<Array<{
    year: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>>([]);

  // Calculate monthly payment
  useEffect(() => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      setMonthlyPayment(0);
      return;
    }

    // Convert annual interest rate to monthly decimal
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly payment using the formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
    const payment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setMonthlyPayment(payment);
    
    // Generate amortization schedule (yearly)
    calculateAmortizationSchedule(loanAmount, monthlyRate, numberOfPayments);
  }, [loanAmount, interestRate, loanTerm]);

  // Calculate amortization schedule
  const calculateAmortizationSchedule = (principal: number, monthlyRate: number, numberOfPayments: number) => {
    let balance = principal;
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const schedule = [];
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    let yearlyPayment = 0;
    
    for (let i = 1; i <= numberOfPayments; i++) {
      const interest = balance * monthlyRate;
      const principalPaid = monthlyPayment - interest;
      balance -= principalPaid;
      
      yearlyPrincipal += principalPaid;
      yearlyInterest += interest;
      yearlyPayment += monthlyPayment;
      
      if (i % 12 === 0 || i === numberOfPayments) {
        schedule.push({
          year: Math.ceil(i / 12),
          payment: yearlyPayment,
          principal: yearlyPrincipal,
          interest: yearlyInterest,
          balance: Math.max(0, balance)
        });
        
        yearlyPrincipal = 0;
        yearlyInterest = 0;
        yearlyPayment = 0;
      }
    }
    
    setAmortizationSchedule(schedule);
  };

  // Handle loan amount change
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setLoanAmount(value);
    setDownPayment(defaultPrice - value);
    setDownPaymentPercent(((defaultPrice - value) / defaultPrice) * 100);
  };

  // Handle down payment change
  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setDownPayment(value);
    setLoanAmount(defaultPrice - value);
    setDownPaymentPercent((value / defaultPrice) * 100);
  };

  // Handle down payment percent change
  const handleDownPaymentPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setDownPaymentPercent(value);
    const downPaymentValue = (defaultPrice * value) / 100;
    setDownPayment(downPaymentValue);
    setLoanAmount(defaultPrice - downPaymentValue);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section className="w-full bg-charcoal bg-opacity-50 rounded-xl p-6 md:p-8 border border-gray-800">
      <h3 className="text-2xl font-bold text-white mb-6">Mortgage Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Property Price */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Property Price</label>
            <input
              type="text"
              value={formatCurrency(defaultPrice)}
              disabled
              className="w-full bg-charcoal text-white border border-gray-700 rounded-md px-3 py-2"
            />
          </div>
          
          {/* Down Payment */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-gray-300">Down Payment</label>
              <span className="text-burgundy">{downPaymentPercent.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="0.5"
              value={downPaymentPercent}
              onChange={handleDownPaymentPercentChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-burgundy mb-2"
            />
            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  type="number"
                  value={Math.round(downPayment)}
                  onChange={handleDownPaymentChange}
                  className="w-full bg-charcoal text-white border border-gray-700 rounded-md px-3 py-2"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="number"
                  value={Math.round(loanAmount)}
                  onChange={handleLoanAmountChange}
                  className="w-full bg-charcoal text-white border border-gray-700 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>Down Payment</span>
              <span>Loan Amount</span>
            </div>
          </div>
          
          {/* Interest Rate */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-gray-300">Interest Rate</label>
              <span className="text-burgundy">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-burgundy"
            />
          </div>
          
          {/* Loan Term */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Loan Term (years)</label>
            <div className="flex gap-2">
              {[15, 20, 30].map((term) => (
                <button
                  key={term}
                  onClick={() => setLoanTerm(term)}
                  className={`flex-1 py-2 rounded-md transition-colors ${
                    loanTerm === term 
                      ? 'bg-burgundy text-white' 
                      : 'bg-charcoal border border-gray-700 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-black bg-opacity-50 rounded-xl p-6 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <p className="text-gray-300 mb-1">Estimated Monthly Payment</p>
            <p className="text-3xl font-bold text-burgundy">
              {formatCurrency(monthlyPayment)}
            </p>
            <p className="text-sm text-gray-400 mt-1">Principal & Interest</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-charcoal rounded-lg p-3 text-center">
              <p className="text-sm text-gray-400 mb-1">Down Payment</p>
              <p className="text-lg font-semibold text-white">{formatCurrency(downPayment)}</p>
            </div>
            <div className="bg-charcoal rounded-lg p-3 text-center">
              <p className="text-sm text-gray-400 mb-1">Loan Amount</p>
              <p className="text-lg font-semibold text-white">{formatCurrency(loanAmount)}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="w-full py-2 bg-burgundy hover:bg-opacity-90 text-white rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <span>{showAmortization ? 'Hide' : 'Show'} Amortization Schedule</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform ${showAmortization ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Amortization Schedule */}
      {showAmortization && (
        <div className="mt-8 overflow-x-auto">
          <h4 className="text-xl font-semibold text-white mb-4">Amortization Schedule</h4>
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-charcoal">
              <tr>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Principal</th>
                <th className="px-4 py-3">Interest</th>
                <th className="px-4 py-3">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="px-4 py-3">{row.year}</td>
                  <td className="px-4 py-3">{formatCurrency(row.payment)}</td>
                  <td className="px-4 py-3">{formatCurrency(row.principal)}</td>
                  <td className="px-4 py-3">{formatCurrency(row.interest)}</td>
                  <td className="px-4 py-3">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-6 text-xs text-gray-400">
        <p>* This calculator is for estimation purposes only. Actual loan terms and payments may vary.</p>
        <p>* Property taxes, insurance, and HOA fees are not included in this calculation.</p>
      </div>
    </section>
  );
}
