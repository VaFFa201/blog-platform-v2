/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

import { API_URL_BASE } from '../shared/utils/consts.ts'

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

const $host = axios.create({
  baseURL: API_URL_BASE,
})

const $authHost = axios.create({
  baseURL: API_URL_BASE,
})

const authInterceptor = (config: AdaptAxiosRequestConfig): AdaptAxiosRequestConfig => {
  config.headers = config.headers ?? {}

  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
