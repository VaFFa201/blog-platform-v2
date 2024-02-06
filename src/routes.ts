/* eslint-disable import/extensions */
import React from 'react'

import PostList from './components/PostList/index.js'
import LoginPage from './pages/LoginPage.tsx'
import PostView from './components/PostView/index.js'
import {
  HERO_ROUTE,
  ARTICLES_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  PROFILE_ROUTE,
  NEW_ARTICLE_ROUTE,
} from './utils/consts.ts'
import PostForm from './components/Forms/PostForm/PostForm.tsx'
import LogForm from './components/Forms/LogForm/LogForm.tsx'

interface Route {
  path: string
  Component: React.ComponentType<any>
}

export const authRoutes: Route[] = [
  {
    path: PROFILE_ROUTE,
    Component: PostList,
  },
  // {
  //   path: `${ARTICLES_ROUTE}/:sign`,
  //   Component: PostView,
  // },
  {
    path: `${ARTICLES_ROUTE}/:sign/edit`,
    Component: PostList,
  },
  {
    path: '/new-article',
    Component: PostForm,
  },
]

export const publicRoutes: Route[] = [
  {
    path: HERO_ROUTE,
    Component: PostList,
  },
  {
    path: ARTICLES_ROUTE,
    Component: PostList,
  },
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: LoginPage,
  },
  {
    path: `${ARTICLES_ROUTE}/:sign`,
    Component: PostView,
  },
]
