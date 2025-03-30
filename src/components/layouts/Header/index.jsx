import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import cartlogo from '../../../assets/Icon/cart.svg'
import searchlogo from '../../../assets/Icon/search.svg'
import logo from '../../../assets/Logo Website.png'
import { routes } from '../../../routes'
import userlogo from '../../../assets/Icon/user.svg'
export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const handleLogin = () => {
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
  }
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }
  
  return (
    <div
      className={`bg-white w-full h-[100px] flex items-center px-[100px] justify-between sticky top-0 z-50
        ${
          scrolled
            ? 'shadow-[0_4px_10px_rgba(255,255,255,0.8)] rounded-b-[20px]'
            : 'shadow-none rounded-b-none'
        }`}
    >
      {/* logo */}
      <Link to={routes.HOME}>
        <img src={logo} alt='Logo Website' className='h-[25px]' />
      </Link>

      {/* tab */}
        <div className='flex items-center justify-center gap-[50px] px-[16px] py-[8px]'>
          <NavLink
            to={routes.HOME}
            className={({ isActive }) =>
          `relative font-medium text-[20px] group ${isActive ? 'half-underline' : ''}`
            }
            style={({ isActive }) => ({
          color: isActive ? '#A3804D' : 'black',
            })}
          >
            Trang chủ
            <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
          </NavLink>

          <div className="relative group">
            <NavLink
              to={routes.PRODUCTCATEGORY}
              className={({ isActive }) =>
            `relative font-medium text-[20px] group flex items-center ${isActive ? 'half-underline' : ''}`
              }
              style={({ isActive }) => ({
            color: isActive ? '#FFF671' : 'black',
              })}
            >
              Sản phẩm
              <span className='ml-1 text-xs transition-transform duration-200 group-hover:rotate-180'>▼</span>
              <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
            </NavLink>

            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="absolute -top-2 left-5 w-4 h-4 bg-white transform rotate-45"></div>

                <div className="relative bg-white rounded-md py-2 shadow-lg"></div>

                <Link to={`${routes.PRODUCTCATEGORY}/category1`} className="block px-4 py-2 text-sm hover:bg-gray-100">Áo</Link>
                <Link to={`${routes.PRODUCTCATEGORY}/category2`} className="block px-4 py-2 text-sm hover:bg-gray-100">Quần</Link>
                <Link to={`${routes.PRODUCTCATEGORY}/category3`} className="block px-4 py-2 text-sm hover:bg-gray-100">Váy</Link>
              </div>
            </div>
          <NavLink
            to={routes.NEWPRODUCTS}
            className={({ isActive }) =>
          `relative font-medium text-[20px] group ${isActive ? 'half-underline' : ''}`
            }
            style={({ isActive }) => ({
          color: isActive ? '#FFF671' : 'black',
            })}
          >
            Hàng mới
            <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
          </NavLink>

          <NavLink
            to={routes.TRYON}
            className={({ isActive }) =>
          `relative font-medium text-[20px] group ${isActive ? 'half-underline' : ''}`
            }
            style={({ isActive }) => ({
          color: isActive ? '#FFF671' : 'black',
            })}
          >
            Thử đồ
            <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
          </NavLink>
        </div>
        
        <div className='flex items-center justify-center gap-[25px] px-[16px] py-[8px]'>

          {/* search and cart */}
          <div className='flex items-center justify-center gap-[20px]'>

            <div className="relative">
              <div 
                className="cursor-pointer"
                onClick={toggleSearch}
              >
                <img 
                  src={searchlogo}
                  alt='Search'
                  className='h-[25px] transition-all duration-300 hover:filter hover:brightness-50 hover:scale-110'
                />
              </div>
              {isSearchOpen && (
                <div className="absolute right-0 top-[35px] bg-white p-2 rounded shadow-lg w-[250px] transition-all duration-300 z-50">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A3804D]"
                    autoFocus
                  />
                </div>
              )}
            </div>
          
            <Link to={routes.CART} className='relative flex items-center justify-center group'>
              <img 
                src={cartlogo}
                alt='Cart'
                className='h-[25px] transition-all duration-300 group-hover:filter group-hover:brightness-50 group-hover:scale-110'
              />
            </Link>
          </div>

          <div>|</div>

          {/* signin/signup */}
          <div className='flex items-center justify-center gap-[10px]'>
          {isLoggedIn && (
                <img 
                  src={userlogo}
                  alt='User'
                  className='h-[25px] transition-all duration-300 hover:filter hover:brightness-50 hover:scale-110'
                />
              )}
            <div className='flex items-center justify-center gap-[10px]'>
              {!isLoggedIn ? (
                <>
                  <Link to={routes.SIGNIN} className='text-[20px] font-medium text-[#A3804D] transition-all duration-300 hover:scale-110'>
                    Đăng nhập
                  </Link>
                  <Link to={routes.SIGNUP} className='text-[20px] font-medium text-[#A3804D] transition-all duration-300 hover:scale-110'>
                    Đăng ký
                  </Link>
                </>
              ) : (
                <Link to="/profile" className='text-[20px] font-medium text-[#A3804D] transition-all duration-300 hover:scale-110'>
                  Tài khoản
                </Link>
              )}
              </div>
          </div>
        </div>
    </div>
  )
}
