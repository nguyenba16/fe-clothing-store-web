import authEndpoints from '../services/endpoints/auth.endpoints'
import axiosClient from './axiosClient'
import userEndpoints from '../services/endpoints/user.endpoints'

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
  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
  }

  async updateProfile(name, phoneNumber, nameAccount, address, imageBody, avatar, user) {
    try {
      const formData = new FormData()
      if (user.name != name) {
        formData.append('name', name)
      }
      if (user.phoneNumber != phoneNumber) {
        formData.append('phoneNumber', phoneNumber)
      }

      if (user.nameAccount != nameAccount) {
        formData.append('nameAccount', nameAccount)
      }
      if (user.address != address) {
        formData.append('address', address)
      }
      if (imageBody) {
        formData.append('imageBody', imageBody)
      }
      if (avatar) {
        formData.append('avatar', avatar)
      }
      console.log(formData)
      const res = await axiosClient.patch(userEndpoints.updateProfile, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return res.data
    } catch (error) {
      throw new Error('Có lỗi update profile dùng xảy ra')
    }
  }

  async getOrderList(status) {
    try {
      const res = await axiosClient.get(`${userEndpoints.getOrderList}?status=${status}`)
      return res.data
    } catch (error) {
      console.log('Có lỗi khi lấy các đơn hàng:', error)
      throw new Error('Có lỗi update profile dùng xảy ra', error)
    }
  }

  async cancelOrder(id) {
    try {
      const res = await axiosClient.post(`${userEndpoints.cancelOrder}/${id}`)
      return res.data
    } catch (error) {
      console.log('Có lỗi khi hủy đơn hàng:', error)
      throw new Error('Có lỗi khi hủy đơn hàng', error)
    }
  }
}

const userApi = new UserApi()

export default userApi
