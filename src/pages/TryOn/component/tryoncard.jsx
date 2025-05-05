import CheckIcon from '@mui/icons-material/Check';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const TryOnCard = ({ item, onClick, selectedProduct, selectedColor, onColorSelect }) => {
    const { id, image, title, description, price, badge, discount } = item
    const [isHovering, setIsHovering] = useState(false)

    const isSelected = selectedProduct && selectedProduct.id === id;

    // Get available colors for the product - this function should come from parent component
    // but we're defining a default here for the component to work
    const getAvailableColors = () => {
        // Default colors if not provided by parent
        return [
            { name: 'Đen', hex: '#000000' },
            { name: 'Trắng', hex: '#FFFFFF' },
            { name: 'Đỏ', hex: '#FF4500' },
        ];
    };

    const colors = getAvailableColors();

    const handleClick = () => {
        onClick(item);
    }

    const handleColorClick = (e, color) => {
        e.stopPropagation(); // Prevent triggering the card click
        if (onColorSelect) {
            onColorSelect(id, color);
        }
    }

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent triggering the card click
        console.log('Adding to cart:', item);
        // Add to cart logic would go here
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
                        <CheckIcon fontSize="small" className='text-white' />
                    </div>
                )}
            </div>

            {/* Product details */}
            <div className='p-4'>
                <h3 className='text-lg font-medium mb-1 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer'>
                    {title}
                </h3>
                <p className='text-sm text-gray-500 mb-2 line-clamp-2'>{description}</p>

                {/* Price */}
                <p className='text-lg font-bold text-gray-900 mb-3'>{price}</p>

                {/* Color selection dots - visible only when product is selected */}
                {isSelected && (
                    <div className='flex items-center mb-3'>
                        <span className='text-sm text-gray-500 mr-2'>Màu sắc:</span>
                        <div className='flex space-x-2'>
                            {colors.map((color, index) => (
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
                        className={`${isSelected ? 'bg-green-600' : 'bg-primary'} text-white text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors flex-grow`}>
                        {isSelected ? 'Đã chọn' : 'Thử ngay'}
                    </button>

                    <button
                        onClick={handleAddToCart}
                        className='ml-2 bg-white border border-gray-300 text-gray-700 rounded-full p-1.5 hover:bg-gray-100 transition-colors'
                        title='Thêm vào giỏ hàng'
                    >
                        <ShoppingCartIcon fontSize="small" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
export default TryOnCard