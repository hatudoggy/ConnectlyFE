export interface UserBasicDetails {
  id?: number
  picUrl: string
  displayName: string
  username: string
}

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
}

export interface UserBasic {
  id: number
  picUrl?: string
  username: string
  first_name: string
  last_name: string
}
