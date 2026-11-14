export interface IResponse<T> {
  status: number
  message: string
  errors: string[] | null
  data: T
}

export interface IResponseSpecification<T> {
  page: number
  size: number
  totalPages: number
  totalItems: number
  items: T[]
}
