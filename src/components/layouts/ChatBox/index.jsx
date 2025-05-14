import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { set } from 'react-hook-form'
import ChatBoxApi from '../../../apis/chatboxApi'
import useAuth from '../../../stores/useAuth'
import { Avatar } from 'antd'

export default function ChatBox() {
  const { user } = useAuth()
  const [isOpenChatbox, setIsOpenChatbox] = useState(false)
  const [message, setMessage] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const [messHistory, setMessHistory] = useState([
    {
      role: 'ai',
      message: 'Chào bạn! Tôi có thể giúp gì cho bạn nhỉ?',
    },
  ])

  const handleSendMessage = async () => {
    const mess = {
      role: 'user',
      message: message,
    }
    setMessHistory((prev) => [...prev, mess])
    setMessage('')
    setIsLoading(true)
    try {
      const res = await ChatBoxApi.sendMessage(user.id, message)
      const responseMess = {
        role: 'ai',
        message: res.data.responseText,
      }
      setMessHistory((prev) => [...prev, responseMess])
    } catch (error) {
      console.log('Có lỗi khi gửi câu hỏi', error)
    } finally {
      setIsLoading(false)
    }
  }
  console.log(messHistory)
  return (
    <div className={`overscroll-x-auto fixed bottom-3 right-3 z-50`}>
      <div
        onClick={() => setIsOpenChatbox(true)}
        className={`px-4 py-2 bg-[#000] text-white rounded-full text-[18px] ${isOpenChatbox ? 'hidden' : ''}`}
      >
        Mở ChatBox
      </div>
      {isOpenChatbox ? (
        <div className='overflow-hidden w-[25vw] h-[65vh] bg-[#f1f1f1] rounded-xl inset-shadow-sm shadow-xl relative'>
          <div className='flex justify-between items-center h-[13%] bg-[#000000] p-4 rounded-t-xl w-[25vw] shadow-lg absolute  top-0'>
            <p className='text-[#fff] font-bold text-[20px]'>Trợ lí Từ Từ</p>
            <button onClick={() => setIsOpenChatbox(false)}>
              <FontAwesomeIcon icon={faXmark} color='white' size='xl' />
            </button>
          </div>
          <div className='overflow-y-auto max-h-[72%] hide-scrollbar mt-[15%] p-4'>
            {messHistory.map((mess) => {
              return (
                <div
                  className={`${mess.role == 'ai' ? 'justify-start' : 'justify-end items-end gap-2'} flex`}
                >
                  <div
                    className={`p-2 max-w-[80%] bg-[#cecece] rounded-xl mt-2 ${mess.role == 'ai' ? 'text-left' : 'text-right'}`}
                  >
                    <p className='font-medium indent-3'>{mess.message}</p>
                  </div>
                  {mess.role == 'user' ? (
                    <Avatar
                      sx={{ width: '10px', height: '10px' }}
                      src={user?.avatar?.url}
                      alt='avatar'
                      className='border-2 rounded-full border-black'
                    />
                  ) : null}
                </div>
              )
            })}
            {isloading ? (
              <div className='p-2 max-w-[30%] bg-[#cecece] rounded-xl mt-2'>
                Loading<span className='dot-flash'>.</span>
                <span className='dot-flash delay-3'>.</span>
                <span className='dot-flash delay-2'>.</span>
              </div>
            ) : null}
          </div>
          <div className='h-[15%] w-[25vw] absolute bottom-0 bg-white border-2 border-t-[#929191] px-4 py-3 justify-between flex'>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='border-2 border-[#929191] w-[85%] h-[100%] rounded-xl px-2'
              placeholder='Nhập câu hỏi....'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <button className='p-2' onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} size='xl' color='blue' />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
