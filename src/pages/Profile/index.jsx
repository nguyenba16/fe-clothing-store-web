import useAuth from '../../stores/useAuth'
import { TextField, Button } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import userApi from '../../apis/userApi'
import { toast } from 'react-toastify'

const schema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  name: yup.string().required('Vui lòng nhập trường này'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  nameAccount: yup.string().required('Vui lòng nhập tên tài khoản'),
})

export default function Profile() {
  const { user, setUser } = useAuth()
  const [isHoverAva, setIsHoverAva] = useState(false)
  const [isHoverImg, setIsHoverImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user.email,
      name: user.name,
      phone: user.phoneNumber,
      address: user.address,
      nameAccount: user.nameAccount,
    },
  })
  const [imageFile, setImageFile] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [image, setImage] = useState(user.imageBody?.url || null)
  const [avatar, setAvatar] = useState(user.avatar?.url)
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChangAvatar = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const res = await userApi.updateProfile(
        data.name,
        data.phone,
        data.nameAccount,
        data.address,
        imageFile,
        avatarFile,
        user,
      )
      if (res.data) {
        setUser(res.data)
        setLoading(false)
        toast.success('Chỉnh sửa tài khoản thành công!')
        console.log(res.data)
      }
    } catch (error) {
      toast.error('Không thể chỉnh sửa tài khoản!')
      console.log('Error: ', error)
    }
  }

  return (
    <div className='px-[200px] flex flex-col mb-10 mt-10 justify-center'>
      <h1 className='text-[50px] font-bold text-primary'>Tài khoản của tôi</h1>
      <div className='flex w-full mt-20 justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <div
            className='w-[100px] h-[100px] relative '
            onMouseOver={() => {
              setIsHoverAva(true)
            }}
            onMouseOut={() => {
              setIsHoverAva(false)
            }}
          >
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={avatar}
              alt='avatar'
              className='border-2 rounded-full border-primary'
            />
            {isHoverAva ? (
              <Button
                variant='contained'
                component='label'
                sx={{
                  width: '100%',
                  position: 'absolute',
                  top: '0px',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '100%',
                }}
              >
                Đổi ảnh
                <input type='file' accept='image/*' hidden onChange={handleChangAvatar} />
              </Button>
            ) : null}
          </div>
          <div className='flex-col gap-5 flex text-sm'>
            <p className='font-bold text-[25px] text-black'>{user?.name}</p>
            <p className='text-[20px] italic font-light text-black'>{user?.email}</p>
          </div>
        </div>
        <Button
          type='submit'
          form='update-form'
          color='secondary'
          loading={loading}
          loadingPosition='start'
          startIcon={<SaveIcon />}
          variant='contained'
          sx={{ backgroundColor: 'green', height: '50px', width: '150px' }}
        >
          Lưu
        </Button>
      </div>
      <div className='w-full mt-10 border border-[#acacac] border-dashed'></div>
      <div className='grid grid-cols-[2fr_1fr] gap-x-10'>
        <form
          id='update-form'
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-8 mt-10 '
        >
          <TextField
            {...register('name')}
            label='Họ và tên'
            variant='outlined'
            error={!!errors.name}
            helperText={errors.name?.message}
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
            {...register('email')}
            label='Email'
            variant='outlined'
            disabled
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
            {...register('nameAccount')}
            label='Tên tài khoản'
            variant='outlined'
            error={!!errors.nameAccount}
            helperText={errors.nameAccount?.message}
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
        </form>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
          <div className='flex flex-col justify-center gap-4 items-center mt-10'>
            <div
              onMouseOver={() => {
                setIsHoverImg(true)
              }}
              onMouseOut={() => {
                setIsHoverImg(false)
              }}
              className='w-full relative h-[320px] flex items-center justify-center bg-[#dddddd] rounded-xl border-[#acacac] border-2'
            >
              {image ? (
                <img
                  src={image}
                  alt='Ảnh để thử đồ'
                  className='rounded-xl w-full h-full object-cover'
                />
              ) : (
                <p className='text-white text-center'>Bạn chưa có ảnh</p>
              )}
              {isHoverImg ? (
                <Button
                  variant='contained'
                  component='label'
                  sx={{
                    width: '100%',
                    position: 'absolute',
                    top: '0px',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  }}
                >
                  Chọn ảnh
                  <input type='file' accept='image/*' hidden onChange={handleImageChange} />
                </Button>
              ) : null}
            </div>
            <p className='text-[20px] font-bold'>Ảnh Body của tôi</p>
          </div>
        </div>
      </div>
    </div>
  )
}
