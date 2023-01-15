import { logAPI } from "../api/api"

const SET_LOG_DATA = 'log/SET_LOG_DATA'

let initial = {
  logs: [],
}

const logReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_LOG_DATA:
      return {
        ...state,
        logs: action.logs
      }
    default:
      return state
  }
}

export const setLogsData = (logs) => ({ type: SET_LOG_DATA, logs })

export const getLogs = () => async (dispatch) => {
  const response = await dispatch(logAPI.getLogs())
  if(response.resultCode === 0) {
    dispatch(setLogsData(response.logs))
  }
}

export default logReducer