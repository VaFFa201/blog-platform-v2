import React from 'react'
import { Button, Flex, Space, Typography } from 'antd'
import { NavLink } from 'react-router-dom'

import { ARTICLES_ROUTE } from '../../utils/consts.ts'
import { Post } from '../../types/posts.ts'
import { makePostFavorite } from '../../actions/fetchDataActions.ts'
import { useAppDispatch } from '../../hooks/hooks.ts'

import styles from './PostCard.module.scss'

const { Text } = Typography

interface Props {
  item: Post
}

const PostCard: React.FC<Props> = ({ item }) => {
  const { slug, description, title, createdAt, author, favoritesCount, tagList } = item
  const { username, image } = author
  const dispatch = useAppDispatch()

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

  function shortenText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text
    }

    if (text.indexOf(' ') === -1) {
      return `${text.slice(0, maxLength)}...`
    }

    const words = text.split(' ')
    let shortened = ''
    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      if (shortened.length + word.length + 1 <= maxLength) {
        shortened += `${word} `
      } else {
        shortened = `${shortened.trim()}...`
        break
      }
    }
    return shortened
  }

  const tags = tagList.map((tag, index) => {
    const tadKey = `${slug}-${tag}${index}`
    return (
      <Text key={tadKey} keyboard>
        {tag}
      </Text>
    )
  })
  const formatedDate = formatDate(createdAt)
  const shortedTitle = shortenText(title, 60)

  return (
    <Flex className={styles.post} vertical>
      <Flex className={styles.post__header} justify="space-between" align="center">
        <div className={styles.post__general}>
          <Space>
            <div className={styles.post__title}>
              <NavLink to={`${ARTICLES_ROUTE}/${slug}`}>{shortedTitle}</NavLink>
            </div>
            <div className={styles.post__likes}>
              <Button onClick={() => dispatch(makePostFavorite(slug))}>like</Button>
              {`${favoritesCount} likes`}
            </div>
          </Space>
          <div className={styles.post__tags}>{tags}</div>
        </div>
        <Flex className={styles.post__author}>
          <Flex vertical>
            <div className={styles.author__name}>{username}</div>
            <div className={styles.post__date}>{formatedDate}</div>
          </Flex>
          <img src={image} className={styles.author__pic} alt="profile icon" />
        </Flex>
      </Flex>
      <div className={styles.post__description}>{description}</div>
    </Flex>
  )
}

export default PostCard
