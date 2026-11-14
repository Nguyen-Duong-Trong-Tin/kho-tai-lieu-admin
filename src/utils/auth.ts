import { deleteCookie, getCookie, setCookie } from '@/utils/cookie'

// Cookies are shared by every port of a host, so on localhost the client site (5182) sees this
// app's cookies too. Distinct names keep the two logins independent.
const ACCESS_TOKEN_COOKIE = 'adminAccessToken'
const REFRESH_TOKEN_COOKIE = 'adminRefreshToken'
// Same lifetime as the refresh token (JWT_EXPIRATION_MS_RF = 7 days)
const TOKEN_COOKIE_DAYS = 7

export const getAccessToken = () => getCookie(ACCESS_TOKEN_COOKIE)

export const getRefreshToken = () => getCookie(REFRESH_TOKEN_COOKIE)

export function saveTokens(accessToken: string, refreshToken?: string) {
  setCookie(ACCESS_TOKEN_COOKIE, accessToken, TOKEN_COOKIE_DAYS)
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_COOKIE, refreshToken, TOKEN_COOKIE_DAYS)
  }
}

export function clearTokens() {
  deleteCookie(ACCESS_TOKEN_COOKIE)
  deleteCookie(REFRESH_TOKEN_COOKIE)
}

// Only redirect inside this app: "/users" is fine, "//other-site.com" is not
export function safeRedirect(redirect: unknown, fallback = '/') {
  return typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')
    ? redirect
    : fallback
}
