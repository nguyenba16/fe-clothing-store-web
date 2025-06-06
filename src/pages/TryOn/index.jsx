import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  IconButton,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import NoAuthApi from '../../apis/noAuthApi'
import ProductCard from '../../components/components/ProductCard'
import TryOnCard from './components/tryoncard'
import { toast } from 'react-toastify'
import useAuth from '../../stores/useAuth'
import cartApi from '../../apis/cartApi'

export default function TryOn() {
  const [userImage, setUserImage] = useState(null)
  const [resultImage, setResultImage] = useState(null)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [selectedColor, setSelectedColor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [showSizeColorModal, setShowSizeColorModal] = useState(false)
  const [actionType, setActionType] = useState(null)
  const [selectedSize, setSelectedSize] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const modalRef = useRef(null)
  const { user } = useAuth()
  const isAuthenticated = !!user

  const navigate = useNavigate()

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts()
  }, [])

  // Transform API response data to application's product format
  const transformAPIProducts = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return []

    return apiData.map((product) => ({
      id: product.id,
      image:
        product.productImage && product.productImage.length > 0
          ? product.productImage[0].url
          : 'https://via.placeholder.com/300x400?text=No+Image',
      title:
        product.productName?.substring(0, 20) + (product.productName?.length > 20 ? '...' : '') ||
        'Không có tên sản phẩm',
      description:
        product.desc?.substring(0, 100) + (product.desc?.length > 100 ? '...' : '') ||
        'Không có mô tả',
      price: new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      })
        .format(product.price)
        .replace(/\s/g, ''),
      category: product.categrory?.id || '',
      colors:
        product.colors?.map((color) => ({
          name: color,
          hex: getColorHex(color),
        })) || [],
      rating: product.rating || 0,
      badge: product.isNew ? 'Mới' : product.isSale ? 'Sale' : null,
      discount: product.discount ? `${product.discount}%` : null,
    }))
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
      black: '#000000',
      white: '#FFFFFF',
      blue: '#1E90FF',
      red: '#FF4500',
      green: '#228B22',
      yellow: '#FFD700',
      pink: '#FF69B4',
      purple: '#800080',
      gray: '#808080',
      orange: '#FFA500',
      brown: '#A52A2A',
    }
    return colorMap[colorName] || '#000000'
  }

  // Function to fetch products from API
  const fetchProducts = async () => {
    setIsLoadingProducts(true)
    try {
      // Lấy sản phẩm nổi bật cho phần đề xuất
      const outstandingResponse = await NoAuthApi.getOutstadingProduct()
      console.log('Outstanding Products:', outstandingResponse)

      // Lấy tất cả sản phẩm cho phần thử đồ
      const allProductsResponse = await NoAuthApi.getProduct()
      console.log('All Products:', allProductsResponse)

      // Transform outstanding products for recommendations and limit to 4
      const recommendedProducts = transformAPIProducts(outstandingResponse.data || []).slice(0, 4)
      console.log('Recommended Products:', recommendedProducts)

      // Transform all products for try-on section
      const tryOnProducts = transformAPIProducts(allProductsResponse.data || [])
      console.log('Try-on Products:', tryOnProducts)

      // Set products for both sections
      setProducts(tryOnProducts)
      setFilteredProducts(tryOnProducts)

      // Store recommended products in state
      setRecommendedProducts(recommendedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Không thể tải danh sách sản phẩm')
      setProducts(getSampleProducts())
      setFilteredProducts(getSampleProducts())
      setRecommendedProducts(getSampleProducts().slice(0, 4))
    } finally {
      setIsLoadingProducts(false)
    }
  }

  // Sample products in case API fails
  const getSampleProducts = () => {
    return [
      {
        id: 1,
        image: '/src/assets/images/DetailProduct/vay1.avif',
        title: 'Váy dạ hội cao cấp',
        description: 'Váy dạ hội phong cách châu Âu',
        price: '1,299,000₫',
        rating: 4.5,
        badge: 'Mới',
        colors: [
          { name: 'Đen', hex: '#000000' },
          { name: 'Trắng', hex: '#FFFFFF' },
          { name: 'Đỏ', hex: '#FF4500' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 2,
        image: '/src/assets/images/DetailProduct/vay2.avif',
        title: 'Đầm suông nhẹ nhàng',
        description: 'Đầm suông phong cách Hàn Quốc',
        price: '899,000₫',
        rating: 4.8,
        badge: 'Sale',
        discount: '20%',
        colors: [
          { name: 'Hồng', hex: '#FFC0CB' },
          { name: 'Xanh dương', hex: '#1E90FF' },
          { name: 'Tím', hex: '#800080' },
        ],
        sizes: ['S', 'M', 'L'],
      },
    ]
  }

  // Sample colors for products
  const getAvailableColors = (productId) => {
    // This would typically come from your API
    // For now, we'll create sample colors for each product
    const colorsByProduct = {
      1: [
        { name: 'Đen', hex: '#000000' },
        { name: 'Trắng', hex: '#FFFFFF' },
        { name: 'Đỏ', hex: '#FF4500' },
      ],
      2: [
        { name: 'Hồng', hex: '#FFC0CB' },
        { name: 'Xanh dương', hex: '#1E90FF' },
        { name: 'Tím', hex: '#800080' },
      ],
      3: [
        { name: 'Xanh lá', hex: '#228B22' },
        { name: 'Xám', hex: '#808080' },
        { name: 'Đen', hex: '#000000' },
      ],
      4: [
        { name: 'Nâu', hex: '#A52A2A' },
        { name: 'Đen', hex: '#000000' },
        { name: 'Be', hex: '#F5F5DC' },
      ],
    }

    return (
      colorsByProduct[productId] || [
        { name: 'Đen', hex: '#000000' },
        { name: 'Trắng', hex: '#FFFFFF' },
      ]
    )
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserImage(reader.result)
        // Reset result when new image is uploaded
        setResultImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle clicking a product
  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    // Select first color by default if available
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0])
    } else {
      setSelectedColor(null)
    }

    if (userImage) {
      processVirtualTryOn(product)
    }
  }

  // Handle color selection
  const handleColorSelect = (productId, color) => {
    setSelectedColor(color)
    // If we have a selected product and user image, process the try-on with the new color
    if (selectedProduct && userImage) {
      processVirtualTryOnWithColor(selectedProduct, color)
    }
  }

  // Process the virtual try-on
  const processVirtualTryOn = (product) => {
    if (!userImage) return

    setIsProcessing(true)

    // Simulate AI processing time
    setTimeout(() => {
      // Set the result image to the provided URL
      setResultImage(
        'https://40e507dd0272b7bb46d376a326e6cb3c.cdn.bubble.io/f1749177984630x906569754936759900/upscale',
      )

      // Add a system message
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'system',
          text: `Bạn đã thử món đồ "${product.title}". Trang phục này rất phù hợp với vóc dáng của bạn!`,
          timestamp: new Date(),
        },
      ])

      setIsProcessing(false)
    }, 1500)
  }

  // Process virtual try-on with color
  const processVirtualTryOnWithColor = (product, color) => {
    if (!userImage) return

    setIsProcessing(true)

    // Add a system message about the color change
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'system',
        text: `Đang thử "${product.title}" với màu ${color.name}...`,
        timestamp: new Date(),
      },
    ])

    // Simulate AI processing time
    setTimeout(() => {
      // Set the result image to the provided URL
      setResultImage(
        'https://40e507dd0272b7bb46d376a326e6cb3c.cdn.bubble.io/f1749177984630x906569754936759900/upscale',
      )

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'system',
          text: `Bạn đã thử món đồ "${product.title}" với màu ${color.name}. Màu này rất hợp với bạn!`,
          timestamp: new Date(),
        },
      ])

      setIsProcessing(false)
    }, 1500)
  }

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!currentMessage.trim()) return

    // Add user message to chat
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: currentMessage,
        timestamp: new Date(),
      },
    ])

    setCurrentMessage('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        'Dựa vào hình dáng cơ thể bạn, tôi nghĩ các trang phục dáng suông sẽ rất phù hợp.',
        'Bạn có thể thử các trang phục có tông màu pastel, sẽ rất hợp với màu da của bạn.',
        'Với chiều cao của bạn, các mẫu váy ngắn trên đầu gối sẽ giúp bạn trông cao hơn.',
        'Tôi đề xuất bạn nên thử mẫu áo khoác dáng dài, vừa thời trang vừa phù hợp với vóc dáng.',
        'Phong cách minimalist với các tông màu trung tính sẽ rất phù hợp với bạn.',
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: randomResponse,
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  // Handle removing uploaded image
  const handleRemoveImage = () => {
    setUserImage(null)
    setResultImage(null)
  }

  // Handle adding a product to cart
  const handleAddToCart = async (e, product) => {
    e.stopPropagation() // Prevent triggering the card click
    setActionType('cart')
    setShowSizeColorModal(true)
  }

  // Handle buying a product now
  const handleBuyNow = async (e, product) => {
    e.stopPropagation() // Prevent triggering the card click
    navigate(`/product/${product.id}`)
  }

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
      const productId = selectedProduct.id
      const color = selectedProduct.colors[selectedColor].name
      const size = selectedProduct.sizes[selectedSize]
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
        name: res.data.name || selectedProduct.title,
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
      const productId = selectedProduct.id
      const color = selectedProduct.colors[selectedColor].name
      const size = selectedProduct.sizes[selectedSize]
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

  // Update filtered products when search query or products change
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProducts(filtered)
    }
  }, [searchQuery, products])

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

  return (
    <div className='max-w-7xl mx-auto p-4 md:p-6'>
      {/* <Typography variant="h4" component="h1" align="center" gutterBottom className="font-bold uppercase tracking-wide mb-8 text-third underline">
        Thử Đồ Ảo Với AI
      </Typography> */}

      {/* Main content area */}
      <Grid2 container spacing={4}>
        {/* Left column: Upload and result */}
        <Grid2 item size={{ xs: 18, md: 8 }}>
          <Grid2 container spacing={3}>
            {/* Upload area */}
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={3}
                className='h-[500px] flex flex-col items-center justify-center p-4 relative'
              >
                {userImage ? (
                  <Box className='relative w-full h-full'>
                    <img
                      src={userImage}
                      alt='Uploaded user'
                      className='w-full h-full object-cover'
                    />
                    <IconButton
                      color='error'
                      className='absolute top-2 right-2 bg-white'
                      onClick={handleRemoveImage}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    component='label'
                    variant='outlined'
                    startIcon={<CloudUploadIcon />}
                    className='h-full w-full flex flex-col border-dashed border-2 border-gray-300'
                  >
                    <Typography variant='body1' className='text-center mb-2'>
                      Tải lên ảnh của bạn
                    </Typography>
                    <Typography variant='body2' color='textSecondary' className='text-center'>
                      Hỗ trợ định dạng JPG, PNG
                    </Typography>
                    <input type='file' accept='image/*' hidden onChange={handleImageUpload} />
                  </Button>
                )}
              </Paper>
              <Typography variant='subtitle1' align='center' className='mt-2 font-medium'>
                Ảnh của bạn
              </Typography>
            </Grid2>

            {/* Result area */}
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={3}
                className='h-[500px] flex flex-col items-center justify-center p-4 relative'
              >
                {isProcessing ? (
                  <Box className='flex flex-col items-center'>
                    <CircularProgress />
                    <Typography variant='body1' className='mt-4'>
                      Đang xử lý...
                    </Typography>
                  </Box>
                ) : resultImage ? (
                  <img src={resultImage} alt='Result' className='w-full h-full object-cover' />
                ) : (
                  <Box className='flex flex-col items-center justify-center h-full'>
                    <Typography variant='body1' color='textSecondary'>
                      Kết quả sẽ hiển thị tại đây
                    </Typography>
                    <Typography variant='body2' color='textSecondary' className='text-center mt-2'>
                      {userImage
                        ? 'Vui lòng chọn một sản phẩm từ danh sách bên dưới'
                        : 'Vui lòng tải lên ảnh của bạn trước'}
                    </Typography>
                  </Box>
                )}
              </Paper>
              <Typography variant='subtitle1' align='center' className='mt-2 font-medium'>
                Kết quả thử đồ
              </Typography>
            </Grid2>
          </Grid2>

          {/* Chat area */}
          <Paper elevation={3} className='mt-8 p-4 h-[300px] flex flex-col'>
            <Typography variant='h6' gutterBottom>
              Trạng thái xử lý
            </Typography>

            {/* Loading container */}
            <Box className='flex-grow flex flex-col items-center justify-center'>
              {isProcessing ? (
                <>
                  <CircularProgress size={60} className='mb-4' />
                  <Typography variant='body1' className='text-center mb-2'>
                    Đang xử lý ảnh của bạn...
                  </Typography>
                  <Typography variant='body2' color='textSecondary' className='text-center'>
                    Vui lòng đợi trong giây lát
                  </Typography>
                </>
              ) : resultImage ? (
                <Typography variant='body1' color='success.main' className='text-center'>
                  Xử lý hoàn tất! Bạn có thể xem kết quả bên cạnh.
                </Typography>
              ) : (
                <Typography variant='body1' color='textSecondary' className='text-center'>
                  {userImage
                    ? 'Vui lòng chọn một sản phẩm từ danh sách bên dưới'
                    : 'Vui lòng tải lên ảnh của bạn trước'}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid2>

        {/* Right column: Product selection */}
        <Grid2 item size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} className='p-4'>
            <Typography variant='h6' gutterBottom>
              Chọn sản phẩm để thử
            </Typography>
            <Divider className='mb-4' />

            {/* Search bar */}
            <TextField
              fullWidth
              variant='outlined'
              size='small'
              placeholder='Tìm kiếm sản phẩm...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='mb-4'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            {isLoadingProducts ? (
              <Box className='flex justify-center my-8'>
                <CircularProgress />
              </Box>
            ) : filteredProducts.length === 0 ? (
              <Box className='text-center py-4'>
                <Typography variant='body1' color='textSecondary'>
                  Không tìm thấy sản phẩm phù hợp
                </Typography>
              </Box>
            ) : (
              <div className='max-h-[800px] overflow-auto pr-2'>
                <Grid2 container spacing={2}>
                  {filteredProducts.map((product) => (
                    <Grid2 item size={{ xs: 4, md: 12 }} key={product.id}>
                      <TryOnCard
                        item={product}
                        onClick={() => handleProductSelect(product)}
                        selectedProduct={selectedProduct}
                        selectedColor={selectedColor}
                        onColorSelect={handleColorSelect}
                        onAddToCart={(e) => handleAddToCart(e, product)}
                        onBuyNow={(e) => handleBuyNow(e, product)}
                      />
                    </Grid2>
                  ))}
                </Grid2>
              </div>
            )}
          </Paper>
        </Grid2>
      </Grid2>

      {/* Product recommendations */}
      <Box className='mt-12'>
        <Typography variant='h5' gutterBottom className='font-semibold'>
          Sản phẩm đề xuất cho bạn
        </Typography>
        <Divider className='mb-6' />

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {recommendedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                id={product.id}
                image={product.image}
                title={product.title}
                description={product.description}
                rating={product.rating}
                price={product.price}
                badge={product.badge}
                discount={product.discount}
              />
            </motion.div>
          ))}
        </div>
      </Box>

      {/* Size and Color Selection Modal */}
      <AnimatePresence>
        {showSizeColorModal && (
          <motion.div
            className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className='bg-white rounded-lg p-4 w-4/5 max-w-md mx-auto shadow-lg'
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className='flex justify-between items-center mb-3'>
                <h3 className='font-medium'>Thêm vào giỏ hàng</h3>
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
                      {selectedProduct?.sizes?.map((size, index) => (
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
                      {selectedProduct?.colors?.map((color, index) => (
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
                {isLoading ? 'Đang tải...' : 'Thêm vào giỏ hàng'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
