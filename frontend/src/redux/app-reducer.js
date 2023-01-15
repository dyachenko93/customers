import { checkAuth } from "./auth-reducer"

const SET_INITIALIZED = 'app/SET_INITIALIZED'

let initial = {
  initialized: false,
}

const appReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

export const setInitializingSuccess = () => ({ type: SET_INITIALIZED })

export const initializeApp = () => async (dispatch) => {
  try {
    await dispatch(checkAuth())
    dispatch(setInitializingSuccess())
  } catch (error) {
    dispatch(setInitializingSuccess())
  }
}

export default appReducer