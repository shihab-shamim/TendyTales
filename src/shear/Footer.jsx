import React from 'react';
import NewsletterSection from './NewsletterSection';
import FooterLinks from './FooterLinks';
import FooterBottom from './FooterBottom';
import SocialIcons from './SocialIcons';
import { ShoppingBag } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Newsletter Section */}
          <NewsletterSection />
          
          <div className="my-12 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
              {/* Logo and Company Description */}
              <div className="max-w-xs">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold inline-flex items-center">
                    <ShoppingBag className="mr-2" /> TrendyTales
                  </h2>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  We have clothes that suit your style and which you're proud to wear. From women to men.
                </p>
                <SocialIcons />
              </div>
              
              {/* Footer Links */}
              <div className="flex-1 md:max-w-3xl">
                <FooterLinks />
              </div>
            </div>
            
            {/* Footer Bottom Section */}
            <FooterBottom />
          </div>
        </div>
      </footer>
    );
};

export default Footer;