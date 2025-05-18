import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from '../../stores/useAuth'

//sample cart data
const sampleCartData = [
  {
    id: 1,
    name: 'Sản phẩm 1',
    image: 'https://via.placeholder.com/150',
    price: 100000,
    quantity: 2,
    size: 'M',
    color: 'Đỏ',
  },
  {
    id: 2,
    name: 'Sản phẩm 2',
    image: 'https://via.placeholder.com/150',
    price: 200000,
    quantity: 1,
    size: 'L',
    color: 'Xanh',
  },
  {
    id: 3,
    name: 'Sản phẩm 3',
    image: 'https://via.placeholder.com/150',
    price: 150000,
    quantity: 3,
    size: 'S',
    color: 'Vàng',
  },
  {
    id: 4,
    name: 'Sản phẩm 4',
    image: 'https://via.placeholder.com/150',
    price: 250000,
    quantity: 1,
    size: 'XL',
    color: 'Đen',
  },
  {
    id: 5,
    name: 'Sản phẩm 5',
    image: 'https://via.placeholder.com/150',
    price: 300000,
    quantity: 2,
    size: 'XXL',
    color: 'Trắng',
  },
  {
    id: 6,
    name: 'Sản phẩm 6',
    image: 'https://via.placeholder.com/150',
    price: 120000,
    quantity: 1,
    size: 'M',
    color: 'Xám',
  },
  {
    id: 7,
    name: 'Sản phẩm 7',
    image: 'https://via.placeholder.com/150',
    price: 180000,
    quantity: 2,
    size: 'L',
    color: 'Hồng',
  },
  {
    id: 8,
    name: 'Sản phẩm 8',
    image: 'https://via.placeholder.com/150',
    price: 220000,
    quantity: 1,
    size: 'S',
    color: 'Nâu',
  },
]

const Cart = () => {
  const [cartItems, setCartItems] = useState(sampleCartData)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user } = useAuth()
  const isAuthenticated = !!user // Kiểm tra xem người dùng đã đăng nhập hay chưa

  // Lấy dữ liệu giỏ hàng từ localStorage khi component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
    setLoading(false)
  }, [])

  // Cập nhật localStorage khi cartItems thay đổi
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems, loading])

  // Xử lý cập nhật số lượng sản phẩm
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
    toast.success('Đã cập nhật số lượng sản phẩm')
  }

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const removeItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng')
  }

  // Tính tổng tiền giỏ hàng
  const calcTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.warning('Vui lòng đăng nhập để tiến hành thanh toán')
      navigate('/signin')
      return
    }

    if (cartItems.length === 0) {
      toast.warning('Giỏ hàng của bạn đang trống')
      return
    }

    // Chuyển đến trang thanh toán hoặc xử lý thanh toán ở đây
    toast.info('Đang chuyển đến trang thanh toán...')
    navigate('/checkout') // Nếu có trang thanh toán
  }

  // Xử lý trường hợp giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-8 text-center'>Giỏ hàng của bạn</h1>
        <div className='bg-white rounded-lg shadow-md p-8 text-center'>
          <p className='text-lg mb-6'>Giỏ hàng của bạn đang trống</p>
          <Link
            to='/'
            className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300'
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-8 text-center'>Giỏ hàng của bạn</h1>

      <div className='flex flex-col md:flex-row gap-8'>
        {/* Danh sách sản phẩm */}
        <div className='md:w-2/3'>
          <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Sản phẩm
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Giá
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Số lượng
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Tổng
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-20 w-20'>
                          <img
                            className='h-20 w-20 object-cover'
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>{item.name}</div>
                          {item.size && (
                            <div className='text-sm text-gray-500'>Size: {item.size}</div>
                          )}
                          {item.color && (
                            <div className='text-sm text-gray-500'>Màu: {item.color}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(item.price)}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className='p-1 rounded bg-gray-200 hover:bg-gray-300'
                        >
                          <FaMinus className='text-gray-600' />
                        </button>
                        <input
                          type='number'
                          min='1'
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className='mx-2 w-12 text-center border rounded'
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className='p-1 rounded bg-gray-200 hover:bg-gray-300'
                        >
                          <FaPlus className='text-gray-600' />
                        </button>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(item.price * item.quantity)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        onClick={() => removeItem(item.id)}
                        className='text-red-600 hover:text-red-800'
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='mt-4'>
            <Link to='/' className='text-blue-600 hover:text-blue-800'>
              ← Tiếp tục mua sắm
            </Link>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className='md:w-1/3'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-lg font-bold mb-4'>Tóm tắt đơn hàng</h2>

            <div className='border-t border-gray-200 pt-4'>
              <div className='flex justify-between mb-2'>
                <span>Tạm tính</span>
                <span>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    calcTotal(),
                  )}
                </span>
              </div>
              <div className='flex justify-between mb-2'>
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>

              <div className='border-t border-gray-200 pt-4 mt-4'>
                <div className='flex justify-between font-bold'>
                  <span>Tổng cộng</span>
                  <span>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      calcTotal(),
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className='mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300'
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>

          {/* Mã giảm giá */}
          <div className='bg-white rounded-lg shadow-md p-6 mt-4'>
            <h2 className='text-lg font-bold mb-4'>Mã giảm giá</h2>
            <div className='flex space-x-2'>
              <input
                type='text'
                placeholder='Nhập mã giảm giá'
                className='flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button className='bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300'>
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
