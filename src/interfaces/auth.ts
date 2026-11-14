import type { IUser } from './users'

export interface IAuthLogin {
  email: string
  password: string
}

export interface IAuthLoginResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}

export interface IAuthRefreshTokenResponse {
  accessToken: string
}
