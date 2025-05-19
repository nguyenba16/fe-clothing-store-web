import { useState } from 'react'
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaShippingFast,
  FaShieldAlt,
  FaStar,
  FaHeadset,
} from 'react-icons/fa'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import store from '../../assets/images/contactUs/store.png'
import logo from '../../assets/images/logo.svg'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section with Blurred Background */}
      <div className='relative h-[300px] mb-8'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${store})`,
            filter: 'blur(0.5px)',
          }}
        />
        <div className='absolute inset-0 bg-black bg-opacity-50' />
        <div className='relative z-10 h-full flex flex-col items-center justify-center'>
          <img src={logo} alt='Logo' className='w-64 shadow-white-lg' />
          <Breadcrumb
            className='text-white text-30'
            items={[
              {
                title: (
                  <Link to='/' className='text-white hover:text-gray-200'>
                    Trang chủ
                  </Link>
                ),
              },
              { title: <span className='text-gray-300'>Liên hệ</span> },
            ]}
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className='container mx-auto px-4 py-8'>
        {/* Get In Touch Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>Liên lạc với chúng tôi</h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Chúng tôi sẵn sàng giúp đỡ và trả lời mọi câu hỏi của bạn.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className='grid md:grid-cols-2 gap-12 mb-16'>
          {/* Contact Information */}
          <div className='space-y-8'>
            <div className='flex items-start space-x-4'>
              <FaMapMarkerAlt className='text-2xl text-[#C49852] mt-1' />
              <div>
                <h3 className='font-semibold text-lg mb-2'>Địa chỉ</h3>
                <p className='text-gray-600'>Khu phố 6, Linh Trung, Thủ Đức</p>
                <p className='text-gray-600'>TP. Hồ Chí Minh, Việt Nam</p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <FaPhone className='text-2xl text-[#C49852] mt-1' />
              <div>
                <h3 className='font-semibold text-lg mb-2'>Điện thoại</h3>
                <p className='text-gray-600'>Mobile: (+84) 123-456-789</p>
                <p className='text-gray-600'>Hotline: 1800-123-456</p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <FaClock className='text-2xl text-[#C49852] mt-1' />
              <div>
                <h3 className='font-semibold text-lg mb-2'>Giờ làm việc</h3>
                <p className='text-gray-600'>Thứ 2 - Thứ 6: 9:00 AM - 10:00 PM</p>
                <p className='text-gray-600'>Thứ 7 - Chủ nhật: 9:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                Họ và tên *
              </label>
              <input
                type='text'
                id='name'
                name='name'
                required
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#C49852] focus:border-[#C49852]'
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                Email *
              </label>
              <input
                type='email'
                id='email'
                name='email'
                required
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#C49852] focus:border-[#C49852]'
              />
            </div>

            <div>
              <label htmlFor='subject' className='block text-sm font-medium text-gray-700 mb-1'>
                Chủ đề (Tùy chọn)
              </label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#C49852] focus:border-[#C49852]'
              />
            </div>

            <div>
              <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>
                Nội dung *
              </label>
              <textarea
                id='message'
                name='message'
                required
                rows='4'
                value={formData.message}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#C49852] focus:border-[#C49852]'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-[#C49852] text-white py-3 px-6 rounded-md hover:bg-[#B38742] transition-colors duration-300'
            >
              Gửi
            </button>
          </form>
        </div>

        {/* Highlight Features */}
        <div className='grid md:grid-cols-4 gap-8 py-12 border-t'>
          <div className='text-center'>
            <FaStar className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>Chất lượng cao</h3>
            <p className='text-gray-600 text-sm'>Được làm từ những vật liệu tốt nhất</p>
          </div>

          <div className='text-center'>
            <FaShieldAlt className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>Bảo hành</h3>
            <p className='text-gray-600 text-sm'>Trên 2 năm</p>
          </div>

          <div className='text-center'>
            <FaShippingFast className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>Miễn phí giao hàng</h3>
            <p className='text-gray-600 text-sm'>Đơn hàng trên 150$</p>
          </div>

          <div className='text-center'>
            <FaHeadset className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>Hỗ trợ 24/7</h3>
            <p className='text-gray-600 text-sm'>Hỗ trợ tận tình</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
