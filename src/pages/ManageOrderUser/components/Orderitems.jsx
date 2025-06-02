import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoAuthApi from '../../../apis/noAuthApi'

export default function OrderItem({ orderItem, formatCurrency }) {
  const navigate = useNavigate()
  const [detailProduct, setDetailProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAllItems, setShowAllItems] = useState(false)

  const getDetailProduct = async () => {
    try {
      setLoading(true)
      const res = await NoAuthApi.getProductById(orderItem.productID)
      if (res?.data) {
        setDetailProduct(res.data)
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageClick = () => {
    if (detailProduct) {
      navigate(`/product/${orderItem.productID}`)
    }
  }

  useEffect(() => {
    getDetailProduct()
  }, [orderItem.productID])

  if (loading) {
    return (
      <div className='flex gap-3 border-b-2 border-[#4e4e4e] mt-2 p-3 animate-pulse'>
        <div className='w-[10vw] h-[10vw] bg-gray-200 rounded-md'></div>
        <div className='flex-1 space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
          <div className='space-y-1'>
            <div className='h-3 bg-gray-200 rounded w-1/2'></div>
            <div className='h-3 bg-gray-200 rounded w-1/3'></div>
            <div className='h-3 bg-gray-200 rounded w-1/4'></div>
          </div>
        </div>
      </div>
    )
  }

  if (!detailProduct) {
    return (
      <div className='flex gap-3 border-b-2 border-[#4e4e4e] mt-2 p-3'>
        <div className='w-[10vw] h-[10vw] bg-gray-100 rounded-md flex items-center justify-center'>
          <span className='text-gray-400'>No image</span>
        </div>
        <div className='flex flex-col justify-between'>
          <p className='text-[16px] font-bold text-gray-500'>Product not found</p>
          <div>
            <p className='text-[14px]'>
              <strong>Số lượng: </strong> {orderItem.quantity}
            </p>
            <p className='text-[14px]'>
              <strong>Kích cỡ: </strong> {orderItem.size}
            </p>
            <p className='text-[14px]'>
              <strong>Màu sắc: </strong> {orderItem.color}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Tìm ảnh phù hợp với màu sắc
  const productImage =
    detailProduct.productImage?.find((img) => img.color === orderItem.color)?.url ||
    detailProduct.productImage?.[0]?.url ||
    null

  return (
    <div className='flex gap-3 border-b-2 border-[#4e4e4e] mt-2 p-3'>
      <img
        src={productImage}
        alt={detailProduct.productName}
        className='w-[10vw] h-[10vw] object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity duration-300'
        onClick={handleImageClick}
        onError={(e) => {
          e.target.onerror = null
          e.target.src = 'https://via.placeholder.com/150?text=No+Image'
        }}
      />
      <div className='flex flex-col justify-between flex-1'>
        <div>
          <p
            className='text-[16px] font-bold cursor-pointer hover:text-primary transition-colors duration-300'
            onClick={handleImageClick}
          >
            {detailProduct.productName}
          </p>
          <p className='text-[14px] text-gray-600 mt-1'>
            {formatCurrency(detailProduct.price)} x {orderItem.quantity}
          </p>
        </div>
        <div className='space-y-1'>
          <p className='text-[14px]'>
            <strong>Số lượng: </strong> {orderItem.quantity}
          </p>
          <p className='text-[14px]'>
            <strong>Kích cỡ: </strong> {orderItem.size}
          </p>
          <p className='text-[14px]'>
            <strong>Màu sắc: </strong> {orderItem.color}
          </p>
          <p className='text-[14px] font-medium text-black-600'>
            <strong>Thành tiền: </strong> {formatCurrency(detailProduct.price * orderItem.quantity)}
          </p>
        </div>
      </div>
    </div>
  )
}
