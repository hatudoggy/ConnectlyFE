import { infiniteQueryOptions, QueryKey } from '@tanstack/react-query'
import { getCommentsApi } from '../comments'
import { Post } from '@interfaces/Post'
import { postQueryKey } from './posts'

export const commentsQueryKey = (postId: Post['id']): QueryKey => [
  ...postQueryKey(postId),
  'comments',
]

export const commentsQueryOptions = (postId: Post['id']) =>
  infiniteQueryOptions({
    queryKey: commentsQueryKey(postId),
    queryFn: ({ pageParam }) => getCommentsApi(postId, pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.next) return undefined
      return lastPageParam ? lastPageParam + 1 : 2
    },
  })
