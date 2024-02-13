/* eslint-disable import/extensions */
import { API_URL_BASE } from '../utils/consts.ts'
import { $authHost, $host } from '../http/index.ts'
import { Article, Error, Articles, ArticleToSend, Post } from '../types/posts.ts'
import { AppDispatch } from '../stores/store.ts'

export const fetchDataRequest = () => {
  return {
    type: 'FETCH_DATA_REQUEST',
  }
}

export const fetchDataSuccess = (data: Articles) => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
  }
}

export const fetchDataFailure = (error: Error) => {
  return {
    type: 'FETCH_DATA_FAILURE',
    payload: error,
  }
}

export const fetchArticleDataSuccess = (data: Article) => {
  return {
    type: 'FETCH_ARTICLE_DATA_SUCCESS',
    payload: data,
  }
}

export const handlePageChange = (pageNum: number) => {
  return {
    type: 'HANDLE_PAGE_CHANGE',
    payload: pageNum,
  }
}

export const clearCurrentArticle = () => {
  return {
    type: 'CLEAR_CURRENT_ARTICLE',
  }
}

export const postArticleSuccess = () => {
  return {
    type: 'POST_ARTICLE_SUCCESS',
  }
}

export const postArticleFailure = (error: Error) => {
  return {
    type: 'POST_ARTICLE_FAILURE',
    payload: error,
  }
}
export const updateArticleSuccess = () => {
  return {
    type: 'UPDATE_ARTICLE_SUCCESS',
  }
}

export const updateArticleFailure = (error: Error) => {
  return {
    type: 'UPDATE_ARTICLE_FAILURE',
    payload: error,
  }
}

export const makePostFavoriteSuccess = (obj: any) => {
  return {
    type: 'MAKE_POST_FAVORITE_SUCCESS',
    payload: obj,
  }
}

export const makePostFavoriteFailure = (error: Error) => {
  return {
    type: 'MAKE_POST_FAVORITE',
    payload: error,
  }
}

export const fetchData = (isAuth: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDataRequest())
    try {
      let response
      if (isAuth) {
        response = await $authHost.get(`${API_URL_BASE}/articles`)
      } else {
        response = await $host.get(`${API_URL_BASE}/articles`)
      }

      const body = response.data

      dispatch(fetchDataSuccess(body))

      return body
    } catch (error: any) {
      dispatch(fetchDataFailure(error))
    }
  }
}

export const fetchDataOnPage = (pageNum: number, isAuth: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(handlePageChange(pageNum))
    dispatch(fetchDataRequest())
    try {
      let response

      if (isAuth) {
        response = await $authHost.get(`${API_URL_BASE}/articles?offset=${(pageNum - 1) * 20}`)
      } else {
        response = await $host.get(`${API_URL_BASE}/articles?offset=${(pageNum - 1) * 20}`)
      }
      const body = response.data

      dispatch(fetchDataSuccess(body))

      return body
    } catch (error: any) {
      dispatch(fetchDataFailure(error))
    }
  }
}

export const fetchArticleData = (slug: string, isAuth: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDataRequest())
    try {
      let response
      if (isAuth) {
        response = await $authHost.get(`${API_URL_BASE}/articles/${slug}`)
      } else {
        response = await $host.get(`${API_URL_BASE}/articles/${slug}`)
      }
      // const response = await $host.get(`${API_URL_BASE}/articles/${slug}`)
      const body = response.data

      dispatch(fetchArticleDataSuccess(body))

      return body
    } catch (error: any) {
      dispatch(fetchDataFailure(error))
    }
  }
}

export const postNewArticle = (article: ArticleToSend) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDataRequest())
    try {
      const response = await $authHost.post(`${API_URL_BASE}/articles`, article)
      const body = response.data

      dispatch(postArticleSuccess())
      console.log(body)

      return body
    } catch (error: any) {
      dispatch(postArticleFailure(error))
    }
  }
}

export const updateArticle = (article: ArticleToSend, slug: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDataRequest())
    try {
      const response = await $authHost.put(`${API_URL_BASE}/articles/${slug}`, article)
      const body = response.data

      dispatch(updateArticleSuccess())
      console.log(body)

      return body
    } catch (error: any) {
      dispatch(updateArticleFailure(error))
    }
  }
}

export const makePostFavorite = (slug: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDataRequest())
    try {
      const response = await $authHost.post(`${API_URL_BASE}/articles/${slug}/favorite`)
      const body = response.data

      makePostFavoriteSuccess(body)

      console.log(body)

      return body
    } catch (error: any) {
      dispatch(makePostFavoriteFailure(error))
    }
  }
}

export const makePostUnfavorite = (slug: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDataRequest())
    try {
      const response = await $authHost.delete(`${API_URL_BASE}/articles/${slug}/favorite`)
      const body = response.data

      console.log(body)

      return body
    } catch (error: any) {
      dispatch(makePostFavoriteFailure(error))
    }
  }
}
