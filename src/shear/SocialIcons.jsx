
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const SocialIcons = () => {
  const socialLinks = [
    { 
      icon: <Facebook size={16} />, 
      url: 'https://facebook.com',
      label: 'Facebook'
    },
    { 
      icon: <Instagram size={16} />, 
      url: 'https://instagram.com',
      label: 'Instagram'
    },
    { 
      icon: <Twitter size={16} />, 
      url: 'https://twitter.com',
      label: 'Twitter'
    }
  ];

  return (
    <div className="flex items-center space-x-4">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          aria-label={social.label}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-black transition-all duration-200"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;