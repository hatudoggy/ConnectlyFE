import { createCommentSchema } from '@/schema/commentSchema'
import { z } from 'zod'
import { Post } from './Post'
import { Media } from './Media'
import { UserBasic } from './User'

export type CommentContentType = 'text' | 'image'

export interface Comment {
  id: number
  post: Post['id']
  comment_type: CommentContentType
  content: string
  media?: Media[]
  author: UserBasic
  created_at: string
  is_liked: boolean
  like_count: number
  // comment_count: number
}

// ===================================================
// Form Data
// ===================================================

export type CreateCommentFormData = z.infer<typeof createCommentSchema>
