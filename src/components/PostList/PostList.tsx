import React from 'react'
import { Flex, Pagination } from 'antd'

import PostCard from '../PostCard'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/hooks.ts'
import { fetchDataOnPage } from '../../actions/fetchDataActions.ts'
import { Post } from '../../types/posts.ts'

import styles from './PostList.module.scss'

const PostList: React.FC = () => {
  const dispatch = useAppDispatch()

  const data = useAppSelector((state) => state.posts.pageData)
  const page = useAppSelector((state) => state.posts.pageNumber)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const articlesCount = useAppSelector((state) => state.posts.totalArticles)

  const postCards = data.map((item: Post) => {
    const itemKey = `${item.author.username}${item.createdAt}${item.title}`

    return <PostCard key={itemKey} item={item} />
  })

  return (
    <Flex vertical className={styles.postList}>
      {postCards}
      <Pagination
        style={{ alignSelf: 'center', margin: '0 auto', marginTop: '15px', paddingBottom: '25px' }}
        total={articlesCount}
        current={page}
        showSizeChanger={false}
        pageSize={20}
        onChange={(pageNum) => {
          dispatch(fetchDataOnPage(pageNum, isAuthenticated))
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    </Flex>
  )
}

export default PostList

// import React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { Flex } from 'antd-mobile';
// import Pagination from 'rc-pagination';
// import { fetchDataActions } from './actions';
// import { PageData } from './types';
// import styles from './PostList.module.scss';

// interface Props {
//   fetchDataOnPage: (page: number) => void;
// }

// function PostList({ fetchDataOnPage }: Props) {
//   const dispatch = useDispatch();
//   const data = useSelector((state: any) => state.posts.pageData) as PageData[];
//   const page = useSelector((state: any) => state.posts.pageNumber);
//   const articlesCount = useSelector((state: any) => state.posts.totalArticles);

//   const postCards = data.map((item: PageData) => {
//     const itemKey = ${item.author.username}${item.createdAt}${item.title};

//     return <PostCard key={itemKey} item={item} />;
//   });

//   return (
//     <Flex vertical className={styles.postList}>
//       {postCards}
//       <Pagination
//         style={{ alignSelf: 'center', margin: '0 auto', marginTop: '15px', paddingBottom: '25px' }}
//         total={articlesCount}
//         current={page}
//         showSizeChanger={false}
//         pageSize={20}
//         onChange={(pageNum) => {
//           fetchDataOnPage(pageNum);
//           window.scrollTo({ top: 0, behavior: 'smooth' });
//         }}
//       />
//     </Flex>
//   );
// }

// const mapDispatchToProps = (dispatch: any) => {
//   return bindActionCreators(fetchDataActions, dispatch);
// };

// export default connect(null, mapDispatchToProps)(PostList);
