import { loggedUserQueryOptions } from '@api/queries/user'
import { createPostSchema } from '@schema/postSchema'
import { feedQueryOptions, useFeedMutation } from '@api/queries/posts'
import PostItem from '@components/PostItem'
import PostTextArea from '@components/PostTextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, CircularProgress, Stack } from '@mui/material'
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import ListVirtualizer from '@/components/ListVirtualizer'

export const Route = createFileRoute('/_app/feed/')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureInfiniteQueryData(feedQueryOptions())
    queryClient.ensureQueryData(loggedUserQueryOptions())
  },
  component: Feed,
})

function Feed() {
  const { enqueueSnackbar } = useSnackbar()

  const { control, watch, setValue, handleSubmit, reset } = useForm({
    resolver: zodResolver(createPostSchema),
  })

  const userQuery = useSuspenseQuery(loggedUserQueryOptions())

  const feedQuery = useSuspenseInfiniteQuery(feedQueryOptions())

  const feed = feedQuery.data
    ? feedQuery.data.pages.flatMap((group) => group.results)
    : []
  const user = userQuery.data

  const { createPostMutation, likePostMutation } = useFeedMutation({
    createPost: {
      onSettled: () => {
        reset()
        enqueueSnackbar('Post created', { variant: 'success' })
      },
    },
  })

  return (
    <Stack gap={3} pt={4}>
      <form
        onSubmit={handleSubmit((data) => {
          createPostMutation.mutate(data)
        })}
        noValidate
      >
        <PostTextArea
          control={control}
          watch={watch}
          setValue={setValue}
          onPosting={createPostMutation.isPending}
        />
      </form>

      <ListVirtualizer
        hasNextPage={feedQuery.hasNextPage}
        listLength={feed.length}
        isFetchingNextPage={feedQuery.isFetchingNextPage}
        fetchNextPage={() => feedQuery.fetchNextPage()}
        scrollRestore
        fallback={<CircularProgress />}
      >
        {(virtualItem) => {
          const post = feed[virtualItem.index]

          return (
            <Box mb={2}>
              <PostItem
                author={{
                  id: post.author.id,
                  picUrl: '',
                  displayName: `${post.author.first_name} ${post.author.last_name}`,
                  username: post.author.username,
                }}
                user={{
                  id: user.id,
                  username: user.username,
                  displayName: `${user.first_name} ${user.last_name}`,
                  picUrl: '',
                }}
                contentType={post.post_type}
                content={post.content}
                media={post.media}
                likeCount={post.like_count}
                liked={post.is_liked}
                commentCount={post.comment_count}
                comments={post.comments}
                postDate={new Date(post.created_at)}
                postLink={{
                  to: '/post/$postId',
                  params: { postId: post.id.toString() },
                }}
                commentLink={{
                  to: '/post/$postId',
                  params: { postId: post.id.toString() },
                }}
                onLikeClick={() =>
                  likePostMutation.mutate({
                    postId: post.id,
                    isLiked: post.is_liked,
                  })
                }
              />
            </Box>
          )
        }}
      </ListVirtualizer>

      {/* <Box height={20}></Box> */}
    </Stack>
  )
}
