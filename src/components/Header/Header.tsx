import { Button, Flex, Space } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { HERO_ROUTE, LOGIN_ROUTE, NEW_ARTICLE_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts.ts'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts'
import { RootState } from '../../stores/store.ts'
import { logoutFunc } from '../../actions/authActions.ts'

import styles from './Header.module.scss'

const Header: React.FC = () => {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.auth.user)

  const handleLogOut = () => {
    dispatch(logoutFunc())
  }

  return (
    <Flex className={styles.header} justify="space-between" align="center">
      <Button className={styles.header__logo} type="text">
        <NavLink to={HERO_ROUTE}>Realworld Blog</NavLink>
      </Button>
      {isAuthenticated ? (
        <Flex className={styles.header__profile}>
          <NavLink to={NEW_ARTICLE_ROUTE}>Add post</NavLink>
          <div className={styles.profile__name}>{user.user.username}</div>
          <img src={user.user.image} className={styles.profile__pic} alt="profile icon" />
          <Button onClick={handleLogOut}>Log Out</Button>
        </Flex>
      ) : (
        <Space className="header__nav">
          <Button type="text">
            <NavLink to={LOGIN_ROUTE}>Sign In</NavLink>
          </Button>
          <Button danger>
            <NavLink to={REGISTRATION_ROUTE}>Sign Up</NavLink>
          </Button>
        </Space>
      )}
    </Flex>
  )
}

export default Header

// import  Button, Flex, Space  from 'antd'
// import React,  FC  from 'react'
// import  NavLink  from 'react-router-dom'
// import  useSelector  from 'react-redux'
// import  RootState  from '../../store'

// import  HERO_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE  from '../../utils/consts'

// import styles from './Header.module.scss'

// const Header: FC = () => {
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

//   // useEffect(() => , [])  ,  useEffect

//   console.log(isAuthenticated)

//   return (
//     <Flex className=styles.header justify="space-between" align="center">
//       <Button className=styles.header__logo type="text">
//         <NavLink to=HERO_ROUTE>Realworld Blog</NavLink>
//       </Button>
//       isAuthenticated ? null : (
//         <Space className="header__nav">
//           <Button type="text">
//             <NavLink to=LOGIN_ROUTE>Sign In</NavLink>
//           </Button>
//           <Button danger>
//             <NavLink to=REGISTRATION_ROUTE>Sign Up</NavLink>
//           </Button>
//         </Space>
//       )
//     </Flex>
//   )

// export default Header
