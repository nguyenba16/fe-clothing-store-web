import { useEffect, useState } from 'react'
import * as React from 'react'
import NoAuthApi from '../../apis/noAuthApi'
import ProductCard from '../../components/components/ProductCard'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Pagination,
  Radio,
  RadioGroup,
  Button,
} from '@mui/material'
import SearchBar from '../../components/components/SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpAZ, faFilter } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'antd'
import LoadingComponent from '../../components/components/LoadingComponent'

export default function Products() {
  const [isloading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [productList, setProductList] = useState([])
  const [category, setCategory] = useState('all')
  const [searchValue, setSearchValue] = useState('')
  const [rating, setRating] = useState(0)
  const [sortPrice, setSortPrice] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchRequest, setSearchRequest] = useState({
    productName: '',
    category: 'all',
    rating: 0,
    sortPrice: 'asc',
    currentPage: 1,
    limmitItems: 16,
  })
  const [pagination, setPagination] = useState([])

  const handleSearchProduct = async () => {
    setIsLoading(true)
    try {
      const res = await NoAuthApi.searchProducts(searchRequest)
      setProductList(res.data.data.products)
      setPagination(res.data.data.pagination)
    } catch (error) {
      console.log('Lỗi search ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePage = (event, value) => {
    setCurrentPage(value)
    setSearchRequest((prev) => ({ ...prev, currentPage: value }))
  }

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = () => {
    searchParams.set('name', searchValue)
    navigate({
      pathname: window.location.pathname,
      search: searchParams.toString(),
    })
    setSearchRequest((prev) => ({
      ...prev,
      productName: searchValue,
      currentPage: 1,
    }))
    setCurrentPage(1)
  }

  const handleChangeCategory = (event) => {
    const newCategory = event.target.value
    searchParams.set('category', newCategory)
    navigate({
      pathname: window.location.pathname,
      search: searchParams.toString(),
    })
    setSearchRequest((prev) => ({
      ...prev,
      category: newCategory,
      currentPage: 1,
    }))
    setCurrentPage(1)
  }

  const handleChangeRating = (e, newValue) => {
    setRating(newValue)
  }

  const handleChangeSortPrice = (e) => {
    setSortPrice(e.target.value)
  }

  const applyFilters = () => {
    setSearchRequest((prev) => ({
      ...prev,
      rating: rating,
      sortPrice: sortPrice,
      currentPage: 1,
    }))
    setCurrentPage(1)
    setIsModalOpen(false)
  }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  useEffect(() => {
    console.log('render')
    const categoryParam = searchParams.get('category')
    const productNameParam = searchParams.get('name')
    if (categoryParam) {
      setCategory(categoryParam)
    }
    if (productNameParam) {
      setSearchValue(productNameParam)
    }
    handleSearchProduct()
  }, [searchRequest, searchParams])

  if (isloading) {
    return <LoadingComponent />
  }

  return (
    <div className='p-[1vw] sm:p-[5vw]'>
      <div className='px-10'>
        <h1 className='text-[70px] text-black font-bold text-center '>Bộ sưu tập</h1>
        <p className='text-center'>
          Chào mừng bạn đến với Élégante – nơi tôn vinh vẻ đẹp nữ tính qua từng thiết kế!
        </p>
      </div>

      <div className='mt-10 mb-5 w-full flex justify-between gap-2 px-5 md:px-10 '>
        <button className='border border-black px-3' onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faArrowUpAZ} size='xl' />
        </button>

        <div className='w-[80vw] md:w-[40vw] mx-auto flex justify-between'>
          <div className='w-[70vw] md:w-full'>
            <SearchBar
              handleChangeSearch={handleChangeSearch}
              handleSubmit={handleSubmit}
              searchValue={searchValue}
            />
          </div>
          <div className='flex sm:hidden'>
            <FontAwesomeIcon icon={faFilter} size='2xl' />
          </div>
        </div>

        <div className='w-[10vw] hidden sm:flex'>
          <FormControl fullWidth>
            <InputLabel id='category-select'>Danh mục</InputLabel>
            <Select value={category} label='Danh mục' onChange={handleChangeCategory}>
              <MenuItem value='áo'>Áo nữ</MenuItem>
              <MenuItem value='váy'>Váy</MenuItem>
              <MenuItem value='quần'>Quần nữ</MenuItem>
              <MenuItem value='all'>Tất cả</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* kết quả */}
      <div className='w-full flex flex-col items-center mt-10'>
        {productList.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8'>
            {productList.map((item) => (
              <ProductCard
                key={item.id}
                image={item.productImage[0].url}
                title={item.productName}
                description={item.desc}
                rating={item.rating}
                price={item.price}
                id={item.id}
              />
            ))}
          </div>
        ) : (
          <p className='text-[20px] italic'>Không có món nào phù hợp với yêu cầu của bạn!</p>
        )}
        {pagination.pageTotal > 1 ? (
          <Stack spacing={3} className='mt-10'>
            <Pagination
              count={pagination.pageTotal}
              variant='outlined'
              shape='rounded'
              page={currentPage}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'black',
                  borderColor: '#555',
                },
                '& .Mui-selected': {
                  backgroundColor: '#233000',
                  color: 'white',
                  borderColor: '#000',
                  '&:hover': {
                    backgroundColor: '#233000',
                  },
                },
              }}
              onChange={handleChangePage}
            />
          </Stack>
        ) : null}
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        className='max-w-[20vw] top-[20vh]'
        footer={null}
      >
        <Box
          sx={{
            maxHeight: '80vh',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            borderRadius: '10px',
          }}
          className='bg-white p-2'
        >
          <h2 className='text-[20px] font-bold text-center uppercase text-blue-800 mb-5'>
            Bộ lọc sản phẩm
          </h2>

          <div className='mb-4'>
            <p className='text-[16px]'>Số sao từ:</p>
            <Rating name='rating' value={rating} onChange={handleChangeRating} />
          </div>

          <div className='mb-4'>
            <p className='text-[16px]'>Giá sản phẩm</p>
            <RadioGroup value={sortPrice} onChange={handleChangeSortPrice}>
              <FormControlLabel value='asc' control={<Radio />} label='Tăng dần' />
              <FormControlLabel value='desc' control={<Radio />} label='Giảm dần' />
            </RadioGroup>
          </div>

          <div className='flex justify-center'>
            <Button
              variant='contained'
              onClick={applyFilters}
              sx={{ backgroundColor: '#233000', '&:hover': { backgroundColor: '#1b2200' } }}
            >
              Áp dụng bộ lọc
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
