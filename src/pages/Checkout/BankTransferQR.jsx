import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminApi from '../../apis/adminApi'

const bankId = '970422'
const accountNo = '001252004'
const template = 'compact2'
const accountName = 'LE NGOC LAN'

const getVietQRUrl = (amount, description) => {
  return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${description}&accountName=${accountName}`
}

const BankTransferQR = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderID, amount } = location.state || {}

  if (!orderID) {
    return <div>Không tìm thấy thông tin đơn hàng.</div>
  }

  const description = `DH ${orderID}`
  console.log('description', description)

  setTimeout(() => {
    setInterval(() => {
      checkPaid(amount, description)
    }, 10000)
  }, 20000)

  let isSuccess = false
  async function checkPaid(amount, description) {
    if (isSuccess) return
    else {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyrqMYIFFxVwGMjZyH_Usz90fQi3o9C9Av4BlnEgKCVx3_RFDpIjeFvs36oaBppFnZz/exec',
        )
        const data = await response.json()
        console.log('data paid', data)
        const lastPaid = data.data[data.data.length - 1]
        const lastPrice = lastPaid['Giá trị']
        const lastDescription = lastPaid['Mô tả']
        console.log('lastPrice', lastPrice >= amount)
        console.log('lastDescription', lastDescription.includes(description))
        if (lastPrice >= amount && lastDescription.includes(description)) {
          try {
            await AdminApi.updateStatusOrder(orderID, 'paid')
            isSuccess = true
            navigate('/manage-order')
            toast.success('Thanh toán thành công')
          } catch (error) {
            console.error('Error updating order status:', error)
            return
          }
        } else {
          console.log('Thanh toán chưa thành công')
        }
      } catch {
        console.log('Lỗi khi kiểm tra thanh toán')
      }
    }
  }
  return (
    <div className='container mx-auto px-4 py-8 flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Chuyển khoản qua QR</h1>
      <img
        src={getVietQRUrl(amount, description)}
        alt='QR chuyển khoản'
        className='w-64 h-auto mb-2'
      />
      <div className='text-sm text-gray-700 mb-4'>
        <div>
          <b>Ngân hàng:</b> MBBank{' '}
        </div>
        <div>
          <b>Số tài khoản:</b> 001252004{' '}
        </div>
        <div>
          <b>Tên tài khoản:</b> LE NGOC LAN{' '}
        </div>
        <div>
          <b>Số tiền:</b>{' '}
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
        </div>
        <div>
          <b>Nội dung:</b> {description}
        </div>
      </div>

      <div className='flex gap-4'>
        <button
          onClick={() => navigate('/manage-order')}
          className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'
        >
          Hủy thanh toán
        </button>
      </div>
    </div>
  )
}

export default BankTransferQR
