import { Sparkles } from 'lucide-react';
import React from 'react';
import banner from '../../assets/banner.jpg'
import CountUp from 'react-countup';

const Banner = () => {
    return (
        <div className=" ">
        <section className=" w-full overflow-hidden bg-[#f8f9fa] dark:bg-gray-800 border-b border-gray-200">
          <div className="container  max-w-7xl px-4 py-12 md:py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row items-start justify-between">
              {/* Left side content */}
              <div className=" md:w-full lg:w-1/2 mb-10lg:mb-0  z-10">
                <div className="max-w-md">
                  <h1 className=" text-2xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                  </h1>
                  <p className="text-sm md:text-base text-gray-600 dark:text-white mb-6 leading-relaxed">
                    Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                  </p>
                  <button 
                    className="bg-black text-white py-3 px-8 rounded-full font-medium transition-transform duration-300  cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                  >
                    Shop Now
                  </button>
                </div>
                
                {/* Stats */}
                <div className="flex mt-12">
                  <div className="mr-10 last:mr-0">
                    <h3 className="text-2xl md:text-3xl font-bold"><CountUp end={200} duration={4}/>+</h3>
                    <p className="text-xs md:text-sm text-gray-600">International Brands</p>
                  </div>
                  <div className="mr-10 last:mr-0">
                    <h3 className="text-2xl md:text-3xl font-bold"><CountUp end={2000} duration={4}/>+</h3>
                    <p className="text-xs md:text-sm text-gray-600">High-Quality Products</p>
                  </div>
                  <div className="mr-10 last:mr-0">
                    <h3 className="text-2xl md:text-3xl font-bold"><CountUp end={30000} duration={4}/>+</h3>
                    <p className="text-xs md:text-sm text-gray-600">Happy Customers</p>
                  </div>
                </div>
              </div>
              
              {/* Right side image */}
              <div className="w-full lg:w-1/2 h-[350px]  md:h-[600px]  relative">
                <img 
                  src={banner}
                  alt="Fashion models"
                  className="w-full h-auto object-cover rounded-md"
                  loading="eager"
                />
                <div className="absolute top-20 right-20 hidden lg:block transform animate-pulse">
            <Sparkles size={32} className="text-black" />
          </div>
          <div className="absolute bottom-40 left-1/4 hidden md:block transform animate-pulse">
            <Sparkles size={24} className="text-black" />
          </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          
        </section>
      </div>
    );
};

export default Banner;