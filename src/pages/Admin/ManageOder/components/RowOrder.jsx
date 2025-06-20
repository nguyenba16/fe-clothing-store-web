import { useEffect, useState } from 'react'
import { Modal, Box } from '@mui/material'
import adminApi from '../../../../apis/adminApi'
import NoAuthApi from '../../../../apis/noAuthApi'
import { toast } from 'react-toastify'
import { FaEye } from 'react-icons/fa'

const RowOrder = ({ val, key, index, formatCurrency }) => {
  const [orderItems, setOrderItems] = useState([])
  const [productInfo, setProductInfo] = useState({}) // { productID: { name, image } }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState(val.status)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const handleStatus = async (e) => {
    setStatus(e.target.value)
    try {
      const res = await adminApi.updateStatusOrder(val.id, e.target.value)
      toast.success('Cập nhật trạng thái đơn hàng thành công!')
      return res
    } catch (error) {
      toast.error('Cập nhật trạng thái đơn hàng thất bại!')
      console.log('Không thể update status: ', error)
    }
  }
  useEffect(() => {
    setOrderItems(val.oderItems)
  }, [])

  // Lấy thông tin sản phẩm cho từng item
  useEffect(() => {
    const fetchProductInfo = async () => {
      const info = {}
      await Promise.all(
        (val.oderItems || []).map(async (item) => {
          try {
            const res = await NoAuthApi.getProductById(item.productID)
            info[item.productID] = {
              name: res.data.productName,
              images: res.data.productImage || [],
            }
          } catch (error) {
            info[item.productID] = { name: '', image: '', images: [] }
          }
        }),
      )
      setProductInfo(info)
    }
    if (val.oderItems && val.oderItems.length > 0) {
      fetchProductInfo()
    }
  }, [val.oderItems])
  console.log(val)
  return (
    <>
      <tr key={key} className='border-t'>
        <td className='border border-gray-500 p-2 text-center text-[20px]'>{index}</td>
        <td className='border border-gray-500 p-2 w-[200px] text-center text-[20px]'>
          {val?.userID?.name}
        </td>
        <td className='border border-gray-500 p-2 w-[350px] '>
          <strong>Mã đơn: </strong> {val.id}
          <br />
          <strong>Thời gian: </strong>
          {val.createAt}
          <br />
          <strong>Email: </strong> {val.userID.email}
          <br />
          <strong>SDT: </strong> {val.userID.phoneNumber}
        </td>
        <td className='border border-gray-500 p-2 w-[150px] flex-col text-center justify-center items-center '>
          <button className='bg-blue-500 text-white px-3 py-1 rounded-md' onClick={openModal}>
            Xem chi tiết
          </button>
        </td>
        <td className='border border-gray-500 p-2 w-[200px] text-center'>
          <div className='font-medium text-center text-[20px] text-red-700'>
            {formatCurrency(val.totalPrice)}
          </div>
        </td>

        <td className=' border border-gray-500 p-2  text-center'>
          <select
            value={status}
            onChange={handleStatus}
            className={`p-2 rounded-md text-white ${status === 'cancel' ? 'bg-red-500' : status === 'confirmed' ? 'bg-blue-500' : status === 'paid' ? 'bg-green-500' : status === 'delivery' ? 'bg-purple-500' : status === 'completed' ? 'bg-teal-500' : 'bg-yellow-500'}`}
          >
            <option value='pending'>Đợi duyệt</option>
            <option value='confirmed'>Duyệt</option>
            <option value='paid'>Đã thanh toán</option>
            <option value='delivery'>Đang giao</option>
            <option value='completed'>Hoàn thành</option>
            <option value='cancel'>Đã hủy</option>
          </select>
        </td>
      </tr>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box className='bg-white p-6 rounded-md shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[95vw] min-w-[600px] relative'>
          <button
            onClick={closeModal}
            className='absolute top-3 right-3 text-gray-500 hover:text-red-700 text-2xl font-bold focus:outline-none'
            aria-label='Đóng'
          >
            &times;
          </button>
          <h2 className='text-3xl font-bold text-center uppercase text-blue-800 mb-5'>
            Chi tiết đơn hàng
          </h2>
          <div className='space-y-2'>
            <p>
              <strong>Tên khách hàng:</strong> {val.userID.name}
            </p>
            <p>
              <strong>Email:</strong> {val.userID.email}
            </p>
            <p>
              <strong>SDT:</strong> {val.userID.phoneNumber}
            </p>
            <p>
              <strong>Thời gian đặt hàng:</strong> {val.createAt}
            </p>
            <p>
              <strong>Mã đơn hàng:</strong> {val.id}
            </p>
            <div className='overflow-x-auto'>
              <table className='w-full table-auto'>
                <tr className='border bottom-1 bg-blue-400'>
                  <th className='border bottom-1 text-white p-2'>STT</th>
                  <th className='border bottom-1 text-white p-2'>Hình</th>
                  <th className='border bottom-1 text-white p-2'>Thông tin sản phẩm</th>
                  <th className='border bottom-1 text-white p-2'>Số lượng</th>
                  <th className='border bottom-1 text-white p-2'>Kích thước</th>
                  <th className='border bottom-1 text-white p-2'>Màu sắc</th>
                </tr>
                {orderItems.map((item, index) => {
                  const info = productInfo[item.productID] || {}
                  let imageUrl = info.image
                  if (info.images && Array.isArray(info.images)) {
                    const colorImage = info.images.find((img) => img.color === item.color)
                    if (colorImage) {
                      imageUrl = colorImage.url
                    }
                  }
                  return (
                    <tr className='border bottom-1'>
                      <td className='border bottom-1  text-center p-2'>{index + 1}</td>
                      <td className='border bottom-1 text-center p-2'>
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt={info.name}
                            className='w-16 h-16 object-cover rounded'
                          />
                        )}
                      </td>
                      <td className='border bottom-1 p-2'>
                        <p>
                          <strong>Mã số:</strong> {item.productID}
                        </p>
                        <p>
                          <strong>Tên:</strong> {info.name || item.productID}
                        </p>
                      </td>
                      <td className='border bottom-1  text-center p-2'>{item.quantity}</td>
                      <td className='border bottom-1 text-center p-2'>{item.size}</td>
                      <td className='border bottom-1 text-center p-2'>{item.color}</td>
                    </tr>
                  )
                })}
              </table>
            </div>
            <p className='flex gap-3 justify-end mt-3'>
              Tổng tiền: <p className='text-red-700 font-bold'>{formatCurrency(val.totalPrice)}</p>
            </p>
          </div>
          {/* <div className='w-full flex justify-center'>
            <button
              onClick={closeModal}
              className='mt-4 px-4 py-2 bg-green-500 text-white rounded-md w-[10vw]'
            >
              Đóng
            </button>
          </div> */}
        </Box>
      </Modal>
    </>
  )
}

export default RowOrder
