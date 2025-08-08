import React from 'react';

const FooterBottom = () => {
  const paymentMethods = [
    { name: 'Visa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png' },
    { name: 'Mastercard', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' },
    { name: 'PayPal', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png' },
    { name: 'Apple Pay', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png' },
    { name: 'Google Pay', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          Shop.co © 2000-{currentYear}. All Rights Reserved.
        </p>
        
        <div className="flex items-center space-x-3">
          {paymentMethods.map((method, index) => (
            <div key={index} className="h-8 w-auto">
              <img 
                src={method.image} 
                alt={`${method.name} payment method`} 
                className="h-full w-auto object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;