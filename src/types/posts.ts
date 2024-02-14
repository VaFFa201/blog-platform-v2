export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'
export const HANDLE_PAGE_CHANGE = 'HANDLE_PAGE_CHANGE'
export const FETCH_ARTICLE_DATA_SUCCESS = 'FETCH_ARTICLE_DATA_SUCCESS'
export const CLEAR_CURRENT_ARTICLE = 'CLEAR_CURRENT_ARTICLE'
export const POST_ARTICLE_SUCCESS = 'POST_ARTICLE_SUCCESS'
export const POST_ARTICLE_FAILURE = 'POST_ARTICLE_FAILURE'
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS'
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE'
export const MAKE_POST_FAVORITE_SUCCESS = 'MAKE_POST_FAVORITE_SUCCESS'
export const MAKE_POST_UNFAVORITE_SUCCESS = 'MAKE_POST_UNFAVORITE_SUCCESS'

export interface Post {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export interface PostsState {
  pageData: Post[]
  pageNumber: number
  totalArticles: number
  error: string
  currentArticle: Post | null
  isLoading: boolean
}

export interface Articles {
  articles: Post[]
  articlesCount: number
}

export interface Article {
  article: Post
}

export interface ArticleToSend {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}

export interface Error {
  message: string
  name: string
  stack: string
}

interface PostsFetchDataRequest {
  type: typeof FETCH_DATA_REQUEST
}

interface PostsFetchDataSuccess {
  type: typeof FETCH_DATA_SUCCESS
  payload: Articles
}

interface PostsFetchDataFailure {
  type: typeof FETCH_DATA_FAILURE
  payload: Error
}

interface PostsHandlePageChange {
  type: typeof HANDLE_PAGE_CHANGE
  payload: number
}

interface PostsFetchArticleDataSuccess {
  type: typeof FETCH_ARTICLE_DATA_SUCCESS
  payload: Article
}

interface PostsClearCurrentArticle {
  type: typeof CLEAR_CURRENT_ARTICLE
}

interface PostArticleSuccess {
  type: typeof POST_ARTICLE_SUCCESS
}

interface PostArticleFailure {
  type: typeof POST_ARTICLE_FAILURE
  payload: Error
}

interface UpdateArticleSuccess {
  type: typeof UPDATE_ARTICLE_SUCCESS
}

interface UpdateArticleFailure {
  type: typeof UPDATE_ARTICLE_FAILURE
  payload: Error
}

interface MakePostFavourite {
  type: typeof MAKE_POST_FAVORITE_SUCCESS
  payload: string
}
interface MakePostUnfavourite {
  type: typeof MAKE_POST_UNFAVORITE_SUCCESS
  payload: string
}

export type PostsAction =
  | PostsFetchDataRequest
  | PostsFetchDataSuccess
  | PostsFetchDataFailure
  | PostsHandlePageChange
  | PostsFetchArticleDataSuccess
  | PostsClearCurrentArticle
  | PostArticleSuccess
  | PostArticleFailure
  | UpdateArticleSuccess
  | UpdateArticleFailure
  | MakePostFavourite
  | MakePostUnfavourite
