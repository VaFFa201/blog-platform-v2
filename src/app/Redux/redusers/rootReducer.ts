import { combineReducers, Reducer } from 'redux'

import authReducer from './authReducer.ts'
import postsReducer from './postsReducer.ts'

const rootReducer: Reducer = combineReducers({ auth: authReducer, posts: postsReducer })
export default rootReducer
