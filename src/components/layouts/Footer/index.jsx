import logo from '../../../assets/images/Logo.svg'
import { NavLink, Link } from 'react-router-dom'
import { routes } from '../../../routes'

export default function Footer() {
  const ClickOnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className='bg-primary h-[610px] items-center px-[50px] py-[40px] relative'>
      <div className='flex gap-8 pt-[100px] w-full justify-between '>
        <Link to={routes.HOME} onClick={ClickOnTop}>
          <img src={logo} alt='Logo Website' className='w-[20vw]' />
        </Link>
        <div>
          <div className='text-white text-[25px] mb-3 font-bold'>Liên hệ</div>
          <ul>
            <li className='text-white text-[15px]'>SĐT: 0338963327</li>
            <li className='text-white text-[15px]'>Email: support.elegante@gmail.com</li>
            <li className='text-white text-[15px]'>
              Địa chỉ: Linh Trung, Tp. Thủ Đức, Tp. Hồ Chí Minh
            </li>
          </ul>
        </div>

        <div>
          <div className='text-white text-[25px] mb-3 font-bold'>Về Élégante</div>
          <ul>
            <li>
              <NavLink
                to={routes.ABOUTUS}
                className='text-white text-[15px] hover:text-[#FFF671]'
                onClick={ClickOnTop}
              >
                Giới thiệu
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.COMMIT}
                className='text-white text-[15px] hover:text-[#FFF671]'
                onClick={ClickOnTop}
              >
                Cam kết của Élégante
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <div className='text-white text-[25px] mb-3 font-bold'>Chính sách</div>
          <ul>
            <li>
              <NavLink
                to={routes.OPERATING_POLICY}
                className='text-white text-[15px] hover:text-[#FFF671]'
                onClick={ClickOnTop}
              >
                Chính sách hoạt động
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.POLICIES_REGULATIONS}
                className='text-white text-[15px] hover:text-[#FFF671]'
                onClick={ClickOnTop}
              >
                Chính sách và quy định
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <div className='text-white text-[25px] mb-3 font-bold'>Hướng dẫn</div>
          <ul>
            <li>
              <NavLink
                to={routes.BOOKING_GUIDE}
                className='text-white text-[15px] hover:text-[#FFF671]'
                onClick={ClickOnTop}
              >
                Hướng dẫn hàng
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.CONTACT_INSTRUCTIONS}
                className='text-white text-[15px] hover:text-[#FFF671]'
                onClick={ClickOnTop}
              >
                Hướng dẫn liên hệ
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className='border border-white border-dashed absolute bottom-[100px] w-[93%] left-1/2 -translate-x-1/2'></div>
      <div className='absolute bottom-[45px] text-white text-[15px]'>
        © 2025 - Bản quyền thuộc Élégante
      </div>
    </div>
  )
}
