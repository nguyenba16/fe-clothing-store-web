import { TextField, Button } from '@mui/material'
import image from '../../assets/images/signin/image.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import authApi from '../../apis/authApi'
import { toast } from 'react-toastify'
import userApi from '../../apis/userApi'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import NoAuthApi from '../../apis/noAuthApi'
import { useEffect, useState } from 'react'
import { InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const schema = yup.object().shape({
  fullName: yup.string().required('Vui lòng nhập họ và tên'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
  username: yup.string().required('Vui lòng nhập tên tài khoản'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
})

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isSendMail, setIsSendMail] = useState(true)
  const navigation = useNavigate()
  const [emailUser, setEmailUser] = useState()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      address: '',
      phone: '',
      username: '',
      email: '',
      password: '',
      codeVerify: '',
    },
  })
  const handSendVerifyCode = async () => {
    if (!emailUser || emailUser.trim() === '') {
      toast.error('Vui lòng nhập email!')
      return
    }
    try {
      const res = await NoAuthApi.sendVerifyCode(emailUser)
      if (res.data == true) {
        toast.success('Đã gửi mã qua email của bạn!')
        setIsSendMail(false)
        setTimer(60)
      } else {
        toast.error('Không thể gửi mã qua email của bạn!')
      }
    } catch (error) {
      toast.error('Không thể gửi mã qua email của bạn!')
      console.log('Có lỗi khi gửi code qua email: ', error)
    }
  }

  const onSubmit = async (data) => {
    try {
      const res = await userApi.signUp(
        data.fullName,
        data.email,
        data.phone,
        data.username,
        data.password,
        data.address,
        data.codeVerify,
      )
      if (res.data) {
        toast.success('Đăng kí tài khoản thành công!')
        console.log(res.data)
        navigation(routes.HOME)
      }
    } catch (error) {
      toast.error('Không thể đăng kí tài khoản, email đã tồn tại hoặc code sai!')
      console.log('Error: ', error)
    }
  }
  const email = watch('email')
  const fullName = watch('fullName')
  const address = watch('address')
  const phone = watch('phone')
  const username = watch('username')
  const password = watch('password')
  const codeVerify = watch('codeVerify')
  const isSendCode = fullName && address && phone && username && email && password
  const isAllFilled = fullName && address && phone && username && email && password && codeVerify

  useEffect(() => {
    let interval
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else {
      setIsSendMail(true)
    }
    return () => clearInterval(interval)
  }, [timer])

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className='w-full flex justify-center px-[15vw] py-10 object-cover'
    >
      <div className='w-[45vw] bg-[#fff] rounded-3xl p-10 py-10 flex flex-col h-full'>
        <h1 className='text-center font-bold text-[40px] uppercase text-primary'>
          Đăng kí tài khoản
        </h1>
        <p className='mt-1 text-center'>Hãy nhập đầy đủ thông tin bên dưới!</p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 mt-10'>
          <TextField
            {...register('fullName')}
            label='Họ và tên'
            variant='outlined'
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            sx={{
              height: '56px',
              '& .MuiInputBase-root': {
                height: '100%',
              },
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: '-20px',
              },
            }}
          />
          <TextField
            {...register('address')}
            label='Địa chỉ'
            variant='outlined'
            error={!!errors.address}
            helperText={errors.address?.message}
            sx={{
              height: '56px',
              '& .MuiInputBase-root': {
                height: '100%',
              },
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: '-20px',
              },
            }}
          />
          <TextField
            {...register('phone')}
            label='Số điện thoại'
            variant='outlined'
            error={!!errors.phone}
            helperText={errors.phone?.message}
            sx={{
              height: '56px',
              '& .MuiInputBase-root': {
                height: '100%',
              },
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: '-20px',
              },
            }}
          />
          <TextField
            {...register('username')}
            label='Tên tài khoản'
            variant='outlined'
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{
              height: '56px',
              '& .MuiInputBase-root': {
                height: '100%',
              },
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: '-20px',
              },
            }}
          />
          <TextField
            {...register('email')}
            label='Email'
            variant='outlined'
            error={!!errors.email}
            helperText={errors.email?.message}
            value={emailUser}
            onChange={(e) => setEmailUser(e.target.value)}
            sx={{
              height: '56px',
              '& .MuiInputBase-root': {
                height: '100%',
              },
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: '-20px',
              },
            }}
          />
          <TextField
            {...register('password')}
            label='Mật khẩu'
            type={showPassword ? 'text' : 'password'}
            variant='outlined'
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              height: '56px',
              '& .MuiInputBase-root': {
                height: '100%',
              },
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: '-20px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div>
            <p className='mb-1'>Mã xác thực</p>
            <div className='flex gap-5 items-center'>
              <TextField
                {...register('codeVerify')}
                type='codeVerify'
                variant='outlined'
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  height: '40px',
                  '& .MuiInputBase-root': {
                    height: '100%',
                  },
                }}
              />
              <Button
                className='flex justify-center items-center gap-3 border-1 border-blue-500'
                onClick={() => handSendVerifyCode()}
                disabled={!isSendCode}
              >
                <FontAwesomeIcon icon={faRotateRight} size='xl' />
                {isSendMail ? 'Gửi mã' : `Gửi lại (${timer}s)`}
              </Button>
            </div>
          </div>

          <Button
            type='submit'
            variant='contained'
            disabled={!isAllFilled}
            sx={{ backgroundColor: '#A3804A', marginTop: '1.5rem', fontSize: '18px' }}
          >
            Đăng kí tài khoản
          </Button>
        </form>
        <p className='text-right mt-3'>
          Bạn đã có tài khoản?{' '}
          <Link to='/signin' className='font-bold'>
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
