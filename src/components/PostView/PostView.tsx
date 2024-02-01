/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Flex, Space, Spin, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import Markdown from 'react-markdown'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts'
import { clearCurrentArticle, fetchArticleData } from '../../actions/fetchDataActions.ts'

import styles from './PostView.module.scss'

const { Text } = Typography

type PostViewParams = {
  sign: any
}

const PostView: React.FC = () => {
  const { sign } = useParams<PostViewParams>()
  const currentArticle = useAppSelector((state) => state.posts.currentArticle)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearCurrentArticle())
    dispatch(fetchArticleData(sign))
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

  return (
    <Flex className={`${styles.post} ${styles['post-view']}`} vertical>
      <Flex className={styles.post__header} justify="space-between" align="center">
        <div className={styles.post__general}>
          <Space>
            <div className={styles.post__title}>{title}</div>
            <div className={styles.post__likes}>{`${favoritesCount} likes`}</div>
          </Space>
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
      <div className={styles.post__description}>{description}</div>
      <Markdown>{body}</Markdown>
    </Flex>
  )
}

export default PostView

// import React, { useEffect } from 'react'
// import { Flex, Space, Spin, Typography } from 'antd'
// import { useParams } from 'react-router-dom'
// import { connect, useDispatch } from 'react-redux'
// import { bindActionCreators, Dispatch } from 'redux'
// import Markdown from 'react-markdown'

// import * as fetchDataActions from '../../actions/fetchDataActions'
// import { RootState } from '../../reducers/rootReducer'
// import { Article } from '../../types'

// import styles from './PostView.module.scss'

// const { Text } = Typography

// interface PostViewProps {
//   currentArticle: Article | null;
//   fetchArticleData: (slug: string) => void;
//   clearCurrentArticle: () => void;
// }

// function PostView({ currentArticle, fetchArticleData, clearCurrentArticle }: PostViewProps): JSX.Element {
//   const params = useParams<{ sign: string }>()
//   const dispatch: Dispatch<any> = useDispatch()

//   useEffect(() => {
//     fetchArticleData(params.sign)
//   }, [])

//   function formatDate(dateString: string): string {
//     const months: string[] = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ]

//     const dateParts: string[] = dateString.split('-')
//     const month: string = months[parseInt(dateParts[1], 10) - 1]
//     const day: number = parseInt(dateParts[2], 10)
//     const year: number = parseInt(dateParts[0], 10)

//     return ${month} ${day}, ${year}
//   }

//   if (!currentArticle)
//     return (
//       <Flex style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
//         <Spin />
//       </Flex>
//     )

//   const { slug, description, title, createdAt, author, favoritesCount, tagList, body } = currentArticle
//   const { username, image } = author
//   const tags = tagList.map((tag: string, index: number) => {
//     const tadKey: string = ${slug}-${tag}${index}
//     return (
//       <Text key={tadKey} keyboard>
//         {tag}
//       </Text>
//     )
//   })

//   return (
//     <Flex className={${styles.post} ${styles['post-view']}} vertical>
//       <Flex className={styles.post__header} justify="space-between" align="center">
//         <div className={styles.post__general}>
//           <Space>
//             <div className={styles.post__title}>{title}</div>
//             <div className={styles.post__likes}>{${favoritesCount} likes}</div>
//           </Space>
//           <div className={styles.post__tags}>{tags}</div>
//         </div>
//         <Flex className={styles.post__author}>
//           <Flex vertical>
//             <div className={styles.author__name}>{username}</div>
//             <div className={styles.post__date}>{formatDate(createdAt)}</div>
//           </Flex>
//           <img src={image} className={styles.author__pic} alt="profile icon" />
//         </Flex>
//       </Flex>
//       <div className={styles.post__description}>{description}</div>
//       <Markdown>{body}</Markdown>
//     </Flex>
//   )
// }

// const mapStateToProps = (state: RootState) => ({
//   currentArticle: state.posts.currentArticle,
// })

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return bindActionCreators(fetchDataActions, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(PostView)