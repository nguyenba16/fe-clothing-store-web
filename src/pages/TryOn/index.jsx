import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
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
} from '@mui/material'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoAuthApi from '../../apis/noAuthApi'
import ProductCard from '../../components/components/ProductCard'
import TryOnCard from './components/tryoncard'

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

  const navigate = useNavigate()

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts()
  }, [])

  // Function to fetch products from API
  const fetchProducts = async () => {
    setIsLoadingProducts(true)
    try {
      // You should replace this with your actual API call
      const response = await NoAuthApi.getAllProducts()
      // Transform the data to match the ProductCard component format
      const transformedProducts = response.data.map((product) => ({
        id: product.id,
        image:
          product.productImage && product.productImage.length > 0
            ? product.productImage[0].url
            : 'https://via.placeholder.com/300x400?text=No+Image',
        title: product.productName,
        description: product.desc,
        rating: product.rating || 5,
        price: product.price,
      }))
      setProducts(transformedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Use sample data if API call fails
      setProducts(getSampleProducts())
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
        rating: 4.5,
        price: '1,299,000₫',
      },
      {
        id: 2,
        image: '/src/assets/images/DetailProduct/vay2.avif',
        title: 'Đầm suông nhẹ nhàng',
        description: 'Đầm suông phong cách Hàn Quốc',
        rating: 4.8,
        price: '899,000₫',
      },
      {
        id: 3,
        image: '/src/assets/images/DetailProduct/vay3.avif',
        title: 'Áo thun unisex',
        description: 'Áo thun unisex phong cách thời thượng',
        rating: 4.2,
        price: '399,000₫',
      },
      {
        id: 4,
        image: '/src/assets/images/DetailProduct/vay4.avif',
        title: 'Áo khoác mùa đông',
        description: 'Áo khoác ấm áp chống thấm nước',
        rating: 4.7,
        price: '1,599,000₫',
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

    // Get available colors for this product and select the first one by default
    const colors = getAvailableColors(product.id)
    setSelectedColor(colors[0])

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
      // This is where you would normally call your AI API
      // For now we'll just simulate by showing the product image
      setResultImage(product.image)

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
      // This is where you would normally call your AI API with color parameter
      setResultImage(product.image)

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
  const handleAddToCart = (e, product) => {
    e.stopPropagation() // Prevent triggering the card click

    // Add to cart logic - this is a placeholder, replace with your actual cart logic
    console.log('Adding to cart:', product)

    // Display a confirmation message
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'system',
        text: `Đã thêm "${product.title}" vào giỏ hàng!`,
        timestamp: new Date(),
      },
    ])
  }

  // Handle buying a product now
  const handleBuyNow = (e, product) => {
    e.stopPropagation() // Prevent triggering the card click

    // Direct to checkout/product detail logic
    console.log('Buying now:', product)
    navigate(`/product/${product.id}`)
  }

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
              Trò chuyện với AI stylist
            </Typography>

            {/* Messages container */}
            <Box className='flex-grow overflow-auto mb-3 p-2' style={{ maxHeight: '180px' }}>
              {chatMessages.length === 0 ? (
                <Typography variant='body2' color='textSecondary' align='center' className='italic'>
                  Hãy bắt đầu cuộc trò chuyện với AI để nhận tư vấn trang phục phù hợp với bạn
                </Typography>
              ) : (
                chatMessages.map((message, index) => (
                  <Box
                    key={index}
                    className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <Box
                      className={`inline-block px-3 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : message.sender === 'system'
                            ? 'bg-amber-100'
                            : 'bg-gray-200'
                      }`}
                    >
                      <Typography variant='body2'>{message.text}</Typography>
                    </Box>
                    <Typography variant='caption' display='block' color='textSecondary'>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>

            {/* Input area */}
            <Box className='flex'>
              <TextField
                fullWidth
                placeholder='Nhập câu hỏi của bạn...'
                variant='outlined'
                size='small'
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }}
                className='mr-2'
              />
              <Button
                variant='contained'
                color='primary'
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                disabled={!currentMessage.trim()}
              >
                Gửi
              </Button>
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

            {isLoadingProducts ? (
              <Box className='flex justify-center my-8'>
                <CircularProgress />
              </Box>
            ) : (
              <div className='max-h-[800px] overflow-auto pr-2'>
                <Grid2 container spacing={2}>
                  {products.map((product) => (
                    <Grid2 item size={{ xs: 4, md: 12 }} key={product.id}>
                      <TryOnCard
                        item={product}
                        onClick={() => handleProductSelect(product)}
                        selectedProduct={selectedProduct}
                        selectedColor={selectedColor}
                        onColorSelect={handleColorSelect}
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
          {products.slice(0, 4).map((product) => (
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
              />
            </motion.div>
          ))}
        </div>
      </Box>
    </div>
  )
}
