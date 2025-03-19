import { CommentTextAreaProps } from '@/interfaces/ComponentProps'
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material'
import { TextFieldElement } from 'react-hook-form-mui'
import FileUploadInput from './ui/FileUploadInput'
import { Image, Movie } from '@mui/icons-material'

export default function CommentTextArea(props: CommentTextAreaProps) {
  const content = props.watch('content', '')
  const attachments = props.watch('mediaFiles', [])

  const maxLength = 150

  return (
    <Stack direction="row" gap={1.5}>
      <Avatar
        //src={props.user.picUrl}
        sx={{
          mt: 1.5,
        }}
      >
        {/* {props.user.displayName[0]} */}
      </Avatar>
      <Stack p={1} gap={1} width="100%">
        <TextFieldElement
          control={props.control}
          name="content"
          multiline
          maxRows={5}
          fullWidth
          placeholder="Write your comment"
        />
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row">
            <FileUploadInput
              accept="image/*"
              onFileSelect={(file) => {
                const newAttachment = [...attachments, file]
                props.setValue('mediaFiles', newAttachment)
                props.setValue('commentType', 'image')
              }}
            >
              <IconButton component="span">
                <Image />
              </IconButton>
            </FileUploadInput>

            <IconButton>
              <Movie />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" gap={2}>
            <Typography
              variant="body2"
              color="GrayText"
            >{`${content.length}/${maxLength}`}</Typography>

            <Button
              type="submit"
              disabled={content.trim() == ''}
              loading={props.onCommenting}
            >
              Comment
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
