/* eslint-disable default-param-last */
/* eslint-disable indent */

import { AuthAction, AuthState } from '../types/auth.ts'

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isRegistered: false,
}
const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isRegistered: true,
        error: null,
      }
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isRegistered: false,
        error: action.payload,
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      }
    default:
      return state
  }
}
export default authReducer
