import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {setCookie} from 'helpers'

import {loginService} from './login.service'

const login = createAsyncThunk(
  'login/login',
  async (
    {
      email,
      password,
      onSuccess
    }: {
      email: string
      password: string
      onSuccess: (data: Api.Session) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await loginService.login({
        email,
        password
      })
      if (response.token) {
        setCookie('@token', response.token)
      }
      onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot Login!')
    }
  }
)

const authenticateUser = createAsyncThunk(
  'login/users',
  async ({onSuccess}: {onSuccess: (data: Api.Session) => void}, thunkAPI) => {
    try {
      const response = await loginService.authenticateUser()
      onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot Authenticate!')
    }
  }
)

const initialState: {
  authenticating: boolean
  loading: boolean
  data?: Api.Session
  success: boolean
} = {
  authenticating: true,
  loading: false,
  data: undefined,
  success: false
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.authenticating = false
      state.loading = false
      state.data = action.payload
      state.success = true
    })
    builder.addCase(login.rejected, (state) => {
      state.authenticating = false
      state.loading = false
      state.success = false
    })
    builder.addCase(authenticateUser.pending, (state) => {
      state.authenticating = true
    })
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.authenticating = false
      state.data = action.payload
      state.success = true
    })
    builder.addCase(authenticateUser.rejected, (state) => {
      state.authenticating = false
      state.success = false
    })
  }
})

export {login, authenticateUser}
export default loginSlice.reducer
