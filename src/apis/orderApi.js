import axiosClient from './axiosClient'
import { ORDER_ENDPOINTS } from '../services/endpoints/order.endpoints'

const orderApi = {
  // Customer APIs
  createOrder: (userId, orderData) => {
    if (!userId) {
      return Promise.reject(new Error('User ID is required'))
    }
    const url = `${ORDER_ENDPOINTS.CREATE_ORDER}/${userId}`
    return axiosClient.post(url, orderData)
  },

  getUserOrders: (status = 'all') => {
    const url = `${ORDER_ENDPOINTS.GET_USER_ORDERS}?status=${status}`
    return axiosClient.get(url)
  },

  getOrderDetail: (orderId) => {
    const url = `${ORDER_ENDPOINTS.GET_ORDER_DETAIL}/${orderId}`
    return axiosClient.get(url)
  },

  cancelOrder: (orderId) => {
    const url = `${ORDER_ENDPOINTS.CANCEL_ORDER}/${orderId}`
    return axiosClient.post(url)
  },

  // Admin APIs
  getAllOrders: (status) => {
    const url = status
      ? `${ORDER_ENDPOINTS.GET_ALL_ORDERS}?status=${status}`
      : ORDER_ENDPOINTS.GET_ALL_ORDERS
    return axiosClient.get(url)
  },

  updateOrderStatus: (orderId, status) => {
    const url = `${ORDER_ENDPOINTS.UPDATE_ORDER_STATUS}/${orderId}`
    return axiosClient.patch(url, { status })
  },

  deleteOrder: (orderId) => {
    const url = `${ORDER_ENDPOINTS.DELETE_ORDER}/${orderId}`
    return axiosClient.delete(url)
  },
}

export default orderApi
