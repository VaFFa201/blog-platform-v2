import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'
import AppRouter from './components/AppRouter/index.ts'
import { fetchData } from './actions/fetchDataActions.ts'
import { useAppDispatch } from './hooks/hooks.ts'
import { checkUserToken } from './actions/authActions.ts'
import PostForm from './components/Forms/PostForm/PostForm.tsx'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(checkUserToken())
    dispatch(fetchData())
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <PostForm />
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
