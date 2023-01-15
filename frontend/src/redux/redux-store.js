import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app-reducer'
import authReducer from './auth-reducer'
import customersReducer from './customers-reducer'
import logReducer from './log-reducer'

let reducers = {
  app: appReducer,
  auth: authReducer,
  customers: customersReducer,
  log: logReducer,
}

export default configureStore({ reducer: reducers })