import React from 'react';
import { Edit3, Trash2, Star, StarHalf } from 'lucide-react';
import { Link } from 'react-router';

const ProductCard = ({ product, onDelete }) => {
  const renderStars = (rating) => {
    const numRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 max-w-sm mx-auto">
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image || "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400"}
          alt={product.name || "Product"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              New Arrival
            </span>
          )}
          {product.discount && product.persent && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              -{product.persent}%
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <Link to={`/dashboard/editProduct/${product?._id}`}
           
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <button
            onClick={onDelete}
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium uppercase tracking-wide">
            {product.category || "General"}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name || "Product Name"}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4rem]">
          {product.description || "Product description goes here..."}
        </p>

        <div className="mb-4">
          {renderStars(product.ratings)}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price || "0.00"}
            </span>
            {product.discount && product.persent && (
              <span className="text-sm text-gray-500 line-through">
                  {Math.round(
                              product.price *
                                (1 + parseInt(product.persent) / 100)
                            )}
                {/* ${(parseFloat(product.price) / (1 - parseFloat(product.persent) / 100)).toFixed(2)} */}
              </span>
            )}
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Stock</span>
            <p className={`text-sm font-semibold ${
              parseInt(product.stock) > 10 ? 'text-green-600' : 
              parseInt(product.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {product.stock || "0"} units
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
