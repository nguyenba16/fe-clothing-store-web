// RowProduct.jsx
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import PopupProduct from './PopupProduct'
import AdminApi from '../../../../apis/adminApi'
import { toast } from 'react-toastify'

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
  transparent: 'bg-transparent',
}

const RowProduct = ({ val, index, fetchProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const handleDeleteProduct = async () => {
    try {
      const res = await AdminApi.deleteAProduct(val.id)
      fetchProducts()
      toast.success('Đã xóa sản phẩm thành công!')
      return res
    } catch (error) {
      toast.error('Không thể xóa sản phẩm!')
      console.error('Không thể xóa sản phẩm: ', error)
    }
  }
  return (
    <>
      <tr key={index} className='border-t-2 border-[#D5D5D5]'>
        <td className='p-2 text-[15px] text-center'>{index + 1}</td>
        <td className='p-2 text-[15px]'>
          <img
            src={val.productImage[0].url}
            alt='Ảnh sản phẩm'
            className='w-[7vw] h-[15vh] object-cover rounded-lg mx-auto'
          />
        </td>
        <td className='p-2 max-w-[12vw] text-[15px]'>{val.productName}</td>
        <td className='p-2 text-[15px] text-center'>{val.categrory.categroryName}</td>
        <td className='p-2 text-[15px] text-center'>{val.price}vnđ</td>
        <td className='p-2 text-[15px]'>
          {val.colors.map((item, i) => (
            <div
              key={i}
              className={`${colorClasses[item] || 'bg-gray-300'} w-[25px] h-[25px] rounded-full border border-gray-500 ml-2 inline-block`}
            ></div>
          ))}
        </td>
        <td className='p-2 text-[15px] text-center'>
          {val.sizes.map((item, i) => (
            <span key={i} className='inline-block ml-1'>
              {item}
              {i < val.sizes.length - 1 ? ' |' : ''}
            </span>
          ))}
        </td>
        <td className='p-2 text-[15px] text-center'>
          <div className='py-2.5 px-5 flex justify-center'>
            <div
              onClick={openModal}
              className='cursor-pointer bg-[#FAFBFD] rounded-tl-2xl rounded-bl-2xl border-[#D5D5D5] border flex justify-center items-center py-2 px-5'
            >
              <FontAwesomeIcon icon={faPenToSquare} size='lg' color='black' />
            </div>
            <div
              onClick={handleDeleteProduct}
              className='cursor-pointer bg-[#FAFBFD] rounded-tr-2xl rounded-br-2xl border-[#D5D5D5] border flex justify-center items-center py-2 px-5'
            >
              <FontAwesomeIcon icon={faTrashCan} size='lg' color='red' />
            </div>
          </div>
        </td>
      </tr>

      <PopupProduct isOpen={isModalOpen} onClose={closeModal} product={val} />
    </>
  )
}

export default RowProduct
