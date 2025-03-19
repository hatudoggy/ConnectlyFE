import { z } from 'zod'

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(150, 'Content has a limit of 150 characters'),
  mediaFiles: z.instanceof(File).array().default([]),
  commentType: z.enum(['text', 'image']).default('text'),
})
