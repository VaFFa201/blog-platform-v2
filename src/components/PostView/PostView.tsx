/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Button, Flex, Spin, Typography } from 'antd'
import { NavLink, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts'
import { clearCurrentArticle, fetchArticleData } from '../../actions/fetchDataActions.ts'
import { ARTICLES_ROUTE, EDIT_ARTICLE_ROUTE } from '../../utils/consts.ts'
import { RootState } from '../../stores/store.ts'

import styles from './PostView.module.scss'

const { Text } = Typography

type PostViewParams = {
  sign: any
}

const PostView = () => {
  const { sign } = useParams<PostViewParams>()
  const currentArticle = useAppSelector((state: RootState) => state.posts.currentArticle)
  const currentUser = useAppSelector((state: RootState) => state.auth.user)
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArticleData(sign, isAuthenticated))
    return () => {
      dispatch(clearCurrentArticle())
    }
  }, [])

  function formatDate(dateString: string) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const dateParts = dateString.split('-')
    const month = months[parseInt(dateParts[1], 10) - 1]
    const day = parseInt(dateParts[2], 10)
    const year = parseInt(dateParts[0], 10)

    return `${month} ${day}, ${year}`
  }

  if (!currentArticle)
    return (
      <Flex style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Spin />
      </Flex>
    )

  const { slug, description, title, createdAt, author, favoritesCount, tagList, body } = currentArticle
  const { username, image } = author
  const tags = tagList.map((tag: string, index: number) => {
    const tadKey = `${slug}-${tag}${index}`
    return (
      <Text key={tadKey} keyboard>
        {tag}
      </Text>
    )
  })
  const showAdditionalButtons = currentUser?.username === username

  return (
    <Flex className={`${styles.post} ${styles['post-view']}`} vertical>
      <Flex className={styles.post__header} justify="space-between" align="center">
        <div className={styles.post__general}>
          <Flex>
            <div className={styles.post__title}>{title}</div>
            <div className={styles.post__likes}>{`${favoritesCount} likes`}</div>
          </Flex>
          <div className={styles.post__tags}>{tags}</div>
        </div>
        <Flex className={styles.post__author}>
          <Flex vertical>
            <div className={styles.author__name}>{username}</div>
            <div className={styles.post__date}>{formatDate(createdAt)}</div>
          </Flex>
          <img src={image} className={styles.author__pic} alt="profile icon" />
        </Flex>
      </Flex>
      <Flex>
        <div className={styles.post__description}>{description}</div>
        {showAdditionalButtons && (
          <>
            <Button className={styles['green-btn']}>
              <NavLink to={`${ARTICLES_ROUTE}/${slug}/edit`}>Edit</NavLink>
            </Button>
            <Button danger>Delete</Button>
          </>
        )}
      </Flex>

      <Markdown>{body}</Markdown>
    </Flex>
  )
}

export default PostView
