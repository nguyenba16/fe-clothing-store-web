import axiosClient from "./axiosClient";
import authEndpoints from "../services/endpoints/auth.endpoints";
import userEndpoints from "../services/endpoints/user.endpoints";

class AuthApi {
    async login (email, password) {
        try {
            const res = await axiosClient.post(authEndpoints.login, {
              email,
              password,
            })
            return res
          } catch (error) {
            throw new Error('Có lỗi xảy ra')
          }
    }
    async logout() {
        try {
          const res = await axiosClient.post(`${authEndpoints.logout}`)
          return res
        } catch (error) {
          throw new Error('Có lỗi xảy ra')
        }
    }

    async getme() {
        try {
          const res = await axiosClient.get(`${userEndpoints.getme}`)
          return res
        } catch (error) {
          throw new Error('Có lỗi xảy ra')
        }
    }
}

const authApi = new AuthApi()

export default authApi