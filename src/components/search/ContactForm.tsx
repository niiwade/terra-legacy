import React from 'react';

export default function ContactForm(): React.ReactElement {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Let&apos;s Make it Happen
          </h2>
          <p className="text-gray-300 max-w-3xl text-lg">
            Ready to start your real estate journey? Fill out the form below and one of our experts will get in touch with you to discuss your needs and help you find the perfect property.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-300 text-sm font-medium mb-2">
                First Name
              </label>
              <input 
                type="text" 
                id="firstName" 
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-gray-300 text-sm font-medium mb-2">
                Last Name
              </label>
              <input 
                type="text" 
                id="lastName" 
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
                placeholder="Enter your last name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
                Phone
              </label>
              <input 
                type="tel" 
                id="phone" 
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label htmlFor="propertyType" className="block text-gray-300 text-sm font-medium mb-2">
                Property Type
              </label>
              <select 
                id="propertyType" 
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
              >
                <option value="">Select property type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="budget" className="block text-gray-300 text-sm font-medium mb-2">
                Budget
              </label>
              <select 
                id="budget" 
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
              >
                <option value="">Select budget range</option>
                <option value="100k-500k">$100,000 - $500,000</option>
                <option value="500k-1m">$500,000 - $1,000,000</option>
                <option value="1m-2m">$1,000,000 - $2,000,000</option>
                <option value="2m-5m">$2,000,000 - $5,000,000</option>
                <option value="5m+">$5,000,000+</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                Message
              </label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-burgundy"
                placeholder="Tell us about your requirements"
              ></textarea>
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="consent" 
                  className="h-4 w-4 text-burgundy border-gray-700 rounded focus:ring-burgundy"
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-400">
                  I agree to the Terms and Privacy Policy
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <button className="bg-burgundy hover:bg-opacity-90 text-white px-8 py-4 rounded-lg transition-colors text-lg font-medium w-full md:w-auto">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
