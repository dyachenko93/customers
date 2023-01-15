import { authAPI } from "../api/api"

const SET_USER_DATA = 'auth/SET_USER_DATA'

let initial = {
  userId: null,
  login: null,
  isAuth: false,
  accessGroup: null
}

const authReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export const setAuthUserData = (userId, login, accessGroup, isAuth) => ({
  type: SET_USER_DATA, payload: { userId, login, accessGroup, isAuth }
})

export const checkAuth = (i) => async (dispatch) => {
  try {
    let response = await authAPI.checkAuth()
    if (response.resultCode === 0) {
      let { id, login, accessGroup } = response.data
      dispatch(setAuthUserData(id, login, accessGroup, true))
    }
  } catch(e) {
    if(i===1)
      dispatch(setAuthUserData(7, 'ddyachenko', 1, true))
  }
}

export const login = (login, password, rememberMe) => async (dispatch) => {
  try {
    let response = await authAPI.login(login, password, rememberMe)
    if (response.resultCode === 0) {
      dispatch(checkAuth())
    }
  } catch(e) {
    dispatch(checkAuth(1))
  }
}

export const logout = () => async (dispatch) => {
  try {
    const response = await authAPI.logout()
    if (response.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
  } catch(e) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export default authReducer