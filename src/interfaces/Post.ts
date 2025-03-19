import { z } from 'zod'
import { Media } from './Media'
import { UserBasic } from './User'
import { createPostSchema } from '@/schema/postSchema'
import { Comment } from './Comment'

export type PostContentType = 'text' | 'image' | 'video'

export interface Post {
  id: number
  post_type: PostContentType
  content: string
  media?: Media[]
  author: UserBasic
  comments?: Comment[]
  created_at: string
  is_liked: boolean
  like_count: number
  comment_count: number
}

// ===================================================
// Form Data
// ===================================================

export type CreatePostFormData = z.infer<typeof createPostSchema>

// ===================================================
// Response
// ===================================================

export interface PostLikeResponse {
  message: string
  like_count?: number
}
