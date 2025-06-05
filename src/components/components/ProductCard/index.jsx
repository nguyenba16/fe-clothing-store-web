import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useRef, useEffect } from 'react'
import addcart from '../../../assets/icons/addcart.svg'
import { useNavigate } from 'react-router-dom'
import NoAuthApi from '../../../apis/noAuthApi'
import cartApi from '../../../apis/cartApi'
import useAuth from '../../../stores/useAuth'
import { toast } from 'react-toastify'

const sizeSample = ['S', 'M', 'L', 'XL', 'XXL']
const colorsSample = [
  { name: 'black', hex: '#000000' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'blue', hex: '#1E90FF' },
  { name: 'red', hex: '#FF4500' },
  { name: 'green', hex: '#228B22' },
  { name: 'yellow', hex: '#FFD700' },
  { name: 'pink', hex: '#FF69B4' },
  { name: 'purple', hex: '#800080' },
  { name: 'gray', hex: '#808080' },
  { name: 'orange', hex: '#FFA500' },
  { name: 'brown', hex: '#A52A2A' },
  { name: 'cyan', hex: '#00FFFF' },
  { name: 'magenta', hex: '#FF00FF' },
  { name: 'lime', hex: '#00FF00' },
  { name: 'teal', hex: '#008080' },
  { name: 'navy', hex: '#000080' },
  { name: 'maroon', hex: '#800000' },
  { name: 'olive', hex: '#808000' },
  { name: 'silver', hex: '#C0C0C0' },
  { name: 'gold', hex: '#FFD700' },
  { name: 'indigo', hex: '#4B0082' },
  { name: 'violet', hex: '#EE82EE' },
  { name: 'coral', hex: '#FF7F50' },
  { name: 'salmon', hex: '#FA8072' },
  { name: 'khaki', hex: '#F0E68C' },
  { name: 'plum', hex: '#DDA0DD' },
  { name: 'orchid', hex: '#DA70D6' },
  { name: 'turquoise', hex: '#40E0D0' },
  { name: 'lavender', hex: '#E6E6FA' },
  { name: 'peach', hex: '#FFDAB9' },
  { name: 'mint', hex: '#98FF98' },
  { name: 'skyblue', hex: '#87CEEB' },
  { name: 'crimson', hex: '#DC143C' },
  { name: 'sienna', hex: '#A0522D' },
  { name: 'bisque', hex: '#FFE4C4' },
  { name: 'wheat', hex: '#F5DEB3' },
  { name: 'lavenderblush', hex: '#FFF0F5' },
  { name: 'lightgray', hex: '#D3D3D3' },
  { name: 'darkgray', hex: '#A9A9A9' },
  { name: 'lightblue', hex: '#ADD8E6' },
  { name: 'lightgreen', hex: '#90EE90' },
  { name: 'lightpink', hex: '#FFB6C1' },
  { name: 'lightyellow', hex: '#FFFFE0' },
  { name: 'lightcoral', hex: '#F08080' },
  { name: 'lightcyan', hex: '#E0FFFF' },
  { name: 'lightsalmon', hex: '#FFA07A' },
  { name: 'lightseagreen', hex: '#20B2AA' },
  { name: 'lightskyblue', hex: '#87CEFA' },
  { name: 'lightsteelblue', hex: '#B0C4DE' },
  { name: 'lightgoldenrodyellow', hex: '#FAFAD2' },
  { name: 'lightblueviolet', hex: '#D8BFD8' },
  { name: 'lightorchid', hex: '#E6E6FA' },
  { name: 'lightturquoise', hex: '#AFEEEE' },
  { name: 'lightlavender', hex: '#E6E6FA' },
  { name: 'lightpeach', hex: '#FFE5B4' },
  { name: 'lightmint', hex: '#F5FFFA' },
  { name: 'lightskyblue', hex: '#87CEEB' },
  { name: 'lightcrimson', hex: '#F08080' },
  { name: 'lightsienna', hex: '#CD853F' },
]
const ProductCard = ({ image, title, description, rating, price, badge, discount, id }) => {
  const [isHovering, setIsHovering] = useState(false)
  const navigate = useNavigate()
  const [showSizeColorModal, setShowSizeColorModal] = useState(false)
  const [actionType, setActionType] = useState(null) // 'cart' hoặc 'buy'
  const modalRef = useRef(null)
  const [colors, setColors] = useState(colorsSample)
  const [sizes, setSizes] = useState(sizeSample)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const isAuthenticated = !!user

  // Xử lý click bên ngoài modal để đóng modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSizeColorModal(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const updateInfoProduct = (res) => {
    const colorNames = res.data.colors
    console.log('colorNames', colorNames)
    const colorHex = colorsSample.filter((item) => colorNames.includes(item.name))
    setColors(colorHex)
    setSizes(res.data.sizes)
  }
  const fetchProductDetail = async (id) => {
    try {
      setIsLoading(true)
      const res = await NoAuthApi.getProductById(id)
      console.log('product detail', res)
      updateInfoProduct(res)
      setIsLoading(false)
      return res
    } catch (error) {
      setIsLoading(false)
      console.log('Có lỗi xảy ra', error)
    }
  }
  useEffect(() => {
    fetchProductDetail()
  }, [id])

  const handleSubmit = () => {
    if (actionType === 'cart') {
      logicAddToCart()
    } else {
      logicBuyNow()
    }
    setShowSizeColorModal(false)
  }
  const logicBuyNow = async () => {
    // Validate color and size selection
    if (selectedColor === null) {
      toast.warning('Vui lòng chọn màu sắc')
      return
    }
    if (selectedSize === null) {
      toast.warning('Vui lòng chọn kích thước')
      return
    }
    if (!isAuthenticated) {
      toast.warning('Vui lòng đăng nhập để mua hàng')
      return
    }
    try {
      const productId = id
      const color = colors[selectedColor].name
      const size = sizes[selectedSize]
      const quantity = 1
      // Lấy thêm thông tin sản phẩm nếu cần (giá, tên, ảnh)
      const res = await NoAuthApi.getProductById(productId)

      let imageUrl
      if (res.data.productImage && Array.isArray(res.data.productImage)) {
        // Tìm ảnh theo màu nếu có
        const colorImage = res.data.productImage.find((img) => img.color === color)
        if (colorImage) {
          imageUrl = colorImage.url
        }
      }

      const orderItem = {
        productID: productId,
        size,
        color,
        quantity,
        price: res.data.price,
        name: res.data.name || title,
        image: imageUrl,
      }
      localStorage.setItem('directOrder', JSON.stringify({ oderItems: [orderItem] }))
      toast.info('Đang chuyển đến trang thanh toán...')
      navigate('/checkout?direct=true')
    } catch (error) {
      toast.error('Không thể thực hiện mua ngay')
    }
  }
  const logicAddToCart = async () => {
    // Validate color and size selection
    if (selectedColor === null) {
      toast.warning('Vui lòng chọn màu sắc')
      return
    }
    if (selectedSize === null) {
      toast.warning('Vui lòng chọn kích thước')
      return
    }

    if (!isAuthenticated) {
      toast.warning('Vui lòng đăng nhập để thêm vào giỏ hàng')
      return
    }

    try {
      const productId = id
      const color = colors[selectedColor].name
      const size = sizes[selectedSize]
      const quantity = 1
      await cartApi.addItemToCart(productId, size, color, quantity)
      // Dispatch cart change event
      window.dispatchEvent(new Event('cartChanged'))
      toast.success('Đã thêm vào giỏ hàng')
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Không thể thêm vào giỏ hàng')
    }
  }
  // Xử lý click vào card để điều hướng đến trang sản phẩm
  const handleClick = () => {
    navigate(`/product/${id}`)
  }
  const handleAddToCart = async (e) => {
    e.stopPropagation()
    fetchProductDetail(id)
    setShowSizeColorModal(true)
    // alert('Đã thêm vào giỏ hàng');
    setActionType('cart')
  }
  const handleAddToWishlist = (e) => {
    e.stopPropagation()
    alert('Đã thêm vào danh sách yêu thích')
  }
  const handleBuyNow = (e) => {
    e.stopPropagation()
    fetchProductDetail(id)
    setShowSizeColorModal(true)
    setActionType('buy')
  }
  return (
    <motion.div
      className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-[450px]'
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

        {/* Quick action buttons that appear on hover */}
        <motion.div
          className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-3'
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button className='bg-white rounded-full p-3 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
              <path
                fillRule='evenodd'
                d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <button
            className='bg-white rounded-full p-3 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'
            onClick={handleAddToWishlist}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <button
            className='bg-white rounded-full p-3 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'
            onClick={handleAddToCart}
          >
            <img src={addcart} alt='Add to Cart' className='h-5 w-5' />
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

        {/* Price and button */}
        <div className='flex justify-between items-center mt-auto'>
          <div className='flex flex-col mt-auto'>
            {discount && (
              <span className='text-sm text-gray-400 line-through mr-2'>
                {(parseInt(price.replace(/[^\d]/g, '')) * (100 + parseInt(discount))) / 100}₫
              </span>
            )}
            <span className='text-lg font-semibold text-red-600'>{price}</span>
          </div>
          <button
            className='bg-black text-white text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors'
            onClick={handleBuyNow}
          >
            Mua ngay
          </button>
        </div>
      </div>
      {/* Mini modal chọn size và màu sắc */}
      <AnimatePresence>
        {showSizeColorModal && (
          <motion.div
            className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              ref={modalRef}
              className='bg-white rounded-lg p-4 w-4/5 mx-auto shadow-lg'
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className='flex justify-between items-center mb-3'>
                <h3 className='font-medium'>
                  {actionType === 'cart' ? 'Thêm vào giỏ hàng' : 'Mua ngay'}
                </h3>
                <button
                  onClick={() => setShowSizeColorModal(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>

              {isLoading ? (
                <div className='flex flex-col items-center justify-center py-4'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-2'></div>
                  <p className='text-sm text-gray-600'>Đang tải thông tin sản phẩm...</p>
                </div>
              ) : (
                <>
                  {/* Size selection */}
                  <div className='mb-3'>
                    <p className='text-sm text-gray-600 mb-1'>Kích thước:</p>
                    <div className='flex flex-wrap gap-2'>
                      {sizes.map((size, index) => (
                        <button
                          key={size}
                          className={`w-8 h-8 rounded-md border ${
                            selectedSize === index
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 hover:border-gray-500'
                          }`}
                          onClick={() => setSelectedSize(index)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color selection */}
                  <div className='mb-4'>
                    <p className='text-sm text-gray-600 mb-1'>Màu sắc:</p>
                    <div className='flex flex-wrap gap-2'>
                      {colors.map((color, index) => (
                        <button
                          key={color.name}
                          className={`w-8 h-8 rounded-full border ${
                            selectedColor === index ? 'ring-2 ring-black ring-offset-1' : ''
                          }`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => setSelectedColor(index)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button
                className={`w-full bg-black text-white py-2 rounded-md transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                }`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading
                  ? 'Đang tải...'
                  : actionType === 'cart'
                    ? 'Thêm vào giỏ hàng'
                    : 'Mua ngay'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProductCard
