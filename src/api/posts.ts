import { APIResponse, PaginatedData } from '@interfaces/API'
import { CreatePostFormData, Post, PostLikeResponse } from '@interfaces/Post'
import { apiClient } from './client'

export const getFeedApi = async (
  page: number | undefined,
): APIResponse<PaginatedData<Post>> => {
  const res = await apiClient.get(
    `/profiles/feed/${page ? `?page=${page}` : ''}`,
  )

  return res.data
}

export const createPostApi = async (
  form: CreatePostFormData,
): APIResponse<Post> => {
  const formData = new FormData()
  formData.append('content', form.content)
  formData.append('post_type', form.postType)

  form.mediaFiles.forEach((file) => {
    formData.append('media_files', file)
  })

  console.log('FORM DATA:', formData.values().toArray())

  const res = await apiClient.post('/posts/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

export const getPostApi = async (postId: Post['id']): APIResponse<Post> => {
  const res = await apiClient.get(`/posts/${postId}/`)

  return res.data
}

export const likePostApi = async ({
  postId,
  isLiked,
}: {
  postId: Post['id']
  isLiked: Post['is_liked']
}): APIResponse<PostLikeResponse> => {
  if (isLiked) {
    const res = await apiClient.delete(`/posts/${postId}/like`)
    return res.data
  } else {
    const res = await apiClient.post(`/posts/${postId}/like`)
    return res.data
  }
}
