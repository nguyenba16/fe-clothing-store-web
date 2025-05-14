import { Link, NavLink } from 'react-router-dom'
import logo from '../../../assets/images/Logo.svg'
import { routes } from '../../../routes'

export default function Footer() {
  const ClickOnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className='bg-primary items-center px-[15px] sm:px-[30px] md:px-[50px] py-[40px] relative min-h-[400px] md:h-[610px] w-full'>
      <div className='flex flex-col md:flex-row gap-8 pt-[50px] md:pt-[100px] w-full justify-between'>
        <div className='flex justify-center md:justify-start'>
          <Link to={routes.HOME} onClick={ClickOnTop}>
            <img
              src={logo}
              alt='Logo Website'
              className='w-[50vw] md:w-[20vw] bg-white rounded-lg px-5'
            />
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto'>
          <div>
            <div className='text-white text-[20px] md:text-[25px] mb-3 font-bold'>Liên hệ</div>
            <ul>
              <li className='text-white text-[14px] md:text-[15px]'>SĐT: 0338963327</li>
              <li className='text-white text-[14px] md:text-[15px]'>
                Email: support.elegante@gmail.com
              </li>
              <li className='text-white text-[14px] md:text-[15px]'>
                Địa chỉ: Linh Trung, Tp. Thủ Đức, Tp. Hồ Chí Minh
              </li>
            </ul>
          </div>

          <div>
            <div className='text-white text-[20px] md:text-[25px] mb-3 font-bold'>Về Élégante</div>
            <ul>
              <li>
                <NavLink
                  to={routes.ABOUTUS}
                  className='text-white text-[14px] md:text-[15px] hover:text-[#FFF671]'
                  onClick={ClickOnTop}
                >
                  Giới thiệu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={routes.OURCOMMIT}
                  className='text-white text-[14px] md:text-[15px] hover:text-[#FFF671]'
                  onClick={ClickOnTop}
                >
                  Cam kết của Élégante
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <div className='text-white text-[20px] md:text-[25px] mb-3 font-bold'>Chính sách</div>
            <ul>
              <li>
                <NavLink
                  to={routes.OPERATINGPOLICY}
                  className='text-white text-[14px] md:text-[15px] hover:text-[#FFF671]'
                  onClick={ClickOnTop}
                >
                  Chính sách hoạt động
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={routes.POLICIESANDREGULATION}
                  className='text-white text-[14px] md:text-[15px] hover:text-[#FFF671]'
                  onClick={ClickOnTop}
                >
                  Chính sách và quy định
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <div className='text-white text-[20px] md:text-[25px] mb-3 font-bold'>Hướng dẫn</div>
            <ul>
              <li>
                <NavLink
                  to={routes.ORDERINGGUIDE}
                  className='text-white text-[14px] md:text-[15px] hover:text-[#FFF671]'
                  onClick={ClickOnTop}
                >
                  Hướng dẫn đặt hàng
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={routes.CONTACTGUIDE}
                  className='text-white text-[14px] md:text-[15px] hover:text-[#FFF671]'
                  onClick={ClickOnTop}
                >
                  Hướng dẫn liên hệ
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Thêm khoảng trống phía dưới nội dung chính */}
      <div className='pb-[120px] sm:pb-[150px]'></div>

      {/* Footer bottom */}
      <div className='border border-white border-dashed w-full'></div>
      <p className='sm:bottom-[45px] text-white text-[14px] md:text-[15px] w-full text-left mt-10'>
        © 2025 - Bản quyền thuộc Élégante
      </p>
    </div>
  )
}
