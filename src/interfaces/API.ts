export type APIResponse<T> = Promise<T>

export interface PaginatedData<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
