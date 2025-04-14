import axiosClient from './axiosClient'
import authEndpoints from '../services/endpoints/auth.endpoints'
import userEndpoints from '../services/endpoints/user.endpoints'

class AuthApi {
  async login(email, password) {
    try {
      const res = await axiosClient.post(authEndpoints.login, {
        email,
        password,
      })
      return res
    } catch (error) {
      throw new Error('Có lỗi xảy ra: ', error)
    }
  }
  async logout() {
    try {
      const res = await axiosClient.post(`${authEndpoints.logout}`)
      return res
    } catch (error) {
      throw new Error('Có lỗi xảy ra: ', error)
    }
  }

  async getme() {
    try {
      const res = await axiosClient.get(`${userEndpoints.getme}`)
      return res
    } catch (error) {
      throw new Error('Có lỗi xảy ra: ', error)
    }
  }
}

const authApi = new AuthApi()

export default authApi
