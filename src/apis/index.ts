import axios, { type InternalAxiosRequestConfig } from 'axios'

import configs from '@/configs'
import type { IResponse } from '@/interfaces'
import type { IAuthRefreshTokenResponse } from '@/interfaces/auth'
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from '@/utils/auth'

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    // Set on a request replayed after a token refresh, so a second 401 is not retried again
    _retried?: boolean
  }
}

const REFRESH_TOKEN_URL = 'v1/admin/auth/refresh-token'

const axiosApi = axios.create({
  baseURL: configs.API_BASE_URL,
})

axiosApi.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

// Requests that fail together share one refresh call
let refreshing: Promise<string> | null = null

function refreshAccessToken() {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  if (!accessToken || !refreshToken) {
    return Promise.reject(new Error('No token to refresh'))
  }

  refreshing ??= axios
    .post<IResponse<IAuthRefreshTokenResponse>>(
      REFRESH_TOKEN_URL,
      { accessToken, refreshToken },
      { baseURL: configs.API_BASE_URL },
    )
    .then((response) => {
      const newAccessToken = response.data.data.accessToken
      saveTokens(newAccessToken)
      return newAccessToken
    })
    .finally(() => {
      refreshing = null
    })
  return refreshing
}

axiosApi.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const config: InternalAxiosRequestConfig | undefined = error.config
    // The access token lives 1 hour: on 401, refresh it once and replay the request
    if (error.response?.status !== 401 || !config || config._retried) {
      return Promise.reject(error)
    }
    config._retried = true

    try {
      const accessToken = await refreshAccessToken()
      config.headers.Authorization = 'Bearer ' + accessToken
      return axiosApi(config)
    } catch {
      clearTokens()
      return Promise.reject(error)
    }
  },
)

export default axiosApi
