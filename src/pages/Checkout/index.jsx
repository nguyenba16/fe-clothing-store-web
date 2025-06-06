import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import cartApi from '../../apis/cartApi'
import NoAuthApi from '../../apis/noAuthApi'
import orderApi from '../../apis/orderApi'
import useAuth from '../../stores/useAuth'

const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [loadingCart, setLoadingCart] = useState(true)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
    paymentMethod: 'cod',
  })

  // Load user info from localStorage when component mounts
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo')
    if (savedUserInfo) {
      const parsedUserInfo = JSON.parse(savedUserInfo)
      setFormData((prevData) => ({
        ...prevData,
        ...parsedUserInfo,
      }))
    }
  }, [])

  // Danh sách thành phố mẫu (trong thực tế nên lấy từ API)
  const cities = [
    'Hà Nội',
    'Hồ Chí Minh',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'An Giang',
    'Bà Rịa - Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
  ]

  // Phương thức thanh toán
  const paymentMethods = [
    { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: '💵' },
    { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: '🏦' },
    {
      id: 'momo',
      name: 'Ví điện tử MoMo',
      icon: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
    },
    {
      id: 'vnpay',
      name: 'VNPAY',
      icon: 'https://vinadesign.vn/uploads/thumbnails/800/2023/05/vnpay-logo-vinadesign-25-12-59-16.jpg',
    },
  ]

  // Transform cart items from API format to display format
  const transformCartItems = async (cartData) => {
    if (!cartData || !cartData.data || !cartData.data.items) return []

    const items = []
    const cartItems = cartData.data.items

    // Iterate through each product in the cart
    for (const [productId, variants] of Object.entries(cartItems)) {
      try {
        // Fetch product details
        const productDetails = await NoAuthApi.getProductById(productId)

        // Iterate through each variant (size_color) of the product
        for (const [variant, quantity] of Object.entries(variants)) {
          // Split variant into size and color
          const [size, color] = variant.split('_')

          // Create item object with product details
          items.push({
            productId,
            size,
            color,
            quantity,
            name: productDetails.data.productName,
            price: productDetails.data.price,
            image:
              productDetails.data.productImage.find((img) => img.color === color)?.url ||
              '/src/assets/images/home/san pham.png',
          })
        }
      } catch (error) {
        console.error(`Error fetching product details for ${productId}:`, error)
        // Add item with default values if product details fetch fails
        for (const [variant, quantity] of Object.entries(variants)) {
          const [size, color] = variant.split('_')
          items.push({
            productId,
            size,
            color,
            quantity,
            name: 'Product Name',
            price: 0,
            image: '/src/assets/images/home/san pham.png',
          })
        }
      }
    }

    return items
  }

  // Debug log để kiểm tra user
  useEffect(() => {
    console.log('Auth State:', { user, loading })
  }, [user, loading])

  // Lấy dữ liệu giỏ hàng hoặc đơn hàng trực tiếp khi component mount
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Kiểm tra xem có phải là đơn hàng trực tiếp không
        const isDirectOrder = new URLSearchParams(location.search).get('direct') === 'true'

        if (isDirectOrder) {
          // Lấy thông tin đơn hàng trực tiếp từ localStorage
          const directOrderData = localStorage.getItem('directOrder')
          if (directOrderData) {
            const orderData = JSON.parse(directOrderData)
            setCartItems(orderData.oderItems)
            setLoadingCart(false)
            return
          }
        }

        // Nếu không phải đơn hàng trực tiếp, lấy từ giỏ hàng
        const cart = await cartApi.getCart()
        const transformedItems = await transformCartItems(cart)
        setCartItems(transformedItems)

        if (transformedItems.length === 0) {
          toast.info('Giỏ hàng của bạn đang trống')
          navigate('/cart')
        }
      } catch (error) {
        console.error('Error fetching order data:', error)
        toast.error('Không thể tải thông tin đơn hàng')
        navigate('/cart')
      } finally {
        setLoadingCart(false)
      }
    }

    if (!loading && user) {
      console.log('Fetching order data for user:', user)
      fetchOrderData()
    }
  }, [navigate, loading, user, location.search])

  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Tính tổng tiền giỏ hàng
  const calcSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Phí vận chuyển
  const calcShippingFee = () => {
    // Logic tính phí vận chuyển (có thể thay đổi theo đơn hàng)
    const subtotal = calcSubtotal()
    return subtotal > 300000 ? 0 : 30000 // Miễn phí vận chuyển cho đơn > 300k
  }

  // Tổng cộng
  const calcTotal = () => {
    return calcSubtotal() + calcShippingFee()
  }

  // Xử lý đặt hàng
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Kiểm tra form
    const requiredFields = ['fullName', 'phone', 'address', 'city', 'district', 'ward']
    const missingFields = requiredFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      toast.error('Vui lòng điền đầy đủ thông tin giao hàng')
      return
    }

    try {
      // Chuẩn bị dữ liệu đơn hàng theo format API yêu cầu
      const orderItems = cartItems.map((item) => ({
        productID: item.productID || item.productId,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image,
      }))

      const orderData = {
        oderItems: orderItems,
        totalPrice: calcTotal(),
        status: 'pending',
      }

      // Log dữ liệu gửi đi
      console.log('Creating order with data:', {
        userId: user.id,
        orderData: orderData,
      })

      // Gọi API tạo đơn hàng
      const response = await orderApi.createOrder(user.id, orderData)

      // Log response từ API
      console.log('Order API Response:', response)

      if (response && response.data) {
        // Xóa giỏ hàng và đơn hàng trực tiếp sau khi đặt hàng thành công
        try {
          // Xóa đơn hàng trực tiếp nếu có
          localStorage.removeItem('directOrder')

          // Xóa giỏ hàng nếu không phải đơn hàng trực tiếp
          const isDirectOrder = new URLSearchParams(location.search).get('direct') === 'true'
          if (!isDirectOrder) {
            console.log('Clearing cart...')
            await cartApi.clearCart()
            console.log('Cart cleared successfully')
            // Dispatch cart change event with count=0
            window.dispatchEvent(new CustomEvent('cartChanged', { detail: { count: 0 } }))
          }

          toast.success('Đặt hàng thành công!')

          // Lưu thông tin người dùng vào localStorage
          const userInfo = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            district: formData.district,
            ward: formData.ward,
          }
          localStorage.setItem('userInfo', JSON.stringify(userInfo))

          if (formData.paymentMethod === 'bank') {
            // Chuyển sang trang QR, truyền orderID, amount, fullName
            navigate('/checkout/bank-transfer', {
              state: {
                orderID: response.data.data.id, // tuỳ API trả về
                amount: calcTotal(),
              },
            })
          } else {
            setTimeout(() => {
              navigate('/manage-order')
            }, 2000)
          }
        } catch (error) {
          console.error('Error clearing cart:', error)
          toast.error('Đặt hàng thành công nhưng có lỗi khi xóa giỏ hàng')
        }
      }
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('Không thể tạo đơn hàng')
    }
  }

  if (loading || loadingCart) {
    return <div className='container mx-auto px-4 py-8 text-center'>Đang tải...</div>
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-8 text-center'>Thanh toán đơn hàng</h1>

      <button
        onClick={() => navigate('/cart')}
        className='mb-6 flex items-center text-blue-600 hover:text-blue-800'
      >
        <FaArrowLeft className='mr-2' /> Quay lại giỏ hàng
      </button>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Thông tin giao hàng */}
        <div className='lg:w-2/3'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-lg font-semibold mb-4'>Thông tin giao hàng</h2>

            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='col-span-2 md:col-span-1'>
                  <label className='block text-gray-700 mb-2'>Họ và tên *</label>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-gray-700 mb-2'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 mb-2'>Số điện thoại *</label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-gray-700 mb-2'>Tỉnh/Thành phố *</label>
                  <select
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  >
                    <option value=''>-- Chọn Tỉnh/Thành phố --</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-gray-700 mb-2'>Quận/Huyện *</label>
                  <input
                    type='text'
                    name='district'
                    value={formData.district}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-gray-700 mb-2'>Phường/Xã *</label>
                  <input
                    type='text'
                    name='ward'
                    value={formData.ward}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>

                <div className='col-span-2'>
                  <label className='block text-gray-700 mb-2'>Địa chỉ cụ thể *</label>
                  <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    placeholder='Số nhà, tên đường, tòa nhà,...'
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>

                <div className='col-span-2'>
                  <label className='block text-gray-700 mb-2'>Ghi chú</label>
                  <textarea
                    name='note'
                    value={formData.note}
                    onChange={handleChange}
                    placeholder='Ghi chú cho đơn hàng (nếu có)...'
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24'
                  ></textarea>
                </div>
              </div>

              <div className='mt-6'>
                <h2 className='text-lg font-semibold mb-4'>Phương thức thanh toán</h2>

                <div className='space-y-3'>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className='flex items-center'>
                      <input
                        type='radio'
                        id={method.id}
                        name='paymentMethod'
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleChange}
                        className='mr-3 h-4 w-4'
                      />
                      <label htmlFor={method.id} className='flex items-center cursor-pointer'>
                        {method.id === 'momo' || method.id === 'vnpay' ? (
                          <img src={method.icon} alt={method.name} className='h-6 w-auto mr-2' />
                        ) : (
                          <span className='mr-2'>{method.icon}</span>
                        )}
                        {method.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className='lg:w-1/3'>
          <div className='bg-white rounded-lg shadow-md p-6 sticky top-8'>
            <h2 className='text-lg font-semibold mb-4'>Thông tin đơn hàng</h2>

            <div className='max-h-64 overflow-y-auto mb-4'>
              {cartItems.map((item, index) => (
                <div key={index} className='flex items-center mb-4 pb-4 border-b last:border-b-0'>
                  <div className='w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0'>
                    <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                  </div>
                  <div className='ml-4 flex-grow'>
                    <h3 className='text-sm font-medium'>{item.name}</h3>
                    <p className='text-gray-500 text-xs'>
                      {item.size && `Size: ${item.size}`}
                      {item.color && `, Màu: ${item.color}`}
                    </p>
                    <div className='flex justify-between mt-1'>
                      <span className='text-sm text-gray-600'>x{item.quantity}</span>
                      <span className='text-sm font-medium'>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='border-t border-gray-200 pt-4'>
              <div className='flex justify-between mb-2'>
                <span>Tạm tính</span>
                <span>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    calcSubtotal(),
                  )}
                </span>
              </div>

              <div className='flex justify-between mb-2'>
                <span>Phí vận chuyển</span>
                <span>
                  {calcShippingFee() > 0
                    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        calcShippingFee(),
                      )
                    : 'Miễn phí'}
                </span>
              </div>

              <div className='border-t border-gray-200 pt-4 mt-2'>
                <div className='flex justify-between font-bold text-lg'>
                  <span>Tổng cộng</span>
                  <span>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      calcTotal(),
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className='mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-medium'
            >
              Đặt hàng
            </button>

            <p className='text-sm text-gray-500 mt-4'>
              Bằng cách đặt hàng, bạn đồng ý với các điều khoản và điều kiện của chúng tôi
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
