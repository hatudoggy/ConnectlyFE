import {
  InfiniteData,
  infiniteQueryOptions,
  QueryKey,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { createPostApi, getFeedApi, getPostApi, likePostApi } from '../posts'
import { PaginatedData } from '@interfaces/API'
import { Post } from '@interfaces/Post'
import { createCommentApi } from '../comments'

export const feedQueryKey: QueryKey = ['posts']

export const feedQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: feedQueryKey,
    queryFn: ({ pageParam }) => getFeedApi(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.next) return undefined
      return lastPageParam ? lastPageParam + 1 : 2
    },
    staleTime: 300000,
  })

export const postQueryKey = (postId: Post['id']): QueryKey => [
  ...feedQueryKey,
  postId,
]

export const postQueryOptions = (postId: Post['id']) =>
  queryOptions({
    queryKey: postQueryKey(postId),
    queryFn: () => getPostApi(postId),
  })

interface FeedMutationParams {
  createPost: {
    onSettled: () => void
  }
}

export const useFeedMutation = ({ createPost }: FeedMutationParams) => {
  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: createPostApi,
    onSettled: async () => {
      createPost.onSettled()
      return await queryClient.invalidateQueries({ queryKey: feedQueryKey })
    },
  })

  const likePostMutation = useMutation({
    mutationFn: likePostApi,
    onMutate: async (likedPost) => {
      await queryClient.cancelQueries({ queryKey: feedQueryKey })

      const posts =
        queryClient.getQueryData<InfiniteData<PaginatedData<Post>, unknown>>(
          feedQueryKey,
        )

      if (posts)
        queryClient.setQueryData<InfiniteData<PaginatedData<Post>, unknown>>(
          feedQueryKey,
          {
            ...posts,
            pages: posts.pages.map((page) => ({
              ...page,
              results: page.results.map((post) =>
                post.id === likedPost.postId
                  ? {
                      ...post,
                      is_liked: !post.is_liked,
                      like_count: post.is_liked
                        ? post.like_count - 1
                        : post.like_count + 1,
                    }
                  : post,
              ),
            })),
          },
        )

      return { posts }
    },
    onError: (_err, _likedPost, context) => {
      if (context) queryClient.setQueryData(feedQueryKey, context.posts)
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: feedQueryKey,
      })
    },
  })

  return {
    createPostMutation,
    likePostMutation,
  }
}

interface PostMutationParams {
  createComment: {
    onSettled: () => void
  }
}

export const usePostMutation = ({ createComment }: PostMutationParams) => {
  const queryClient = useQueryClient()

  const createCommentMutation = useMutation({
    mutationFn: createCommentApi,
    onSettled: async () => {
      createComment.onSettled()
      return await queryClient.invalidateQueries({ queryKey: feedQueryKey })
    },
  })

  const likePostMutation = useMutation({
    mutationFn: likePostApi,
    onMutate: async (likedPost) => {
      const postQK = postQueryKey(likedPost.postId)

      await queryClient.cancelQueries({ queryKey: postQK })

      const post = queryClient.getQueryData<Post>(postQK)

      if (post)
        queryClient.setQueryData<Post>(postQK, {
          ...post,
          is_liked: !post.is_liked,
          like_count: post.is_liked ? post.like_count - 1 : post.like_count + 1,
        })

      return { post }
    },
    onError: (_err, likedPost, context) => {
      if (context)
        queryClient.setQueryData(postQueryKey(likedPost.postId), context.post)
    },
    onSettled: async (_res, _err, likedPost) => {
      return await queryClient.invalidateQueries({
        queryKey: postQueryKey(likedPost.postId),
      })
    },
  })

  return {
    createCommentMutation,
    likePostMutation,
  }
}
