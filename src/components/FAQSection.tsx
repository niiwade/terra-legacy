'use client';

import { useState, useEffect } from 'react';
import AOS from 'aos';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4" data-aos="fade-up" data-aos-delay={100}>
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium">{question}</h3>
        <svg
          className={`h-5 w-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

// Fallback data
const fallbackFaqs: FAQ[] = [
  {
    id: '1',
    question: "How do I search for properties on Terra Legacy?",
    answer: "You can search for properties by using our search bar at the top of the page. Filter by location, price range, property type, and more to find your perfect match.",
    category: null
  },
  {
    id: '2',
    question: "What documents do I need to buy or rent through Terra Legacy?",
    answer: "For buying, you'll need proof of identity, proof of income, bank statements, and pre-approval from a lender. For renting, you'll need proof of identity, proof of income, rental history, and references.",
    category: null
  },
  {
    id: '3',
    question: "How can I contact a Terra Legacy agent?",
    answer: "You can contact our agents through the contact form on our website, by calling our office, or by scheduling a meeting directly with an agent on their profile page.",
    category: null
  }
];

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>(fallbackFaqs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/public/content?type=faqs&limit=10');
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setFaqs(data.data);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <section className="w-full py-12 px-6 md:px-12 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600 mb-8">Find answers to common questions about our services and the real estate process</p>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3c4b33]"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
