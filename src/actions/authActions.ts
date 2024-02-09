import { $authHost, $host } from '../http/index.ts'
import { AppDispatch } from '../stores/store.ts'
import { User, UserToLog, UserToUpdate } from '../types/auth.ts'

export const authRequest = () => {
  return {
    type: 'AUTH_REQUEST',
  }
}

export const loginSuccess = (user: User) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: user,
  }
}

export const loginFailure = (error: Error) => {
  return {
    type: 'LOGIN_FAILURE',
    payload: error,
  }
}

export const registerSuccess = (user: User) => {
  return {
    type: 'REGISTER_SUCCESS',
    payload: user,
  }
}

export const registerFailure = (error: Error) => {
  return {
    type: 'REGISTER_FAILURE',
    payload: error,
  }
}

export const getCurrentUserSuccess = (user: User) => {
  return {
    type: 'GET_USER_SUCCESS',
    payload: user,
  }
}

export const getCurrentUserError = (error: Error) => {
  return {
    type: 'GET_USER_FAILURE',
    payload: error,
  }
}

export const updateUserSuccess = (user: User) => {
  return {
    type: 'UPDATE_USER_SUCCESS',
    payload: user,
  }
}

export const updatetUserFailure = (error: Error) => {
  return {
    type: 'UPDATE_USER_FAILURE',
    payload: error,
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

export const logoutFailure = (error: Error) => {
  return {
    type: 'LOGOUT_FAILURE',
    payload: error,
  }
}

export const getCurrentUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(authRequest())
    try {
      const response = await $authHost.get('/user')
      const body = response.data

      dispatch(getCurrentUserSuccess(body.user))

      return body
    } catch (error: any) {
      dispatch(getCurrentUserError(error))
    }
  }
}

export const checkUserToken = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(getCurrentUser())
    }
  }
}

export const register = (userData: UserToLog) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authRequest())
    try {
      const response = await $host.post('/users', userData)
      const body = response.data

      localStorage.setItem('token', body.user.token)

      dispatch(registerSuccess(body.user))

      return body
    } catch (error: any) {
      dispatch(registerFailure(error))
    }
  }
}

export const login = (userData: UserToLog) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authRequest())
    try {
      const response = await $host.post('/users/login', userData)
      const body = response.data

      localStorage.setItem('token', body.user.token)

      dispatch(loginSuccess(body.user))

      return body
    } catch (error: any) {
      dispatch(loginFailure(error))
    }
  }
}

export const logoutFunc = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(authRequest())
    try {
      localStorage.removeItem('token')
      dispatch(logout())

      return {}
    } catch (error: any) {
      dispatch(logoutFailure(error))
    }
  }
}

export const updateUser = (newUserData: UserToUpdate) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authRequest())
    try {
      const response = await $authHost.put('/user', newUserData)
      const body = response.data

      localStorage.setItem('token', body.user.token)

      dispatch(updateUserSuccess(body.user))

      return body
    } catch (error: any) {
      dispatch(updatetUserFailure(error))
    }
  }
}
