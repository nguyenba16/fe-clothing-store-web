import useAuth from '../../../../stores/useAuth'
export default function HeaderOfAdmin() {
  const { user } = useAuth()
  return (
    <div className='w-full h-[12vh] bg-primary sticky top-0 items-center flex justify-end px-10'>
      <div className='flex items-center gap-3'>
        <div className='text-white text-[20px] font-bold text-right'>
          <p>{user.name}</p>
          <p className='italic font-light text-[15px]'>{user.email}</p>
        </div>
        <img
          src={user.avatar.url}
          alt='Avatar người dùng'
          className='w-[60px] object-cover h-[60px] rounded-full p-0.5 bg-white'
        />
      </div>
    </div>
  )
}
