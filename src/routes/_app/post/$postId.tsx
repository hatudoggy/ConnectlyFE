import { commentsQueryOptions } from '@/api/queries/comments'
import { postQueryOptions, usePostMutation } from '@/api/queries/posts'
import { loggedUserQueryOptions } from '@/api/queries/user'
import CommentItem from '@/components/CommentItem'
import CommentTextArea from '@/components/CommentTextArea'
import ListVirtualizer from '@/components/ListVirtualizer'
import PostItem from '@/components/PostItem'
import { createCommentSchema } from '@/schema/commentSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowBack } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import {
  useSuspenseInfiniteQuery,
  useSuspenseQueries,
} from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { enqueueSnackbar } from 'notistack'
import { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/_app/post/$postId')({
  loader: ({ context: { queryClient }, params }) => {
    queryClient.ensureQueryData(loggedUserQueryOptions())
    queryClient.ensureQueryData(postQueryOptions(Number(params.postId)))
    queryClient.ensureInfiniteQueryData(
      commentsQueryOptions(Number(params.postId)),
    )
  },
  component: Post,
})

function Post() {
  const theme = useTheme()

  const { postId } = Route.useParams()
  const router = useRouter()

  const { control, watch, setValue, handleSubmit, reset } = useForm({
    resolver: zodResolver(createCommentSchema),
  })

  const [postQuery, userQuery] = useSuspenseQueries({
    queries: [postQueryOptions(Number(postId)), loggedUserQueryOptions()],
  })

  const commentsQuery = useSuspenseInfiniteQuery(
    commentsQueryOptions(Number(postId)),
  )

  const post = postQuery.data
  const user = userQuery.data
  const comments = commentsQuery.data
    ? commentsQuery.data.pages.flatMap((group) => group.results)
    : []

  const { createCommentMutation, likePostMutation } = usePostMutation({
    createComment: {
      onSettled: () => {
        reset()
        enqueueSnackbar('Comment created', { variant: 'success' })
      },
    },
  })

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        position="sticky"
        top={0}
        bgcolor={theme.palette.background.default}
        zIndex={10}
        py={2}
      >
        <IconButton onClick={() => router.history.back()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" fontWeight={700}>
          Post
        </Typography>
      </Stack>
      <Suspense>
        <PostItem
          variant="full"
          author={{
            id: post.author.id,
            picUrl: '',
            username: post.author.username,
            displayName: `${post.author.first_name} ${post.author.last_name}`,
          }}
          user={{
            id: user.id,
            picUrl: '',
            username: user.username,
            displayName: `${user.first_name} ${user.last_name}`,
          }}
          content={post.content}
          media={post.media}
          contentType={post.post_type}
          likeCount={post.like_count}
          liked={post.is_liked}
          commentCount={post.comment_count}
          postDate={new Date(post.created_at)}
          onLikeClick={() =>
            likePostMutation.mutate({
              postId: post.id,
              isLiked: post.is_liked,
            })
          }
        />
      </Suspense>

      <Box my={2}>
        <form
          onSubmit={handleSubmit((data) => {
            createCommentMutation.mutate({
              ...data,
              postId: Number(postId),
            })
          })}
          noValidate
        >
          <CommentTextArea
            control={control}
            watch={watch}
            setValue={setValue}
            onCommenting={createCommentMutation.isPending}
          />
        </form>
      </Box>

      <ListVirtualizer
        hasNextPage={commentsQuery.hasNextPage}
        listLength={comments.length}
        isFetchingNextPage={commentsQuery.isFetchingNextPage}
        fetchNextPage={() => commentsQuery.fetchNextPage()}
      >
        {(virtualItem) => {
          const comment = comments[virtualItem.index]

          return (
            <Box mb={1}>
              <CommentItem
                author={{
                  id: comment.author.id,
                  picUrl: '',
                  displayName: `${comment.author.first_name} ${comment.author.last_name}`,
                  username: comment.author.username,
                }}
                content={comment.content}
                contentType={comment.comment_type}
                likeCount={comment.like_count}
                liked={comment.is_liked}
                commentDate={new Date(comment.created_at)}
              />
            </Box>
          )
        }}
      </ListVirtualizer>

      <Box height={20}></Box>
    </Stack>
  )
}
