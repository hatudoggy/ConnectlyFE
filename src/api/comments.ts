import { APIResponse, PaginatedData } from '@interfaces/API'
import { Comment, CreateCommentFormData } from '@interfaces/Comment'
import { apiClient } from './client'
import { Post } from '@interfaces/Post'

export const getCommentsApi = async (
  postId: Post['id'],
  page: number | undefined,
): APIResponse<PaginatedData<Comment>> => {
  const res = await apiClient.get(
    `/posts/${postId}/comments${page ? `?page=${page}` : ''}`,
  )

  return res.data
}

export const createCommentApi = async (
  form: CreateCommentFormData & { postId: Post['id'] },
): APIResponse<Comment> => {
  const formData = new FormData()
  formData.append('content', form.content)
  formData.append('comment_type', form.commentType)

  form.mediaFiles.forEach((file) => {
    formData.append('media_files', file)
  })

  console.log('FORM DATA:', formData.values().toArray())

  const res = await apiClient.post(`/posts/${form.postId}/comments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}
