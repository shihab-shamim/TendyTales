import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 flex flex-col items-center text-center">
          <img 
            src="https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg" 
            alt="Error Illustration" 
            className="w-64 h-64 object-cover mb-8 rounded-xl"
          />
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Oops! Page not found</h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            The page you're looking for seems to have wandered off. Let's get you back on track.
          </p>
          
          <button
            onClick={handleBackClick}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Return to Homepage
          </button>
        </div>
        
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </div>
    </div>
  );
};

export default ErrorPage;
