import authEndpoints from '../services/endpoints/auth.endpoints'
import axiosClient from './axiosClient'

class UserApi {
  async signUp(name, email, phoneNumber, nameAccount, password, address) {
    const role = 'CUSTOMER'
    try {
      const res = await axiosClient.post(authEndpoints.signup, {
        name,
        email,
        phoneNumber,
        nameAccount,
        password,
        address,
        role,
      })
      return res
    } catch (error) {
      throw new Error('Có lỗi đăng kí người dùng xảy ra')
    }
  }
}

const userApi = new UserApi()

export default userApi
