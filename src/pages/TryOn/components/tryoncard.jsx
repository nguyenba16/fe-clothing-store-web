import CheckIcon from '@mui/icons-material/Check'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const TryOnCard = ({ item, onClick, selectedProduct, selectedColor, onColorSelect }) => {
  const { id, image, title, description, price, badge, discount, colors = [], rating = 5 } = item
  const [isHovering, setIsHovering] = useState(false)
  const navigate = useNavigate()

  const isSelected = selectedProduct && selectedProduct.id === id

  // Get available colors for the product
  const getAvailableColors = () => {
    // If colors are provided as strings, convert them to color objects
    if (colors.length > 0 && typeof colors[0] === 'string') {
      return colors.map((color) => ({
        name: color,
        hex: getColorHex(color),
      }))
    }
    // If colors are already objects, return them
    if (colors.length > 0 && typeof colors[0] === 'object') {
      return colors
    }
    // Default colors if none provided
    return [
      { name: 'Đen', hex: '#000000' },
      { name: 'Trắng', hex: '#FFFFFF' },
      { name: 'Đỏ', hex: '#FF4500' },
    ]
  }

  // Helper function to get hex color from color name
  const getColorHex = (colorName) => {
    const colorMap = {
      Đen: '#000000',
      Trắng: '#FFFFFF',
      Đỏ: '#FF4500',
      'Xanh dương': '#1E90FF',
      'Xanh lá': '#228B22',
      Hồng: '#FFC0CB',
      Tím: '#800080',
      Nâu: '#A52A2A',
      Be: '#F5F5DC',
      Xám: '#808080',
    }
    return colorMap[colorName] || '#000000'
  }

  const availableColors = getAvailableColors()

  const handleClick = () => {
    onClick(item)
  }

  const handleColorClick = (e, color) => {
    e.stopPropagation() // Prevent triggering the card click
    if (onColorSelect) {
      onColorSelect(id, color)
    }
  }

  const handleAddToCart = (e) => {
    e.stopPropagation() // Prevent triggering the card click
    toast.info('Vui lòng chọn sản phẩm để thử trước khi thêm vào giỏ hàng')
  }

  const handleBuyNow = (e) => {
    e.stopPropagation() // Prevent triggering the card click
    navigate(`/product/${id}`)
  }

  return (
    <motion.div
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-auto ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      {/* Image container with overlay */}
      <div className='relative w-full h-[250px] overflow-hidden'>
        {/* Product image with zoom effect */}
        <motion.div
          className='w-full h-full'
          animate={{ scale: isHovering ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image}
            alt={title}
            className='w-full h-full object-cover'
            onError={(e) => {
              e.target.onerror = null
              e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'
            }}
          />
        </motion.div>

        {/* Badges for sale, new, or featured products */}
        <div className='absolute top-0 left-0 flex flex-col gap-2 p-3'>
          {badge && <span className='bg-black text-white text-xs px-2 py-1 rounded'>{badge}</span>}
          {discount && (
            <span className='bg-red-600 text-white text-xs px-2 py-1 rounded'>-{discount}</span>
          )}
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <div className='absolute top-2 right-2 bg-blue-500 rounded-full p-1'>
            <CheckIcon fontSize='small' className='text-white' />
          </div>
        )}

        {/* Quick action buttons that appear on hover */}
        <motion.div
          className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-3'
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            className='bg-white rounded-full p-3 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon fontSize='small' />
          </button>
        </motion.div>
      </div>

      {/* Product details */}
      <div className='p-4'>
        <h3 className='text-lg font-medium mb-1 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer'>
          {title}
        </h3>
        <p className='text-sm text-gray-500 mb-2 line-clamp-2'>{description}</p>

        {/* Rating */}
        <div className='flex items-center mb-3'>
          {Array(5)
            .fill()
            .map((_, i) => (
              <svg
                key={i}
                xmlns='http://www.w3.org/2000/svg'
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
            ))}
          <span className='text-sm text-gray-600 ml-1'>({rating})</span>
        </div>

        {/* Price */}
        <div className='flex flex-col mb-3'>
          {discount && (
            <span className='text-sm text-gray-400 line-through mr-2'>
              {(parseInt(price.replace(/[^\d]/g, '')) * (100 + parseInt(discount))) / 100}₫
            </span>
          )}
          <span className='text-lg font-semibold text-red-600'>{price}</span>
        </div>

        {/* Color selection dots - visible only when product is selected */}
        {isSelected && (
          <div className='flex items-center mb-3'>
            <span className='text-sm text-gray-500 mr-2'>Màu sắc:</span>
            <div className='flex space-x-2'>
              {availableColors.map((color, index) => (
                <button
                  key={index}
                  onClick={(e) => handleColorClick(e, color)}
                  className={`w-6 h-6 rounded-full border ${selectedColor && selectedColor.hex === color.hex ? 'ring-2 ring-offset-1 ring-blue-500' : 'border-gray-300'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className='flex justify-between items-center mt-auto'>
          <button
            className={`${isSelected ? 'bg-green-600' : 'bg-primary'} text-white text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors flex-grow`}
          >
            {isSelected ? 'Đã chọn' : 'Thử ngay'}
          </button>

          <button
            onClick={handleBuyNow}
            className='ml-2 bg-black text-white text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors'
          >
            Chi tiết
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TryOnCard
