// import { combineReducers } from 'redux'

// import authReducer from './authReducer.ts'
// import postsReducer from './postsReducer.ts'

// const rootReducer = combineReducers({
//   auth: authReducer,
//   posts: postsReducer,
// })

import { combineReducers, Reducer } from 'redux'

import authReducer from './authReducer.ts'
import postsReducer from './postsReducer.ts'

const rootReducer: Reducer = combineReducers({ auth: authReducer, posts: postsReducer })
export default rootReducer
