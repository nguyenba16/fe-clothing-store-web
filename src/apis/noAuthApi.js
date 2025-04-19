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
      const res = await axiosClient.get(
        `${noAuthEndpoint.getAllProducts}`,
      )
      return res.data
    } catch (error) {
      console.log('Có lỗi xảy ra', error)
    }
  }
  async getCatergory() {
    try {
      const res = await axiosClient.get(
        `${noAuthEndpoint.getCategory}`,
      )
      return res.data
    } catch (error) {
      console.log('Có lỗi xảy ra', error)
    }
  }
  async getProductById(id) {
    try {
      const res = await axiosClient.get(
        `${noAuthEndpoint.getProductById}/${id}`,
      )
      return res.data
    } catch (error) {
      console.log('Có lỗi xảy ra', error)
    }
  }
  
}

const NoAuthApi = new noAuthApi()
export default NoAuthApi
