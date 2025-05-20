import axiosClient from './axiosClient'
import cartEndpoints from '../services/endpoints/cart.endpoints'

class CartApi {
  async getCart() {
    try {
      const res = await axiosClient.get(cartEndpoints.getCart)
      return res.data
    } catch (error) {
      console.log('Error getting cart:', error)
      throw new Error('Failed to get cart')
    }
  }

  async addItemToCart(productId, size, color, quantity) {
    try {
      const res = await axiosClient.post(cartEndpoints.addItem, null, {
        params: {
          productId,
          size,
          color,
          quantity,
        },
      })
      return res.data
    } catch (error) {
      console.log('Error adding item to cart:', error)
      throw new Error('Failed to add item to cart')
    }
  }

  async removeItemFromCart(productId, size, color) {
    try {
      const res = await axiosClient.delete(cartEndpoints.removeItem, {
        params: {
          productId,
          size,
          color,
        },
      })
      return res.data
    } catch (error) {
      console.log('Error removing item from cart:', error)
      throw new Error('Failed to remove item from cart')
    }
  }

  async updateItemQuantity(productId, size, color, quantity) {
    try {
      const res = await axiosClient.put(cartEndpoints.updateQuantity, null, {
        params: {
          productId,
          size,
          color,
          quantity,
        },
      })
      return res.data
    } catch (error) {
      console.log('Error updating item quantity:', error)
      throw new Error('Failed to update item quantity')
    }
  }

  async clearCart() {
    try {
      const res = await axiosClient.delete(cartEndpoints.clearCart)
      return res.data
    } catch (error) {
      console.log('Error clearing cart:', error)
      throw new Error('Failed to clear cart')
    }
  }

  async deleteCart() {
    try {
      const res = await axiosClient.delete(cartEndpoints.deleteCart)
      return res.data
    } catch (error) {
      console.log('Error deleting cart:', error)
      throw new Error('Failed to delete cart')
    }
  }
}

const cartApi = new CartApi()
export default cartApi
