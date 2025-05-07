import { useEffect, useState } from 'react'
import userApi from '../../apis/userApi'
import LoadingComponent from '../../components/components/LoadingComponent'
import emtyCart from '../../assets/images/emptyCart.png'
import { Button } from 'antd'
import OrderItem from './components/Orderitems'
import { toast } from 'react-toastify'
export default function ManageOrderUser() {
  const [orderList, setOrderList] = useState([])
  const [statusSort, setStatusSort] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const handleFetchOrderList = async () => {
    setIsLoading(true)
    try {
      const res = await userApi.getOrderList(statusSort)
      setOrderList(res.data)
    } catch (error) {
      console.log('Có lỗi khi lấy order: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      await userApi.cancelOrder(orderId)
      handleFetchOrderList()
      toast.success('Đã hủy đơn hàng thành công!')
    } catch (error) {
      console.log('Có lỗi khi lấy order: ', error)
      toast.error('Không thể hủy đơn hàng!')
    }
  }

  useEffect(() => {
    handleFetchOrderList()
  }, [statusSort])

  return (
    <div className='p-10 flex flex-col justify-center items-center'>
      <h1 className='text-[40px] font-bold uppercase'>Lịch sử mua hàng</h1>
      <div className='w-[80vw] grid grid-cols-6 bg-primary py-5 px-10 mt-5'>
        <button
          className={`text-white text-[20px] font-medium p-3 ${statusSort === 'all' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setStatusSort('all')}
        >
          Tất cả
        </button>
        <button
          className={`text-white text-[20px] font-medium p-3 ${statusSort === 'pending' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setStatusSort('pending')}
        >
          Chưa duyệt
        </button>
        <button
          className={`text-white text-[20px] font-medium p-3 ${statusSort === 'confirmed' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setStatusSort('confirmed')}
        >
          Đã duyệt
        </button>
        <button
          className={`text-white text-[20px] font-medium p-3 ${statusSort === 'delivery' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setStatusSort('delivery')}
        >
          Đang giao
        </button>
        <button
          className={`text-white text-[20px] font-medium p-3 ${statusSort === 'completed' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setStatusSort('completed')}
        >
          Đã hoàn thành
        </button>
        <button
          className={`text-white text-[20px] font-medium p-3 ${statusSort === 'cancel' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setStatusSort('cancel')}
        >
          Đã hủy
        </button>
      </div>
      <div className='w-[80vw]'>
        {orderList.length != 0 ? (
          orderList.map((item) => {
            return (
              <div className='bg-[#ffeed3] py-4 px-10 mt-2'>
                <div className='flex justify-between gap-3 border-b-2 border-black border-dashed py-2'>
                  <p className='text-[20px] font-bold'>Élégante - Grace in style</p>
                  <p className='text-[20px]'>{item.status}</p>
                </div>
                <div>
                  {item.oderItems.map((orderItem) => {
                    return <OrderItem orderItem={orderItem} />
                  })}
                </div>
                <p className='text-[20px] font-bold text-red-600 text-right mt-5'>
                  <strong className='text-black'>Tổng tiền:</strong> {item.totalPrice} VNĐ
                </p>
                <div className='flex justify-end mt-5 mb-4'>
                  {item.status == 'pending' ? (
                    <button
                      onClick={() => handleCancelOrder(item.id)}
                      className='px-3 py-2 bg-red-500 rounded-xl text-white font-bold'
                    >
                      Hủy đơn
                    </button>
                  ) : null}
                </div>
              </div>
            )
          })
        ) : (
          <div className='bg-[#ffeed3] py-4 px-10 mt-2 h-[40vh] flex flex-col items-center justify-center'>
            <img src={emtyCart} alt='Giỏ hàng trống' className='w-[10vw]' />
            <p className='text-[20px] font-medium italic text-center'>Chưa có đơn hàng nào!</p>
          </div>
        )}
      </div>
    </div>
  )
}
