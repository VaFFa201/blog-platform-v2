/* eslint-disable default-param-last */
/* eslint-disable indent */

import { PostsAction, PostsState } from '../types/posts.ts'

const initialState: PostsState = {
  pageData: [],
  pageNumber: 1,
  totalArticles: 0,
  error: '',
  currentArticle: null,
  isLoading: false,
}

const postsReducer = (state: PostsState = initialState, action: PostsAction): PostsState => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      }

    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        pageData: [...action.payload.articles],
        totalArticles: action.payload.articlesCount,
      }

    case 'HANDLE_PAGE_CHANGE':
      return {
        ...state,
        pageNumber: action.payload,
      }

    case 'FETCH_ARTICLE_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        currentArticle: action.payload.article,
      }
    case 'CLEAR_CURRENT_ARTICLE':
      return {
        ...state,
        currentArticle: null,
      }

    case 'POST_ARTICLE_SUCCESS':
      return {
        ...state,
      }

    case 'POST_ARTICLE_FAILURE':
      return {
        ...state,
        error: action.payload.message,
      }

    case 'UPDATE_ARTICLE_SUCCESS':
      return {
        ...state,
      }

    case 'UPDATE_ARTICLE_FAILURE':
      return {
        ...state,
        error: action.payload.message,
      }
    case 'MAKE_POST_FAVORITE_SUCCESS':
      return {
        ...state,
      }

    default:
      return state
  }
}

export default postsReducer
