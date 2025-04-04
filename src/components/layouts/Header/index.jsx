import { NavLink, Link } from 'react-router-dom'
import logo from "../../../assets/images/logo.svg"
import { routes } from '../../../routes'
import { useState, useEffect } from 'react'
import useAuth from '../../../stores/useAuth'
import AccountMenu from '../../components/AccountMenu'
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()
  
  console.log(user)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`bg-white w-full h-[100px]  flex items-center px-[100px] justify-between sticky top-0 z-50
        ${
          scrolled
            ? 'shadow-[0_4px_10px_rgba(255,255,255,0.8)] rounded-b-[20px]'
            : 'shadow-none rounded-b-none'
        }`}
    >
      {/* logo */}
      <Link to={routes.HOME}>
        <img src={logo} alt='Logo Website' className='h-[60px]' />
      </Link>
      <div className='gap-5 w-[40vw] justify-between flex'>
        <NavLink
          to={routes.HOME}
          className={({ isActive }) =>
            `relative font-medium text-[20px] group ${isActive ? 'half-underline' : ''}`
          }
          style={({ isActive }) => ({
            color: isActive ? '#FFF671' : '#fff',
          })}
        >
          Trang chủ
          <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
        </NavLink>

        <NavLink
          to={routes.PRODUCTCATEGORY}
          className={({ isActive }) =>
            `relative font-medium text-[20px] group ${isActive ? 'half-underline' : ''}`
          }
          style={({ isActive }) => ({
            color: isActive ? '#FFF671' : '#fff',
          })}
        >
          Sản phẩm
          <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
        </NavLink>

        <NavLink
          to={routes.NEWPRODUCTS}
          className={({ isActive }) =>
            `relative font-medium text-[20px] group ${isActive ? 'half-underline' : ''}`
          }
          style={({ isActive }) => ({
            color: isActive ? '#FFF671' : '#fff',
          })}
        >
          Hàng mới
          <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
        </NavLink>

        <NavLink
          to={routes.TRYON}
          className={({ isActive }) =>
            `relative font-medium text-[20px] group ${isActive ? 'half-underline' : ''}`
          }
          style={({ isActive }) => ({
            color: isActive ? '#FFF671' : '#fff',
          })}
        >
          Thử đồ
          <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
        </NavLink>
      </div>

      <div className='min-w-[21vw] flex justify-end'>
        {user ? (
          <div className='max-md:hidden'>
            <AccountMenu user={user}/>
          </div>
        ) : (
          <div className='flex gap-4'>
            <Link to={routes.SIGNIN}>
              <button className='px-[20px] py-[8px] text-[20px] border-[2px] hover:border-secondary rounded-[10px] text-white hover:bg-white hover:text-black '>
                Đăng nhập
              </button>
            </Link>
            <Link to={routes.SIGNUP}>
              <button className='px-[30px] py-[8px] text-[20px] border-[2px] hover:border-secondary rounded-[10px] text-white hover:bg-white hover:text-black'>
                Đăng ký
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
