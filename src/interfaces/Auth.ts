import { loginSchema } from '@/schema/authSchema'
import { z } from 'zod'
import { User } from './User'

// ===================================================
// Form Data
// ===================================================

export type LoginFormData = z.infer<typeof loginSchema>

// ===================================================
// Response
// ===================================================

export interface TokenResponse {
  access: string
  refresh: string
}

export interface LoginResponse extends TokenResponse {
  user: User
}
