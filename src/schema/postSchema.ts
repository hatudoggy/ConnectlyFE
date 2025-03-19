import { z } from 'zod'

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(150, 'Content has a limit of 150 characters'),
  mediaFiles: z.instanceof(File).array().default([]),
  postType: z.enum(['text', 'image', 'video']).default('text'),
})
