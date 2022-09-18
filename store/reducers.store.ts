import {configureStore} from '@reduxjs/toolkit'

import loginReducer from 'src/pages/login/login.slice'

export const store = configureStore({
  reducer: {
    login: loginReducer
  }
})
