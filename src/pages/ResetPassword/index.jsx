import { Button } from 'antd'
import image from '../../assets/images/signin/image.png'
import { useState } from 'react'
import NoAuthApi from '../../apis/noAuthApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes'
export default function ResetPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [newPassword, setNewPassword] = useState()
  const [code, setCode] = useState()
  const [sent, setSent] = useState(false)
  const handSendVerifyCode = async () => {
    if (!email || email.trim() === '') {
      toast.error('Vui lòng nhập email!')
      return
    }
    try {
      const res = await NoAuthApi.sendVerifyCode(email)
      if (res.data == true) {
        toast.success('Đã gửi mã qua email của bạn!')
      } else {
        toast.error('Không thể gửi mã qua email của bạn!')
      }
      setSent(res.data)
    } catch (error) {
      toast.error('Không thể gửi mã qua email của bạn!')
      console.log('Có lỗi khi gửi code qua email: ', error)
    }
  }
  const handChangPass = async () => {
    if (!newPassword || newPassword.trim() === '') {
      toast.error('Vui lòng nhập mật khẩu mới!')
      return
    }

    if (!code || code.trim() === '') {
      toast.error('Vui lòng nhập mã xác thực!')
      return
    }
    try {
      const res = await NoAuthApi.changePassword(email, code, newPassword)
      if (res.data == true) {
        toast.success('Đã đổi mật khẩu thành công!')
        navigate(routes.SIGNIN)
      } else {
        toast.error('Không thể đổi mật khẩu!')
        setSent(false)
      }
    } catch (error) {
      toast.error('Không thể đổi mật khẩu!')
      console.log('Có lỗi khi đổi pass: ', error)
    }
  }
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className='w-[100vw] h-[100vh] flex items-center px-[15vw] justify-center'
    >
      {!sent ? (
        <div className='w-[30vw] bg-[#fff] rounded-3xl px-10 py-10 flex flex-col items-center'>
          <h1 className='text-center font-bold text-[40px] text-primary'> Nhập Email</h1>
          <p className='mt-3 text-center'>Vui lòng nhập Email để xác thực!</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='w-full h-[50px] border-2 border-black p-3 mt-5 rounded-xl'
            placeholder='Nhập email...'
          />
          <button
            onClick={handSendVerifyCode}
            className='px-5 py-2 bg-green-600  text-[18px] text-white rounded-2xl mt-5'
          >
            Gửi mã
          </button>
        </div>
      ) : (
        <div className='w-[30vw] bg-[#fff] rounded-3xl px-10 py-10 flex flex-col items-center'>
          <h1 className='text-center font-bold text-[40px] text-primary'> Nhập đổi mật khẩu</h1>
          <p className='mt-3 text-center'>Vui lòng nhập các thông tin bên dưới!</p>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            defaultValue={''}
            value={newPassword}
            className='w-full h-[50px] border-2 border-black p-3 mt-5 rounded-xl'
            placeholder='Nhập mật khẩu mới...'
          />
          <input
            onChange={(e) => setCode(e.target.value)}
            value={code}
            className='w-full h-[50px] border-2 border-black p-3 mt-5 rounded-xl'
            placeholder='Nhập mã xác thực...'
          />
          <button
            onClick={handChangPass}
            className='px-5 py-2 bg-green-600  text-[18px] text-white rounded-2xl mt-5'
          >
            Đổi mật khẩu
          </button>
        </div>
      )}
    </div>
  )
}
