import { NavLink, Link } from 'react-router-dom'
import logo from '../../../assets/images/logo.svg'
import { routes } from '../../../routes'
import { useState, useEffect } from 'react'
import useAuth from '../../../stores/useAuth'
import AccountMenu from '../../components/AccountMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import bard from '../../../assets/icons/bard.svg'
import { useNavigate } from 'react-router-dom'
import cartApi from '../../../apis/cartApi'

export default function Header() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { user } = useAuth()
  const [cartItemsCount, setCartItemsCount] = useState(0)

  // Function to fetch cart items count
  const fetchCartItemsCount = async () => {
    if (user) {
      try {
        const cart = await cartApi.getCart()
        if (cart && cart.data && cart.data.items) {
          // Count unique variants (different color/size combinations)
          let uniqueVariantsCount = 0
          Object.values(cart.data.items).forEach((variants) => {
            uniqueVariantsCount += Object.keys(variants).length
          })
          setCartItemsCount(uniqueVariantsCount)
        }
      } catch (error) {
        console.error('Error fetching cart:', error)
        setCartItemsCount(0)
      }
    } else {
      setCartItemsCount(0)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch cart items count when user is logged in
  useEffect(() => {
    fetchCartItemsCount()
  }, [user])

  // Listen for cart changes
  useEffect(() => {
    const handleCartChange = () => {
      fetchCartItemsCount()
    }

    // Add event listener for custom cart change event
    window.addEventListener('cartChanged', handleCartChange)

    return () => {
      window.removeEventListener('cartChanged', handleCartChange)
    }
  }, [user])

  function handleSubmitSearch() {
    navigate(`${routes.PRODUCT}?name=${searchValue}`)
    toggleSearch()
    setSearchValue('')
  }

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <div
      className={`bg-white w-full h-[100px] flex items-center px-[50px] justify-between sticky top-0 z-50
      ${
        scrolled
          ? 'shadow-[0_4px_10px_rgba(0,0,0,0.8)] rounded-b-[20px]'
          : 'shadow-none rounded-b-none'
      }`}
    >
      <Link to={routes.HOME}>
        <img src={logo} alt='Logo Website' className='w-[12vw]' />
      </Link>
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

        <div className='relative group'>
          <NavLink
            to={`${routes.PRODUCT}?category=all`}
            className={({ isActive }) =>
              `relative font-medium text-[20px] group flex items-center ${isActive ? 'half-underline' : ''}`
            }
            style={({ isActive }) => ({
              color: isActive ? '#A3804D' : 'black',
            })}
          >
            Sản phẩm
            <span className='ml-1 text-xs transition-transform duration-200 group-hover:rotate-180'>
              ▼
            </span>
            <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
          </NavLink>
          <div className='absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50'>
            <div className='absolute -top-2 left-5 w-4 h-4 bg-white transform rotate-45'></div>

            <div className='relative bg-white rounded-md py-2 shadow-lg'></div>

            <Link
              to={`${routes.PRODUCT}?category=áo`}
              className='block px-4 py-2 text-sm hover:bg-gray-100'
            >
              Áo
            </Link>
            <Link
              to={`${routes.PRODUCT}?category=quần`}
              className='block px-4 py-2 text-sm hover:bg-gray-100'
            >
              Quần
            </Link>
            <Link
              to={`${routes.PRODUCT}?category=váy`}
              className='block px-4 py-2 text-sm hover:bg-gray-100'
            >
              Váy
            </Link>
          </div>
        </div>
        <NavLink
          to={routes.ABOUTUS}
          className={({ isActive }) =>
            `relative font-medium text-[20px] group ${isActive ? 'half-underline' : ''}`
          }
          style={({ isActive }) => ({
            color: isActive ? '#A3804D' : 'black',
          })}
        >
          Về chúng tôi
          <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
        </NavLink>

        <NavLink
          to={routes.TRYON}
          className={({ isActive }) =>
            `relative flex font-medium text-[20px] group ${isActive ? 'half-underline' : ''}`
          }
          style={({ isActive }) => ({
            color: isActive ? '#A3804D' : 'black',
          })}
        >
          Thử đồ
          <img
            src={bard}
            alt='Bard'
            className='h-[20px] transition-all duration-300 group-hover:filter group-hover:brightness+200 group-hover:scale-110'
          />
          <span className='absolute left-1/4 bottom-0 w-1/2 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
        </NavLink>
      </div>
      <div className='flex items-center justify-center gap-[25px] px-[16px] py-[8px]'>
        {/* search and cart */}
        <div className='flex items-center justify-center gap-[20px]'>
          <div className='relative'>
            <div className='cursor-pointer' onClick={toggleSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' />
            </div>
            {isSearchOpen && (
              <form
                onSubmit={(e) => {
                  handleSubmitSearch()
                }}
                className='absolute right-0 top-[35px] bg-white p-2 rounded shadow-lg w-[250px] transition-all duration-300 z-50'
              >
                <input
                  type='text'
                  placeholder='Tìm kiếm...'
                  className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A3804D]'
                  autoFocus
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
              </form>
            )}
          </div>

          {user && (
            <Link to={routes.CART} className='relative flex items-center justify-center group'>
              <FontAwesomeIcon icon={faCartShopping} color='black' size='xl' />
              {cartItemsCount > 0 && (
                <div className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'>
                  {cartItemsCount}
                </div>
              )}
            </Link>
          )}
        </div>

        <div>|</div>
        <div className='min-w-[21vw] flex justify-end'>
          {user ? (
            <div className='max-md:hidden'>
              <AccountMenu user={user} />
            </div>
          ) : (
            <div className='flex gap-4'>
              <Link to={routes.SIGNIN}>
                <button className='px-[20px] py-[8px] text-[20px] border-[2px] hover:border-black rounded-[10px] text-black hover:bg-white hover:text-black '>
                  Đăng nhập
                </button>
              </Link>
              <Link to={routes.SIGNUP}>
                <button className='px-[30px] py-[8px] text-[20px] border-[2px] hover:border-black rounded-[10px] text-black hover:bg-white hover:text-black'>
                  Đăng ký
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
