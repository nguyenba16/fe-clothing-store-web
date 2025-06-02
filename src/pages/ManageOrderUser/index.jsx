import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import orderApi from '../../apis/orderApi'
import LoadingComponent from '../../components/components/LoadingComponent'
import emtyCart from '../../assets/images/emptyCart.png'
import { Button } from 'antd'
import OrderItem from './components/Orderitems'

// Format currency function
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const ManageOrderUser = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10
  const [showAllItems, setShowAllItems] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [selectedStatus])

  // Tính toán các đơn hàng cho trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(orders.length / ordersPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      console.log('Fetching orders with status:', selectedStatus)
      const response = await orderApi.getUserOrders(selectedStatus)
      console.log('API Response:', response)

      if (response?.data?.data) {
        // Backend trả về array trong response.data.data
        const ordersData = Array.isArray(response.data.data) ? response.data.data : []
        // Sắp xếp theo ngày tạo giảm dần (mới nhất lên đầu)
        const sortedOrders = ordersData.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
        console.log('Processed orders data:', sortedOrders)
        setOrders(sortedOrders)
      } else {
        console.log('No orders data in response')
        setOrders([])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      console.log('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      })
      toast.error('Không thể tải danh sách đơn hàng')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      console.log('Canceling order:', orderId)
      const response = await orderApi.cancelOrder(orderId)
      console.log('Cancel order response:', response)

      if (response?.data?.data) {
        toast.success('Hủy đơn hàng thành công')
        fetchOrders() // Refresh danh sách đơn hàng
      } else {
        toast.error('Không thể hủy đơn hàng')
      }
    } catch (error) {
      console.error('Error canceling order:', error)
      console.log('Cancel error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      })
      toast.error('Không thể hủy đơn hàng')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'delivery':
        return 'bg-purple-100 text-purple-800'
      case 'completed':
        return 'bg-teal-100 text-teal-800'
      case 'cancel':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận'
      case 'confirmed':
        return 'Đã xác nhận'
      case 'paid':
        return 'Đã thanh toán'
      case 'delivery':
        return 'Đang giao hàng'
      case 'completed':
        return 'Đã hoàn thành'
      case 'cancel':
        return 'Đã hủy'
      default:
        return status
    }
  }

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <div className='p-10 flex flex-col justify-center items-center'>
      <h1 className='text-[32px] font-bold uppercase'>Lịch sử mua hàng</h1>
      <div className='w-[80vw] grid grid-cols-6 bg-primary py-4 px-10 mt-5'>
        <button
          className={`text-white text-[18px] font-medium p-2 ${selectedStatus === 'all' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setSelectedStatus('all')}
        >
          Tất cả
        </button>
        <button
          className={`text-white text-[18px] font-medium p-2 ${selectedStatus === 'pending' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setSelectedStatus('pending')}
        >
          Chờ xác nhận
        </button>
        <button
          className={`text-white text-[18px] font-medium p-2 ${selectedStatus === 'confirmed' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setSelectedStatus('confirmed')}
        >
          Đã xác nhận
        </button>
        <button
          className={`text-white text-[18px] font-medium p-2 ${selectedStatus === 'delivery' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setSelectedStatus('delivery')}
        >
          Đang giao
        </button>
        <button
          className={`text-white text-[18px] font-medium p-2 ${selectedStatus === 'completed' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setSelectedStatus('completed')}
        >
          Đã hoàn thành
        </button>
        <button
          className={`text-white text-[18px] font-medium p-2 ${selectedStatus === 'cancel' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setSelectedStatus('cancel')}
        >
          Đã hủy
        </button>
      </div>
      <div className='w-[80vw]'>
        {currentOrders.length !== 0 ? (
          currentOrders.map((order) => (
            <div key={order.id} className='bg-[#ffeed3] py-4 px-10 mt-2'>
              <div className='flex justify-between gap-3 border-b-2 border-black border-dashed py-2'>
                <div>
                  <p className='text-[18px] font-bold'>Mã đơn hàng: {order.id}</p>
                  <p className='text-[14px] text-gray-600'>
                    Ngày đặt: {new Date(order.createAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)} flex items-center justify-center min-w-[120px]`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
              <div>
                {order.oderItems && (
                  <>
                    {order.oderItems
                      .slice(0, showAllItems ? undefined : 3)
                      .map((orderItems, index) => (
                        <OrderItem
                          key={index}
                          orderItem={orderItems}
                          formatCurrency={formatCurrency}
                        />
                      ))}
                    {order.oderItems.length > 3 && (
                      <div className='flex justify-center mt-4'>
                        <button
                          onClick={() => setShowAllItems(!showAllItems)}
                          className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300'
                        >
                          {showAllItems
                            ? 'Thu gọn'
                            : `Xem thêm ${order.oderItems.length - 3} sản phẩm`}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className='flex justify-between items-center mt-5 mb-4'>
                <div className='text-[14px] text-gray-600'>
                  <p>Người nhận: {order.userID.name}</p>
                  <p>SĐT: {order.userID.phoneNumber}</p>
                  <p>Email: {order.userID.email}</p>
                </div>
                <div className='text-right'>
                  <p className='text-[18px] font-bold text-black-600'>
                    Tổng tiền: {formatCurrency(order.totalPrice)}
                  </p>
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className='mt-2 px-3 py-2 bg-red-500 rounded-xl text-white font-bold hover:bg-red-600 transition-colors duration-300'
                    >
                      Hủy đơn
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='bg-[#ffeed3] py-4 px-10 mt-2 h-[40vh] flex flex-col items-center justify-center'>
            <img src={emtyCart} alt='Giỏ hàng trống' className='w-[10vw]' />
            <p className='text-[18px] font-medium italic text-center'>Chưa có đơn hàng nào!</p>
          </div>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className='flex justify-center gap-2 mt-5'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageOrderUser
