import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import authApi from '../../apis/authApi'
import useAuth from '../../stores/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStore,
  faUser,
  faClockRotateLeft,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
export default function AccountMenu({ user }) {
  const { logout, setUser } = useAuth()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = async () => {
    try {
      const res = await authApi.logout()
      logout()
      setUser('')
      if (res.data) {
        toast.success('Đăng xuất thành công!')
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi, thử lại sau!')
    }
    navigate(routes.HOME)
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Box>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='large'
            sx={{ ml: 2, p: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <div className='flex gap-3 justify-start items-center'>
              <div className=' flex-col gap-2 text-sm justify-start'>
                <p className='font-bold text-[20px] text-right text-black'>{user?.name}</p>
                <p className='text-[15px] italic font-light text-black'>{user?.email}</p>
              </div>
              <Avatar
                sx={{ width: 50, height: 50 }}
                src={user?.avatar?.url}
                alt='avatar'
                className='border-2 rounded-full border-black'
              />
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        disableScrollLock
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to={routes.PROFILE}>
          <MenuItem onClick={handleClose} sx={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <FontAwesomeIcon icon={faUser} className='mr-2' size='lg' />
            Tài khoản của tôi
          </MenuItem>
        </Link>
        <Link to={routes.ORDER_TRACKING}>
          <MenuItem onClick={handleClose} sx={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <FontAwesomeIcon icon={faClockRotateLeft} className='mr-2' size='lg' />
            Lịch sử mua hàng
          </MenuItem>
        </Link>
        {user.role == 'ADMIN' && (
          <Link to={routes.RESTAURANT_DASHBOARD}>
            <MenuItem onClick={handleClose} sx={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <FontAwesomeIcon icon={faStore} className='mr-2' size='lg' />
              Trang quản lý của Admin
            </MenuItem>
          </Link>
        )}

        <Divider sx={{ marginTop: '5px', marginBottom: '5px' }} />

        <MenuItem onClick={() => handleLogout()}>
          <FontAwesomeIcon icon={faRightFromBracket} className='mr-2' size='lg' />
          Đăng xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
