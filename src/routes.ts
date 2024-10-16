import React from 'react'

import PostList from './components/PostList'
import LoginPage from './pages/LoginPage.tsx'
import PostView from './components/PostView'
import {
  HERO_ROUTE,
  ARTICLES_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  PROFILE_ROUTE,
  NEW_ARTICLE_ROUTE,
} from './shared/utils/consts.ts'
import PostForm from './components/Forms/PostForm'
import EditProfileForm from './components/Forms/EditProfileForm'

interface Route {
  path: string
  Component: React.ComponentType<any>
}

export const authRoutes: Route[] = [
  {
    path: PROFILE_ROUTE,
    Component: EditProfileForm,
  },
  {
    path: `${ARTICLES_ROUTE}/:sign/edit`,
    Component: PostForm,
  },
  {
    path: NEW_ARTICLE_ROUTE,
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
