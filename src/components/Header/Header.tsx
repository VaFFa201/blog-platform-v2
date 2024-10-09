import { Button, Flex, Space } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { HERO_ROUTE, LOGIN_ROUTE, NEW_ARTICLE_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts.ts'
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
          <Button className={`${styles['profile__new-post']} ${styles['green-btn']}`}>
            <NavLink to={NEW_ARTICLE_ROUTE}>Create article</NavLink>
          </Button>
          <div className={styles.profile__name}>
            <NavLink to={PROFILE_ROUTE}>{user.username}</NavLink>
          </div>
          <NavLink to={PROFILE_ROUTE}>
            <div className={styles['profile__pic-box']}>
              <img src={user.image} className={styles.profile__pic} alt="profile icon" />
            </div>
          </NavLink>
          <Button onClick={handleLogOut} className={styles.profile__logout}>
            Log Out
          </Button>
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
