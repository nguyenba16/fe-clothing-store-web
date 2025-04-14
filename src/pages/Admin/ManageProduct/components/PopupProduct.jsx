// PopupProduct.jsx
import React, { useEffect, useState } from 'react'
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function PopupProduct({ isOpen, product, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen)

  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setIsModalOpen(false)
    onClose() // callback để đóng từ parent
  }

  const handleDelete = () => {}
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
          Chi tiết sản phẩm
        </h2>
        <div className='space-y-2 flex flex-col gap-1'>
          <strong>Tên sản phẩm:</strong>
          <TextareaAutosize
            aria-label='minimum height'
            minRows={1}
            placeholder='Tên sản phẩm...'
            style={{ width: '100%', borderWidth: '2px', padding: '5px' }}
            defaultValue={product?.productName}
          />
          <strong>Mô tả sản phẩm:</strong>
          <TextareaAutosize
            aria-label='minimum height'
            minRows={1}
            placeholder='Mô tả sản phẩm...'
            style={{ width: '100%', borderWidth: '2px', padding: '5px' }}
            defaultValue={product?.desc}
          />
          <div className='flex items-center gap-5'>
            <strong>Danh mục sản phẩm:</strong>
            <FormControl>
              <Select
                value={product.categrory.id}
                onChange={() => {}}
                sx={{ width: '100%', fontSize: '15px' }}
              >
                <MenuItem value={'67eabfb752e95e072c0a14cc'}>Áo</MenuItem>
                <MenuItem value={'67eba6c85ad5c520566e7be1'}>Quần</MenuItem>
                <MenuItem value={'67eabff052e95e072c0a14cd'}>Váy</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='flex items-center gap-5'>
            <strong>Kích cỡ:</strong>
            <div className='flex gap-2'>
              {product.sizes.map((item) => {
                return <Chip label={item} variant='outlined' onDelete={handleDelete} />
              })}
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <strong>Màu sắc:</strong>
            <div className='flex gap-2'>
              {product.colors.map((item) => {
                return (
                  <Chip
                    label={item}
                    variant='outlined'
                    onDelete={handleDelete}
                    sx={{
                      backgroundColor: item,
                    }}
                  />
                )
              })}
            </div>
          </div>
          <div className='flex gap-1'>
            <p className='font-bold'>Đánh giá: {product.rating}</p>
            <FontAwesomeIcon icon={faStar} color='#ffdd46' size='lg' />
          </div>
          <div className='flex gap-5'>
            <TextField
              id='outlined-basic'
              label='Số lượng tồn'
              variant='outlined'
              value={product.stock}
            />
            <TextField
              id='outlined-basic'
              label='Giá sản phẩm'
              variant='outlined'
              value={product.price}
            />
          </div>
          <div className='flex justify-center'>
            <div className='grid grid-cols-3 justify-center gap-2'>
              {product.productImage.map((item) => {
                return (
                  <div className='max-w-[25vw]'>
                    <img
                      src={item.url}
                      alt='Ảnh sản phẩm'
                      className='w-full h-[25vh] object-cover rounded-3xl'
                    />
                    <p className='text-[15px] font-light text-center'>Màu: {item.color}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center'>
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
