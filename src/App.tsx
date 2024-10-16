import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'
import AppRouter from './app/router/AppRouter'
import { fetchData } from './app/Redux/actions/fetchDataActions.ts'
import { useAppDispatch, useAppSelector } from './shared/hooks/hooks.ts'
import { checkUserToken } from './app/Redux/actions/authActions.ts'
import './App.module.scss'
import './style.scss'
import { RootState } from './app/Redux/stores/store.ts'

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
