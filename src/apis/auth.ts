import type { IResponse } from '@/interfaces'
import type { IAuthLogin, IAuthLoginResponse } from '@/interfaces/auth'
import type { IUser } from '@/interfaces/users'

import axiosApi from '.'

export const loginAuthApi = async (payload: IAuthLogin) => {
  const response = await axiosApi.post('v1/admin/auth/login', payload)
  return response as unknown as IResponse<IAuthLoginResponse>
}

export const meAuthApi = async () => {
  const response = await axiosApi.post('v1/admin/auth/me')
  return response as unknown as IResponse<IUser>
}

export const logoutAuthApi = async () => {
  const response = await axiosApi.post('v1/admin/auth/logout')
  return response as unknown as IResponse<null>
}
