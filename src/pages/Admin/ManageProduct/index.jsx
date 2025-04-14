import { TablePagination } from '@mui/material'
import { useEffect, useState } from 'react'
import NoAuthApi from '../../../apis/noAuthApi'
import RowProduct from './components/RowProduct'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PopupAddProduct from './components/PopupAddProduct'
import LoadingComponent from '../../../components/components/LoadingComponent'

export default function ManageProduct() {
  const [isloading, setIsLoading] = useState(false)
  const [productList, setProductList] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('')
  const [skipPage, setSkipPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleChangeCategoryFilter = (event) => setCategoryFilter(event.target.value)
  const handleChangePage = (_, newPage) => setSkipPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setSkipPage(0)
  }
  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const res = await NoAuthApi.getProductByCategory(categoryFilter)
      setProductList(res.data)
      setIsLoading(false)
      return res
    } catch (error) {
      setIsLoading(false)
      console.log('Có lỗi xảy ra', error)
    }
  }
  const handleOpenModal = () => setIsModalOpen(true)
  const onCloseModal = () => setIsModalOpen(false)

  useEffect(() => {
    fetchProducts()
  }, [categoryFilter])

  if (isloading) {
    return <LoadingComponent />
  }
  return (
    <div className='w-full flex flex-col items-center gap-5 bg-[#F5F6FA] py-5'>
      <h1 className='text-[35px] uppercase font-bold text-center'>Quản lý sản phẩm</h1>
      <div className='bg-white shadow-md rounded-[10px] px-10 py-5 w-[75vw] mb-10 border-2 border-[#D5D5D5]'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex gap-5'>
            <div className='border-2 flex items-center rounded-md w-[20vw] px-3 py-1 border-[#212B36] border-opacity-60'>
              <i className='bx bx-search-alt-2 text-2xl'></i>
              <input
                className='outline-none placeholder:text-slate-400 px-3 py-2'
                placeholder='Tìm kiếm tên sản phẩm...'
              />
            </div>
            <select
              value={categoryFilter}
              onChange={handleChangeCategoryFilter}
              className='border-2 py-2 px-5 rounded-md border-[#212B36]'
            >
              <option value='váy'>Váy</option>
              <option value='áo'>Áo</option>
              <option value='quần'>Quần</option>
              <option value=''>Tất cả</option>
            </select>
          </div>
          <button
            onClick={handleOpenModal}
            className='flex justify-center items-center rounded-3xl gap-2 p-2 bg-blue-800'
          >
            <FontAwesomeIcon
              icon={faPlus}
              size='lg'
              color='black'
              className='w-[20px] h-[20px] p-2 bg-white rounded-full'
            />
            <p className='text-white'>Thêm sản phẩm</p>
          </button>
        </div>

        <table className='w-full border-collapse border border-[#D5D5D5]'>
          <thead>
            <tr className=''>
              <th className='p-2 border-y-2  border-[#D5D5D5] border-l-2 font-bold text-[15px] text-center'>
                STT
              </th>
              <th className='p-2 border-y-2  border-[#D5D5D5] font-bold text-[15px] text-center'>
                Ảnh
              </th>
              <th className='p-2 border-y-2 border-[#D5D5D5] font-bold text-[15px] text-center'>
                Tên sản phẩm
              </th>
              <th className='p-2 border-y-2 border-[#D5D5D5] font-bold text-[15px] text-center'>
                Danh mục
              </th>
              <th className='p-2 border-y-2 border-[#D5D5D5] font-bold text-[15px] text-center'>
                Giá
              </th>
              <th className='p-2 border-y-2 border-[#D5D5D5] font-bold text-[15px] text-center'>
                Màu sắc
              </th>
              <th className='p-2 border-y-2 border-[#D5D5D5] font-bold text-[15px] text-center'>
                Kích cỡ
              </th>
              <th className='p-2 border-y-2  border-[#D5D5D5] border-r-2 font-bold text-[15px] text-center'>
                Công cụ
              </th>
            </tr>
          </thead>
          <tbody>
            {productList.length > 0 ? (
              [...productList]
                .reverse()
                .slice(skipPage * rowsPerPage, (skipPage + 1) * rowsPerPage)
                .map((val, index) => {
                  return (
                    <RowProduct
                      val={val}
                      index={skipPage * rowsPerPage + index}
                      fetchProducts={fetchProducts}
                    />
                  )
                })
            ) : (
              <tr>
                <td colSpan='5' className='text-center p-4'>
                  Chưa có đơn sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className='mt-1'>
          <TablePagination
            component='div'
            page={skipPage}
            count={productList.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <PopupAddProduct isOpen={isModalOpen} onClose={onCloseModal} fetchProducts={fetchProducts} />
    </div>
  )
}
