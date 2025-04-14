import axiosClient from './axiosClient'
import adminEndpoint from '../services/endpoints/admin.endpoints'

class adminApi {
  async getAllOrders(status) {
    try {
      const res = await axiosClient.get(`${adminEndpoint.getOrder}?status=${status}`)
      return res.data.data
    } catch (error) {
      throw new Error('Có lỗi xảy ra khi lấy tất cả đơn: ', error)
    }
  }

  async updateStatusOrder(orderId, status) {
    try {
      const res = await axiosClient.patch(`${adminEndpoint.updateOrder}/${orderId}`, { status })
      return res.data
    } catch (error) {
      throw new Error('Có lỗi xảy ra khi cập nhật đơn hàng: ', error)
    }
  }

  async addAProduct(product) {
    try {
      const res = await axiosClient.post(adminEndpoint.addAproduct, product, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data
    } catch (error) {
      throw new Error('Có lỗi xảy ra khi thêm sản phẩm: ', error)
    }
  }

  async deleteAProduct(id) {
    try {
      const res = await axiosClient.delete(`${adminEndpoint.deleteAProduct}/${id}`)
      return res.data
    } catch (error) {
      throw new Error('Có lỗi xảy ra khi xóa sản phẩm: ', error)
    }
  }
}

const AdminApi = new adminApi()
export default AdminApi
