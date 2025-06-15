'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We will get back to you shortly.'
    });
    
    // Reset form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false
    });
    
    // In a real application, you would send the form data to a server here
  };

  const offices = [
    {
      name: 'Main Office',
      address: '123 Legacy Avenue, New York, NY 10001',
      phone: '+1 (212) 555-7890',
      email: 'info@terralegacy.com',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
      image: '/images/office-ny.jpg'
    },
    {
      name: 'West Coast Office',
      address: '456 Coastal Drive, Los Angeles, CA 90210',
      phone: '+1 (310) 555-1234',
      email: 'westcoast@terralegacy.com',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
      image: '/images/office-la.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Have questions about our properties or services? We&apos;re here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>

              {formStatus.submitted && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded">
                  <p className="text-green-700">{formStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">
                      First Name*
                    </label>
                    <input 
                      type="text" 
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">
                      Last Name*
                    </label>
                    <input 
                      type="text" 
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                      Email Address*
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-2">
                    Subject*
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter subject"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">
                    Message*
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>

                <div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                      required
                    />
                    <label htmlFor="consent" className="ml-2 block text-sm text-gray-600">
                      I agree to the <Link href="/privacy-policy" className="text-black underline">Privacy Policy</Link> and consent to being contacted regarding my inquiry.
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Submit Message
                </button>
              </form>
            </div>

            <div className="lg:pl-8" data-aos="fade-left">
              <h2 className="text-3xl font-bold mb-6">Our Offices</h2>
              <p className="text-gray-600 mb-8">
                Visit us at one of our office locations or reach out directly via phone or email.
              </p>

              <div className="space-y-8">
                {offices.map((office, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                    <div className="relative h-48">
                      <Image 
                        src={office.image} 
                        alt={office.name}
                        fill
                        style={{objectFit: 'cover'}}
                        className="transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3">{office.name}</h3>
                      
                      <div className="space-y-3 text-gray-600">
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-black mt-1 mr-3" />
                          <span>{office.address}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <FaPhone className="text-black mr-3" />
                          <a href={`tel:${office.phone}`} className="hover:text-black transition-colors">
                            {office.phone}
                          </a>
                        </div>
                        
                        <div className="flex items-center">
                          <FaEnvelope className="text-black mr-3" />
                          <a href={`mailto:${office.email}`} className="hover:text-black transition-colors">
                            {office.email}
                          </a>
                        </div>
                        
                        <div className="flex items-center">
                          <FaClock className="text-black mr-3" />
                          <span>{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore our office locations on the map below.
            </p>
          </div>
          
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg" data-aos="zoom-in">
            {/* In a real application, you would integrate a map service like Google Maps or Mapbox here */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500 text-lg">Interactive Map Would Be Displayed Here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Follow us on social media for the latest updates, property listings, and real estate insights.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6" data-aos="fade-up" data-aos-delay="100">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-black text-white h-14 w-14 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-black text-white h-14 w-14 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-black text-white h-14 w-14 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-black text-white h-14 w-14 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services and processes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">How do I schedule a property viewing?</h3>
              <p className="text-gray-600">
                You can schedule a property viewing by filling out our contact form, calling our office directly, or using the booking feature on individual property listings.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">What areas do you service?</h3>
              <p className="text-gray-600">
                Terra Legacy operates primarily in New York and Los Angeles, but we have partner networks that allow us to assist clients nationwide.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">How long does the buying process typically take?</h3>
              <p className="text-gray-600">
                The buying process varies depending on several factors, but typically takes between 30-90 days from offer acceptance to closing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Do you offer virtual property tours?</h3>
              <p className="text-gray-600">
                Yes, we offer virtual property tours for all our listings. Contact us to schedule a virtual viewing at your convenience.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="200">
            <Link href="/faq" className="text-black font-medium hover:underline">
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Real Estate Journey?</h2>
            <p className="text-lg mb-8">Join thousands of satisfied clients who have found their dream properties with Terra Legacy.</p>
            <Link href="/properties" className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors inline-block">
              Explore Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
