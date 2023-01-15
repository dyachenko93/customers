import { userAPI } from "../api/api"

const SET_PROFILE_DATA = 'user/SET_PROFILE_DATA'

let initial = {
  profile: null,
}

const userReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_PROFILE_DATA:
      return {
        ...state,
        profile: action.profile
      }
    default:
      return state
  }
}

export const setProfileData = (logs) => ({ type: SET_PROFILE_DATA, logs })

export const getProfile = () => async (dispatch) => {
  const response = await dispatch(userAPI.getProfile())
  if(response.resultCode === 0) {
    dispatch(setProfileData(response.profile))
  }
}

export default userReducer