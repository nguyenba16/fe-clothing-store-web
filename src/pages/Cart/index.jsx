import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from '../../stores/useAuth'
import cartApi from '../../apis/cartApi'
import NoAuthApi from '../../apis/noAuthApi'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user } = useAuth()
  const isAuthenticated = !!user

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

  // Lấy dữ liệu giỏ hàng từ API khi component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (isAuthenticated) {
          const cart = await cartApi.getCart()
          console.log('Cart data:', cart)
          const transformedItems = await transformCartItems(cart)
          setCartItems(transformedItems)
        }
      } catch (error) {
        console.error('Error fetching cart:', error)
        toast.error('Không thể tải giỏ hàng')
        setCartItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [isAuthenticated])

  // Xử lý cập nhật số lượng sản phẩm
  const updateQuantity = async (productId, size, color, newQuantity) => {
    if (newQuantity < 1) return

    try {
      const updatedCart = await cartApi.updateItemQuantity(productId, size, color, newQuantity)
      const transformedItems = await transformCartItems(updatedCart)
      setCartItems(transformedItems)
      // Dispatch cart change event
      window.dispatchEvent(new Event('cartChanged'))
      toast.success('Đã cập nhật số lượng sản phẩm')
    } catch (error) {
      console.error('Error updating quantity:', error)
      toast.error('Không thể cập nhật số lượng')
    }
  }

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const removeItem = async (productId, size, color) => {
    try {
      const updatedCart = await cartApi.removeItemFromCart(productId, size, color)
      const transformedItems = await transformCartItems(updatedCart)
      setCartItems(transformedItems)
      // Dispatch cart change event
      window.dispatchEvent(new Event('cartChanged'))
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng')
    } catch (error) {
      console.error('Error removing item:', error)
      toast.error('Không thể xóa sản phẩm')
    }
  }

  // Xử lý xóa toàn bộ giỏ hàng
  const clearCart = async () => {
    try {
      await cartApi.clearCart()
      setCartItems([])
      // Dispatch cart change event
      window.dispatchEvent(new Event('cartChanged'))
      toast.success('Đã xóa toàn bộ giỏ hàng')
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast.error('Không thể xóa giỏ hàng')
    }
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
    navigate('/checkout')
  }

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>Đang tải giỏ hàng...</div>
      </div>
    )
  }

  // Xử lý trường hợp giỏ hàng trống
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-8 text-center'>Giỏ hàng của bạn</h1>
        <div className='bg-white rounded-lg shadow-md p-8 text-center'>
          <p className='text-lg mb-6'>Giỏ hàng của bạn đang trống</p>
          <Link
            to='/product?category=all'
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
                  <tr key={`${item.productId}-${item.size}-${item.color}`}>
                    <td className='px-6 py-4'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-20 w-20'>
                          <img
                            className='h-20 w-20 object-cover'
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className='ml-4'>
                          <Link
                            to={`/product/${item.productId}`}
                            className='text-sm font-medium text-gray-900 break-words max-w-[200px] whitespace-normal hover:text-blue-600 transition-colors'
                          >
                            {item.name}
                          </Link>
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
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                          }
                          className='p-1 rounded bg-gray-200 hover:bg-gray-300'
                        >
                          <FaMinus className='text-gray-600' />
                        </button>
                        <input
                          type='number'
                          min='1'
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              parseInt(e.target.value) || 1,
                            )
                          }
                          className='mx-2 w-12 text-center border rounded'
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                          }
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
                    <td className='px-10 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
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

          <div className='mt-4 flex justify-between items-center'>
            <Link to='/' className='text-blue-600 hover:text-blue-800'>
              ← Tiếp tục mua sắm
            </Link>
            <button onClick={clearCart} className='text-red-600 hover:text-red-800'>
              Xóa toàn bộ giỏ hàng
            </button>
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
