export default function ManageOrderUser() {
  return (
    <div className='p-10 flex flex-col justify-center items-center'>
      <div className='w-[80vw] flex justify-between bg-primary py-5 px-10 gap-2'>
        <button className='text-white text-[20px] font-medium'>Tất cả</button>
        <button className='text-white text-[20px] font-medium'>Chưa duyệt</button>
        <button className='text-white text-[20px] font-medium'>Đã duyệt</button>
        <button className='text-white text-[20px] font-medium'>Đang giao</button>
        <button className='text-white text-[20px] font-medium'>Đã hoàn thành</button>
        <button className='text-white text-[20px] font-medium'>Đã hủy</button>
      </div>
      <div></div>
    </div>
  )
}
