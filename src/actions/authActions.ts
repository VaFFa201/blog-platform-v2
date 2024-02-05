import { $authHost, $host } from '../http/index.ts'
import { AppDispatch } from '../stores/store.ts'
import { User, UserToLog } from '../types/auth.ts'

//

export const authRequest = () => {
  return {
    type: 'AUTH_REQUEST',
  }
}

export const loginSuccess = (user: UserToLog) => {
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

export const getCurrentUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(authRequest())
    try {
      const response = await $authHost.get('/user')
      const body = response.data

      dispatch(getCurrentUserSuccess(body))

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

      dispatch(registerSuccess(body))
      dispatch(getCurrentUser())

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

      dispatch(getCurrentUser())

      // dispatch(loginSuccess(body))

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

// заменить на свои криейторы + проработать доконца выявление ошибок
