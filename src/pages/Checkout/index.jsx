import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Checkout = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
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
    { id: 'momo', name: 'Ví điện tử MoMo', icon: '💳' },
    { id: 'vnpay', name: 'VN Pay', icon: '💳' },
  ]

  // Lấy dữ liệu giỏ hàng khi component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    } else {
      // Nếu không có giỏ hàng, chuyển về trang giỏ hàng
      toast.info('Giỏ hàng của bạn đang trống')
      navigate('/cart')
    }

    // Lấy thông tin người dùng từ localStorage nếu có
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo)
      setFormData((prevData) => ({
        ...prevData,
        fullName: parsedInfo.fullName || '',
        email: parsedInfo.email || '',
        phone: parsedInfo.phone || '',
      }))
    }

    setLoading(false)
  }, [navigate])

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
  const handleSubmit = (e) => {
    e.preventDefault()

    // Kiểm tra form
    const requiredFields = ['fullName', 'phone', 'address', 'city', 'district', 'ward']
    const missingFields = requiredFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      toast.error('Vui lòng điền đầy đủ thông tin giao hàng')
      return
    }

    // Thông tin đơn hàng để gửi lên server
    const orderData = {
      customerInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.city}`,
        note: formData.note,
      },
      paymentMethod: formData.paymentMethod,
      items: cartItems,
      totalAmount: calcTotal(),
      shippingFee: calcShippingFee(),
      orderDate: new Date().toISOString(),
    }

    // Trong thực tế, gửi dữ liệu đến server ở đây
    console.log('Order data:', orderData)

    // Giả lập thành công
    toast.success('Đặt hàng thành công!')

    // Xóa giỏ hàng sau khi đặt hàng
    localStorage.removeItem('cart')

    // Lưu thông tin người dùng vào localStorage để sử dụng cho lần sau
    const userInfo = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    }
    localStorage.setItem('userInfo', JSON.stringify(userInfo))

    // Chuyển hướng đến trang hoàn tất thanh toán hoặc trang chủ
    // navigate('/order-complete', { state: { orderData } });
    // Nếu có trang hoàn tất đơn hàng, bạn có thể chuyển hướng đến trang đó
    // Trong ví dụ này, chuyển về trang chủ
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  if (loading) {
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
                        <span className='mr-2'>{method.icon}</span>
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
