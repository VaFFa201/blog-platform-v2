export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'

export interface Error {
  message: string
  name: string
  stack: string
}

export interface User {
  email: string
  password: string
  username: string
  bio: string
  image: string
}

export interface UserToLog {
  user: {
    email: string
    password: string
  }
}

export interface AuthState {
  isAuthenticated: boolean
  user: null | User // здесь нужно указать тип данных для объекта user
  error: null | string
  isRegistered: boolean
}

interface AuthLoginSuccess {
  type: typeof LOGIN_SUCCESS
  payload: User
}

interface AuthLoginFailure {
  type: typeof LOGIN_FAILURE
  payload: string
}

interface AuthLogout {
  type: typeof LOGOUT
}

interface AuthRegisterSuccess {
  type: typeof REGISTER_SUCCESS
}

interface AuthRegisterError {
  type: typeof REGISTER_FAILURE
  payload: string
}

interface AuthGetUserSuccess {
  type: typeof GET_USER_SUCCESS
  payload: User
}

export type AuthAction =
  | AuthLoginSuccess
  | AuthLoginFailure
  | AuthLogout
  | AuthRegisterSuccess
  | AuthRegisterError
  | AuthGetUserSuccess
