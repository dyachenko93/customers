import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: ''
})

export const authAPI = {
  checkAuth() {
    return instance.get(`/auth/me`)
  },
  login(login, password, rememberMe = false) {
    return instance.post(`/auth/login`, {
      login: login,
      password: password,
      rememberMe: rememberMe
    })
  },
  logout() {
    return instance.delete(`/auth/login`)
  }
}

export const customersAPI = {
  getList() {
    return instance.get(`/customers/list`)
  },
  getCustomerInfo(customerId) {
    return instance.get(`/customer/${customerId}`)
  },
  saveCustomer(name, phone) {
    return instance.post(`/customer/save`, {
      name: name,
      phone: phone
    })
  },
  saveCustomer(customerId) {
    return instance.post(`/customer/delete`, {
      customerId: customerId,
    })
  },
  saveCustomerInfo(data) {
    return instance.post(`/customer/info/save`, {
      data: data
    })
  },
  deleteCustomerInfo(customerId) {
    return instance.post(`/customer/info/delete`, {
      customerId: customerId
    })
  }
}

export const logAPI = {
  getLogs() {
    return instance.get(`/logs`)
  }
}

export const userAPI = {
  saveInfo(data) {
    return instance.post(`/user`, {
      data: data
    })
  },
  editPassword(password) {
    return instance.post(`/user/password`, {
      password: password
    })
  }
}