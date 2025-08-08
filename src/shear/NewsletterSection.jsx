import React, { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your newsletter service
      setIsSubscribed(true);
      setEmail('');
      
      // Reset subscription message after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-black text-white p-8 rounded-xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl md:text-3xl font-bold uppercase leading-tight max-w-sm">
            Stay up to date about our latest offers
          </h3>
          
          <form onSubmit={handleSubmit} className="w-full md:max-w-md flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-full bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full px-4 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
            >
              Subscribe to Newsletter
            </button>
            
            {isSubscribed && (
              <div className="text-center text-green-400 mt-2 text-sm">
                Thanks for subscribing!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;