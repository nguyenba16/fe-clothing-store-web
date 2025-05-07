import axiosClient from './axiosClient'
import noAuthEndpoint from '../services/endpoints/noAuth.endpoints'
class noAuthApi {
  async getProductByCategory(categoryName) {
    try {
      const res = await axiosClient.get(
        `${noAuthEndpoint.getProductsByCategory}?category=${categoryName}`,
      )
      return res.data
    } catch (error) {
      console.log('Có lỗi xảy ra', error)
    }
  }

  async getProduct() {
    try {
      const res = await axiosClient.get(`${noAuthEndpoint.getAllProducts}`)
      return res.data
    } catch (error) {
      console.log('Có lỗi xảy ra', error)
    }
  }

  async getCatergory() {
    try {
      const res = await axiosClient.get(`${noAuthEndpoint.getCategory}`)
      return res.data
    } catch (error) {
      console.log('Có lỗi xảy ra', error)
    }
  }

  async getProductById(id) {
    try {
      const res = await axiosClient.get(`${noAuthEndpoint.getProductById}/${id}`)
      return res.data
    } catch (error) {
      console.log('Có lỗi xảy ra', error)
    }
  }

  async searchProducts(searchRequest) {
    try {
      const res = axiosClient.post(noAuthEndpoint.searchProducts, searchRequest)
      return res
    } catch (error) {
      console.log('Có lỗi xảy ra khi search', error)
    }
  }

  async sendVerifyCode(email) {
    const req = {
      email: email,
    }
    try {
      const res = await axiosClient.post(noAuthEndpoint.sendVerifyCode, req)
      return res.data
    } catch (error) {
      console.log('Có lỗi xảy ra khi gửi mã', error)
    }
  }
  async changePassword(email, code, newPass) {
    const req = {
      email: email,
      code: code,
      newPassword: newPass,
    }
    try {
      const res = await axiosClient.post(noAuthEndpoint.changePassword, req)
      return res.data
    } catch (error) {
      console.log('Có lỗi xảy ra khi đổi pass', error)
    }
  }
}

const NoAuthApi = new noAuthApi()
export default NoAuthApi
