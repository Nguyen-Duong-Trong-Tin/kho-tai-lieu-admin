export type UserRole = 'ADMIN' | 'USER'

export interface IUser {
  id: number
  fullName: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}
