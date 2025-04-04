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
  const navigation = useNavigate()
  const {
    register,
    handleSubmit,
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
    },
  })

  const onSubmit = async (data) => {
    try {
      const res = await userApi.signUp(
        data.fullName,
        data.email,
        data.phone,
        data.username,
        data.password,
        data.address,
      )
      if (res.data) {
        toast.success('Đăng kí tài khoản thành công!')
        console.log(res.data)
        navigation(routes.HOME)
      }
    } catch (error) {
      toast.error('Không thể đăng kí tài khoản!')
      console.log('Error: ', error)
    }
  }

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className='w-[100vw] h-[120vh] flex justify-center px-[15vw] py-10'
    >
      <div className='w-[45vw] bg-[#fff] rounded-3xl p-10 py-10 flex flex-col h-full'>
        <h1 className='text-center font-bold text-[40px] uppercase text-primary'>
          Đăng kí tài khoản
        </h1>
        <p className='mt-3 text-center'>Hãy nhập đầy đủ thông tin bên dưới!</p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 mt-10'>
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
            type='password'
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
          />
          <Button
            type='submit'
            variant='contained'
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
