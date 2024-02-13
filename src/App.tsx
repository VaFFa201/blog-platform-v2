import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'
import AppRouter from './components/AppRouter/index.ts'
import { fetchData } from './actions/fetchDataActions.ts'
import { useAppDispatch, useAppSelector } from './hooks/hooks.ts'
import { checkUserToken } from './actions/authActions.ts'
import './App.module.scss'
import { RootState } from './stores/store.ts'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(checkUserToken())
  }, [])

  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)

  useEffect(() => {
    dispatch(fetchData(isAuthenticated))
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
