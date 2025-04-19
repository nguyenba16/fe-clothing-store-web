import { motion } from 'framer-motion';
import React, { useState } from 'react';
import addcart from '../../../assets/icons/addcart.svg';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ image, title, description, rating, price, badge, discount, id }) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`);
  }
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-[450px]"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      {/* Image container with overlay */}
      <div className="relative w-full h-[250px] overflow-hidden">
        {/* Product image with zoom effect */}
        <motion.div
          className="w-full h-full"
          animate={{ scale: isHovering ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
            }}
          />
        </motion.div>

        {/* Badges for sale, new, or featured products */}
        <div className="absolute top-0 left-0 flex flex-col gap-2 p-3">
          {badge && (
            <span className="bg-black text-white text-xs px-2 py-1 rounded">
              {badge}
            </span>
          )}
          {discount && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
              -{discount}
            </span>
          )}
        </div>

        {/* Quick action buttons that appear on hover */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all">
            <img src={addcart} alt="Add to Cart" className="h-5 w-5" />
          </button>
        </motion.div>
      </div>

      {/* Product details */}
      <div className="p-4">
        <h3 className="text-lg font-medium mb-1 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">{title}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{description}</p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          {Array(5).fill().map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-600 ml-1">({rating})</span>
        </div>

        {/* Price and button */}
        <div className="flex justify-between items-center mt-auto">
          <div className='flex flex-col mt-auto'>
            {discount && (
              <span className="text-sm text-gray-400 line-through mr-2">
                {parseInt(price.replace(/[^\d]/g, '')) * (100 + parseInt(discount)) / 100}₫
              </span>
            )}
            <span className="text-lg font-semibold text-red-600">{price}</span>
          </div>
          <button className="bg-black text-white text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors">
            Mua ngay
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard;
