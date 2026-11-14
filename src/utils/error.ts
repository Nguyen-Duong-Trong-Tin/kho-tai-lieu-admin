import { isAxiosError } from 'axios'

import type { IResponse } from '@/interfaces'

// The API puts readable messages in `errors` (validation, wrong password, ...)
export function getApiErrorMessage(error: unknown, fallback = 'Có lỗi xảy ra, vui lòng thử lại') {
  if (!isAxiosError<IResponse<unknown>>(error)) {
    return fallback
  }
  if (!error.response) {
    return 'Không kết nối được máy chủ'
  }
  return error.response.data?.errors?.[0] ?? fallback
}

// 401/403: the saved token is no longer accepted
export function isAuthError(error: unknown) {
  const status = isAxiosError(error) ? error.response?.status : undefined
  return status === 401 || status === 403
}
