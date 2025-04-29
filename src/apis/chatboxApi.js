import ChatBoxEndpoints from '../services/endpoints/chatbox.endpoints'
import axiosClient from './axiosClient'
class chatboxApi {
  async sendMessage(sessionId, message) {
    const req = {
      role: 'user',
      sessionId: sessionId,
      requestText: message,
    }
    try {
      const res = await axiosClient.post(ChatBoxEndpoints.chatbox, req)
      return res.data
    } catch (error) {
      throw (
        (new Error('Có lỗi khi gửi message chatbox', error),
        console.log('Có lỗi khi gửi message chatbox: ', error))
      )
    }
  }
}

const ChatBoxApi = new chatboxApi()
export default ChatBoxApi
