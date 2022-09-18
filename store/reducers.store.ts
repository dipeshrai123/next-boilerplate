import {configureStore} from '@reduxjs/toolkit'

import loginReducer from 'redux/login/login.slice'

export const store = configureStore({
  reducer: {
    login: loginReducer
  }
})
