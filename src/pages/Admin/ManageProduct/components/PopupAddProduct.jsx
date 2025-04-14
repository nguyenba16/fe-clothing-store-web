import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material'

import AdminApi from '../../../../apis/adminApi'
import { toast } from 'react-toastify'
import LoadingComponent from '../../../../components/components/LoadingComponent'
const colorClasses = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  indigo: 'bg-indigo-500',
  teal: 'bg-teal-500',
  orange: 'bg-orange-500',
  gray: 'bg-gray-500',
  slate: 'bg-slate-500',
  zinc: 'bg-zinc-500',
  neutral: 'bg-neutral-500',
  stone: 'bg-stone-500',
  emerald: 'bg-emerald-500',
  lime: 'bg-lime-500',
  cyan: 'bg-cyan-500',
  sky: 'bg-sky-500',
  violet: 'bg-violet-500',
  fuchsia: 'bg-fuchsia-500',
  rose: 'bg-rose-500',
  amber: 'bg-amber-500',
  black: 'bg-black',
  white: 'bg-white',
}

const sizesClasses = ['S', 'M', 'L', 'XL', 'XXL']

export default function PopupAddProduct({ isOpen, onClose, fetchProducts }) {
  const [isloading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [imagesUpload, setImagesUpload] = useState([])
  const [images, setImages] = useState([])
  const [category, setCategory] = useState('67eabfb752e95e072c0a14cc')
  const [stock, setStock] = useState()
  const [price, setPrice] = useState()
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setCategory('')
    setProductName('')
    setDescription('')
    setImagesUpload([])
    setImages([])
    setStock()
    setPrice()
    setColors([])
    setSizes([])
    setIsModalOpen(false)
    onClose()
  }

  const handleToggleColor = (color) => {
    setColors((prev) => {
      if (prev.includes(color)) {
        const index = prev.indexOf(color)
        setImagesUpload((prev) => prev.filter((c) => c !== imagesUpload[index]))
        setImages((prev) => prev.filter((c) => c !== images[index]))
        return prev.filter((c) => c !== color)
      }
      return [...prev, color]
    })
  }

  const handleToggleSize = (size) => {
    setSizes((prev) => (prev.includes(size) ? prev.filter((c) => c !== size) : [...prev, size]))
  }

  const handleUploadImages = (e, index, fetchProducts) => {
    const file = e.target.files[0]
    if (!file) return

    const newUrl = URL.createObjectURL(file)

    setImages((prev) => {
      const updated = [...prev]
      updated[index] = newUrl // cập nhật đúng vị trí
      return updated
    })

    setImagesUpload((prev) => {
      const updated = [...prev]
      updated[index] = file
      return updated
    })
  }

  const handleAddProduct = async () => {
    setIsLoading(true)
    if (
      colors.length != imagesUpload.length ||
      category == '' ||
      price == 0 ||
      description == '' ||
      stock == 0 ||
      sizes.length == 0 ||
      productName == '' ||
      colors.length == 0
    ) {
      console.log('Số ảnh và số màu không khớp hoặc điền thiếu trường!')
      toast.error('Không thể thêm sản phẩm!')
      return null
    }
    try {
      const product = new FormData()
      product.append('categroryID', category)
      product.append('price', price)
      product.append('desc', description)
      product.append('stock', stock)
      product.append('rating', 0)
      product.append('productName', productName)
      for (let i = 0; i < sizes.length; i++) {
        product.append('sizes', sizes[i])
      }
      for (let i = 0; i < colors.length; i++) {
        product.append('colors', colors[i])
        product.append('productImage', imagesUpload[i])
      }
      const res = await AdminApi.addAProduct(product)
      fetchProducts()
      toast.success('Thêm thành công sản phẩm mới!')
      handleClose()
      setIsLoading(false)
      return res
    } catch (error) {
      setIsLoading(false)
      toast.error('Không thể thêm sản phẩm!')
      console.error('Có lỗi xảy ra trong việc thêm sản phẩm: ', error)
    }
  }

  if (isloading == true) {
    return <LoadingComponent />
  }

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box
        sx={{
          maxHeight: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari
          },
          borderRadius: '10px',
        }}
        className='bg-white p-6 rounded-md shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[35vw]'
      >
        <h2 className='text-3xl font-bold text-center uppercase text-blue-800 mb-5'>
          Thêm mới sản phẩm
        </h2>
        <div className='space-y-2 flex flex-col gap-1'>
          <strong>Tên sản phẩm:</strong>
          <TextareaAutosize
            aria-label='minimum height'
            minRows={1}
            placeholder='Tên sản phẩm...'
            style={{ width: '100%', borderWidth: '2px', padding: '5px' }}
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value)
            }}
          />
          <strong>Mô tả sản phẩm:</strong>
          <TextareaAutosize
            aria-label='minimum height'
            minRows={1}
            placeholder='Mô tả sản phẩm...'
            style={{ width: '100%', borderWidth: '2px', padding: '5px' }}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
          <div className='flex items-center gap-5'>
            <strong>Danh mục sản phẩm:</strong>
            <FormControl>
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
                sx={{ width: '100%', fontSize: '15px' }}
              >
                <MenuItem value={'67eabfb752e95e072c0a14cc'}>Áo</MenuItem>
                <MenuItem value={'67eba6c85ad5c520566e7be1'}>Quần</MenuItem>
                <MenuItem value={'67eabff052e95e072c0a14cd'}>Váy</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='flex items-center gap-5'>
            <strong>Chọn kích cỡ:</strong>
            <div className='flex gap-2'>
              {sizesClasses.map((size) => {
                return (
                  <button
                    key={size}
                    onClick={() => handleToggleSize(size)}
                    className={`w-10 h-10 rounded-full font-medium text-white bg-blue-700 border-2 transition-all duration-150
                      ${sizes.includes(size) ? 'ring-2 ring-black' : ''}`}
                    title={size}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>
          <div className=''>
            <strong>Chọn màu: </strong>
            <div className='grid grid-cols-12 gap-2 max-w-[30vw] mt-2'>
              {Object.keys(colorClasses).map((color) => (
                <button
                  key={color}
                  onClick={() => handleToggleColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-150
                ${colors.includes(color) ? 'ring-2 ring-black' : ''}
                ${colorClasses[color] || 'bg-gray-300'}`}
                  title={color}
                ></button>
              ))}
            </div>
          </div>
          <div className='flex gap-5'>
            <TextField
              id='outlined-basic'
              label='Số lượng tồn'
              variant='outlined'
              value={stock}
              onChange={(e) => {
                setStock(e.target.value)
              }}
            />
            <TextField
              id='outlined-basic'
              label='Giá sản phẩm'
              variant='outlined'
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
              }}
            />
          </div>
          <div className='flex justify-center'>
            <div className={`grid grid-cols-2 justify-center gap-2`}>
              {colors.map((color, index) => {
                return (
                  <div>
                    <div className='w-[12vw] h-[15vw] relative'>
                      <img
                        src={images[index]}
                        className='w-full h-full border-1 rounded-[15px] border-[#acacac] object-cover'
                      />
                      <Button
                        variant='contained'
                        component='label'
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          top: '0px',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          borderRadius: '15px',
                        }}
                      >
                        Upload ảnh
                        <input
                          type='file'
                          accept='image/*'
                          hidden
                          onChange={(e) => handleUploadImages(e, index)}
                        />
                      </Button>
                    </div>
                    <p className='text-center font-bold'>{color}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='w-[30vw] flex justify-center items-center gap-5 '>
          <button
            onClick={handleAddProduct}
            className='mt-4 px-4 py-2 bg-green-500 text-white rounded-md w-[10vw]'
          >
            Lưu
          </button>
          <button
            onClick={handleClose}
            className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-[10vw]'
          >
            Đóng
          </button>
        </div>
      </Box>
    </Modal>
  )
}
