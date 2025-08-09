import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
// import StarRating from './StarRating';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* New Arrival Badge */}
        {product.isNewArrival && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
            NEW
          </div>
        )}

        {/* Discount Badge */}
        {product.discount && product.persent && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              -{product.persent}%
            </span>
          </div>
        )}

        {/* Wishlist Button */}
      
        {/* Hover Actions */}
        <div
          className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-3 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => onAddToCart(product)}
            className="bg-white hover:bg-gray-50 cursor-pointer  dark:text-gray-400  dark:bg-gray-800 hover:dark:bg-gray-800 text-gray-800 px-6 py-3 rounded-lg font-medium shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium  dark:text-gray-400">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 line-clamp-2  dark:text-gray-400 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating (if you want to use it later) */}
        {/* <StarRating rating={product.ratings} /> */}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900  dark:text-gray-400">
            ${product.price}
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

        {/* Stock Status */}
        {product.stock > 0 ? (
          <p className="text-xs text-green-600 font-medium">
            {product.stock} in stock
          </p>
        ) : (
          <p className="text-xs text-red-500 font-medium">Out of stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
