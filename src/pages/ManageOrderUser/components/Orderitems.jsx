import { useEffect, useState } from 'react'
import NoAuthApi from '../../../apis/noAuthApi'

export default function OrderItem({ orderItem }) {
  const [detailProduct, setDetailProduct] = useState()
  const getDetailProduct = async () => {
    try {
      const res = await NoAuthApi.getProductById(orderItem.productID)
      setDetailProduct(res.data)
    } catch (error) {
      console.log('Có lỗi khi lấy detail order item: ', error)
    }
  }
  useEffect(() => {
    getDetailProduct()
  }, [])
  if (!detailProduct) return <div>Loading...</div>

  return (
    <div className='flex gap-3 border-b-2 border-[#4e4e4e] mt-2 p-3'>
      <img
        src={detailProduct.productImage.length != 0 ? detailProduct.productImage[0].url : null}
        alt='Ảnh sản phẩm'
        className='w-[10vw] h-[10vw] object-cover rounded-md'
      />
      <div className='flex flex-col justify-between'>
        <p className='text-[20px] font-bold'>{detailProduct.productName}</p>
        <div>
          <p className='text-[20px]'>
            <strong>Số lượng: </strong> {orderItem.quantity}
          </p>
          <p className='text-[20px]'>
            <strong>Kích cỡ: </strong> {orderItem.size}
          </p>
          <p className='text-[20px]'>
            <strong>Màu sắc: </strong> {orderItem.color}
          </p>
        </div>
      </div>
    </div>
  )
}
