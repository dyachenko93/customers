import { customersAPI } from "../api/api"

const SET_CUSTOMER_LIST = 'customers/SET_CUSTOMER_LIST'
const SET_CUSTOMER_INFO = 'customers/SET_CUSTOMER_INFO'

let initialList = [{
  id: 2,
  name: 'Gandalf Grey',
  phoneNumber: '0123581321',
  dateTime: '12:00 12.12.2022',
}, {
  id: 3,
  name: 'Gandalf White',
  phoneNumber: ['032589546', '231315464565', '12894513213'],
  dateTime: '15:00 17.12.2022',
}, {
  id: 4,
  name: 'Frodo Beggins',
  phoneNumber: ['32258248546', '1468796435'],
  dateTime: '15:30 17.12.2022',
}, {
  id: 5,
  name: 'Samwise Gamgee',
  phoneNumber: ['32258248546', '1468796435'],
  dateTime: '15:30 17.12.2022',
}, {
  id: 6,
  name: 'Merry Brandybuck',
  phoneNumber: ['325365764756'],
  dateTime: '15:30 19.12.2022',
}, {
  id: 7,
  name: 'Pippin Took',
  phoneNumber: '5687698769545',
  dateTime: '18:30 19.11.2022',
}];

let initialCustomer = {
  id: 3,
  name: 'Gandalf White',
  phoneNumber: ['032589546', '231315464565', '12894513213'],
  info: [{
    date1: '10.10.2022',
    device: 'iphone XR Black',
    customerInfo: 'Camera broken',
    serviceInfo: 'need to change camera',
    details: 'camera replacement $50',
    date2: '16.10.2022',
  }, {
    date1: '08.12.2022',
    device: 'airpods pro',
    customerInfo: 'left ear battery',
    serviceInfo: 'replace earphone',
    details: 'left earphone replacement $95',
    date2: '10.12.2022',
  }],
}

let initial = {
  list: null,
  customer: null
}

const customersReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_CUSTOMER_LIST:
      return {
        ...state,
        list: action.customers
      }
    case SET_CUSTOMER_INFO:
      return {
        ...state,
        customer: action.customer
      }
    default:
      return state
  }
}

export const setCustomerList = (customers) => ({ type: SET_CUSTOMER_LIST, customers })
export const setCustomerInfo = (customer) => ({ type: SET_CUSTOMER_INFO, customer })

export const getCustomerList = () => async (dispatch) => {
  try {
    const response = await dispatch(customersAPI.getList())
    if (response.resultCode === 0) {
      dispatch(setCustomerList(response.customers))
    }
  } catch(e) {
    dispatch(setCustomerList(initialList))
  }
}

export const getCustomerInfo = (customerId) => async (dispatch) => {
  try {
    const response = await dispatch(customersAPI.getCustomerInfo(customerId))
    if (response.resultCode === 0) {
      dispatch(setCustomerInfo(response.customer))
    }
  } catch(e) {
    dispatch(setCustomerInfo(initialCustomer))
  }
}

export const saveCustomer = (data) => async (dispatch) => {
  console.log(data)
  console.log('new customer saved')
  return
  const response = await dispatch(customersAPI.saveCustomer(data))
  if (response.resultCode === 0) {
    dispatch(getCustomerList())
  }
}

export const deleteCustomer = (customerId) => async (dispatch) => {
  console.log(`customer with id ${customerId} deleted`)
  return
  const response = await dispatch(customersAPI.deleteCustomer(customerId))
  if (response.resultCode === 0) {
    dispatch(getCustomerList())
  }
}

export const saveCustomerInfo = (data) => async (dispatch) => {
  console.log(data)
  console.log('new customer info saved')
  return
  const response = await dispatch(customersAPI.saveCustomerInfo(data))
  if (response.resultCode === 0) {
    dispatch(getCustomerInfo(data.customerId))
  }
}

export const deleteCustomerInfo = ({ customerId, infoId }) => async (dispatch) => {
  console.log(`info with id ${infoId} for customer ${customerId} deleted`)
  return
  const response = await dispatch(customersAPI.deleteCustomerInfo(infoId))
  if (response.resultCode === 0) {
    dispatch(getCustomerInfo(customerId))
  }
}

export default customersReducer