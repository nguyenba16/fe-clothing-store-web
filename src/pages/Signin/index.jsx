import { TextField, Button } from '@mui/material'
import image from '../../assets/images/signin/image.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import authApi from '../../apis/authApi'
import { toast } from 'react-toastify'
import { routes } from '../../routes'
import useAuth from '../../stores/useAuth'
import { InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

const schema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: yup
    .string()
    // .min(1, 'Mật khẩu phải có ít nhất 1 ký tự')
    .required('Vui lòng nhập mật khẩu'),
})

export default function SignIn() {
  const navigation = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { setUser, setLoading } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const res = await authApi.login(data.email, data.password)
      if (res.data.data) {
        const response = await authApi.getme()
        setUser(response.data.data)
        toast.success('Đăng nhập thành công!')
        navigation(routes.HOME)
      }
    } catch (error) {
      toast.error('Đăng nhập không thành công')
      console.log('Lỗi đăng nhập:', error)
    }
  }

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className='w-[100vw] h-[100vh] flex items-center justify-end px-[15vw]'
    >
      <div className='w-[30vw] bg-[#fff] rounded-3xl px-10 py-10 flex flex-col '>
        <h1 className='text-center font-bold text-[40px] uppercase text-primary'>Đăng nhập</h1>
        <p className='mt-3 text-center'>Hãy nhập đầy đủ thông tin bên dưới!</p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 mt-10'>
          <TextField
            {...register('email')}
            label='Email'
            variant='outlined'
            error={!!errors.email}
            helperText={errors.email?.message}
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
          <Button
            type='submit'
            variant='contained'
            sx={{ backgroundColor: '#A3804A', marginTop: '1.5rem' }}
          >
            Đăng nhập
          </Button>
        </form>
        <Link to={routes.RESETPASSWORD} className='text-right mt-3 mb-5 underline'>
          Quên mật khẩu?
        </Link>
        <p className='text-center mt-3'>
          Bạn chưa có tài khoản?{' '}
          <Link to='/signup' className='font-bold'>
            Đăng kí ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
