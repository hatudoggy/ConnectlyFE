import { CommentItemProps } from '@interfaces/ComponentProps'
import {
  QuestionAnswerOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from '@mui/icons-material'
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material'

export default function CommentItem(props: CommentItemProps) {
  return (
    <Stack
      direction="row"
      gap={2}
      p={1}
      sx={{
        flexGrow: 1,
        maxWidth: 'md',
      }}
    >
      <Avatar src={props.author.picUrl}>{props.author.displayName[0]}</Avatar>
      <Stack gap={0.5}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography fontWeight={700}>{props.author.displayName}</Typography>
          <Typography variant="body2" sx={{ color: 'GrayText' }}>
            {props.author.username}
          </Typography>
        </Stack>
        <Typography>{props.content}</Typography>
        <Stack direction="row">
          <Button
            variant="text"
            startIcon={props.liked ? <ThumbUp /> : <ThumbUpOutlined />}
            sx={{ fontSize: 14, fontWeight: 'bold' }}
            size="small"
            onClick={props.onLikeClick}
          >
            {props.likeCount}
          </Button>
          <IconButton size="small" onClick={props.onReplyClick}>
            <QuestionAnswerOutlined fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}
