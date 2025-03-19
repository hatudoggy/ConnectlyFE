import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { PostItemProps } from '@interfaces/ComponentProps'
import {
  ArrowDropDown,
  CommentOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from '@mui/icons-material'
import CommentItem from './CommentItem'
import PostMedia from './PostMedia'
import { Link } from '@tanstack/react-router'

/** This component is for Post */
export default function PostItem({
  linkOn = true,
  variant = 'preview',
  ...props
}: PostItemProps) {
  return (
    <Box>
      <Card
        sx={{
          maxWidth: 'md',
        }}
      >
        <CardContent>
          <Stack gap={1.5}>
            <CardActionArea
              {...props.postLink}
              component={linkOn ? Link : 'div'}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  background: 'transparent',
                },
                cursor: variant === 'full' ? 'default' : 'pointer',
              }}
              disableRipple
              resetScroll
            >
              <Stack gap={1} pb={1}>
                <Stack direction="row" gap={2}>
                  <Avatar src={props.author.picUrl}>
                    {props.author.displayName[0]}
                  </Avatar>
                  <Stack>
                    <Typography fontWeight={700}>
                      {props.author.displayName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'GrayText' }}>
                      {props.author.username}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack px={1} pt={1} gap={1.5}>
                  <Typography>{props.content}</Typography>
                  {props.media && props.media.length > 0 && (
                    <PostMedia
                      mediaType={
                        props.contentType === 'text'
                          ? 'image'
                          : props.contentType
                      }
                      media={props.media}
                    />
                  )}
                </Stack>
              </Stack>
            </CardActionArea>

            <Divider />

            <Stack direction="row">
              <Button
                variant="text"
                startIcon={props.liked ? <ThumbUp /> : <ThumbUpOutlined />}
                sx={{ fontSize: 14, fontWeight: 'bold' }}
                onClick={(e) => {
                  e.stopPropagation()
                  if (props.onLikeClick) props.onLikeClick()
                }}
              >
                {props.likeCount}
              </Button>
              <Button
                {...props.commentLink}
                component={linkOn ? Link : 'div'}
                variant="text"
                startIcon={<CommentOutlined />}
                resetScroll
              >
                {props.commentCount}
              </Button>
            </Stack>

            <Divider />

            {variant === 'preview' &&
              props.comments &&
              props.commentCount > 0 && (
                <Stack mt={1}>
                  {props.comments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      author={{
                        id: comment.author.id,
                        picUrl: comment.author.picUrl || '',
                        displayName: `${comment.author.first_name} ${comment.author.last_name}`,
                        username: comment.author.username,
                      }}
                      content={comment.content}
                      contentType={comment.comment_type}
                      likeCount={comment.like_count}
                      liked={comment.is_liked}
                      commentDate={new Date(comment.created_at)}
                    />
                  ))}
                  <Button
                    {...props.commentLink}
                    component={linkOn ? Link : 'div'}
                    variant="text"
                    endIcon={<ArrowDropDown />}
                    resetScroll
                  >
                    View More
                  </Button>
                </Stack>
              )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
