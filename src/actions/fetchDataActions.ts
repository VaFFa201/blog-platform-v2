/* eslint-disable import/extensions */
import { API_URL_BASE } from '../utils/consts.ts'
import { $host } from '../http/index.ts'
import { Article, Error, PostsAction, Articles } from '../types/posts.ts'
import { AppDispatch } from '../stores/store.ts'

export const fetchDataRequest = (): PostsAction => {
  return {
    type: 'FETCH_DATA_REQUEST',
  }
}

export const fetchDataSuccess = (data: Articles): PostsAction => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
  }
}

export const fetchArticleDataSuccess = (data: Article): PostsAction => {
  return {
    type: 'FETCH_ARTICLE_DATA_SUCCESS',
    payload: data,
  }
}

export const fetchDataFailure = (error: Error): PostsAction => {
  return {
    type: 'FETCH_DATA_FAILURE',
    payload: error,
  }
}

export const handlePageChange = (pageNum: number): PostsAction => {
  return {
    type: 'HANDLE_PAGE_CHANGE',
    payload: pageNum,
  }
}

export const clearCurrentArticle = (): PostsAction => {
  return {
    type: 'CLEAR_CURRENT_ARTICLE',
  }
}

export const fetchData = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDataRequest())
    try {
      const response = await $host.get(`${API_URL_BASE}/articles`)
      const body = response.data

      dispatch(fetchDataSuccess(body))

      return body
    } catch (error: any) {
      dispatch(fetchDataFailure(error))
    }
  }
}

export const fetchDataOnPage = (pageNum: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(handlePageChange(pageNum))
    dispatch(fetchDataRequest())
    try {
      const response = await $host.get(`${API_URL_BASE}/articles?offset=${(pageNum - 1) * 20}`)
      const body = response.data

      dispatch(fetchDataSuccess(body))

      return body
    } catch (error: any) {
      dispatch(fetchDataFailure(error))
    }
  }
}

export const fetchArticleData = (slug: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDataRequest())
    try {
      const response = await $host.get(`${API_URL_BASE}/articles/${slug}`)
      const body = response.data

      dispatch(fetchArticleDataSuccess(body))

      return body
    } catch (error: any) {
      dispatch(fetchDataFailure(error))
    }
  }
}
