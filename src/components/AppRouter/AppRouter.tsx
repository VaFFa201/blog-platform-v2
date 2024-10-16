import { Navigate, Route, Routes } from 'react-router-dom'

import { HERO_ROUTE } from '../../utils/consts.ts'
import { authRoutes, publicRoutes } from '../../routes.ts'
import { RootState } from '../../stores/store.ts'
import { useAppSelector } from '../../shared/hooks/hooks.ts'

import styles from './AppRouter.module.scss'

const AppRouter: React.FC = () => {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)

  return (
    <main className={styles.main}>
      <Routes>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        {isAuthenticated &&
          authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
        <Route path="*" element={<Navigate replace to={HERO_ROUTE} />} />
      </Routes>
    </main>
  )
}

export default AppRouter
