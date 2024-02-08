export const AUTH_REQUEST = 'AUTH_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'

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
  isLoading: boolean
  isAuthenticated: boolean
  user: null | User // здесь нужно указать тип данных для объекта user
  error: null | string
}

interface AuthRequest {
  type: typeof AUTH_REQUEST
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
  payload: User
}

interface AuthRegisterError {
  type: typeof REGISTER_FAILURE
  payload: string
}

interface AuthGetUserSuccess {
  type: typeof GET_USER_SUCCESS
  payload: User
}

interface AuthGetUserError {
  type: typeof GET_USER_FAILURE
  payload: string
}

export type AuthAction =
  | AuthRequest
  | AuthLoginSuccess
  | AuthLoginFailure
  | AuthLogout
  | AuthRegisterSuccess
  | AuthRegisterError
  | AuthGetUserSuccess
  | AuthGetUserError
