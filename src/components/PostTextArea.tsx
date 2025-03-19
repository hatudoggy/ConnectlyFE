import { PostTextAreaProps } from '@interfaces/ComponentProps'
import { Image, Movie } from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import MediaThumbnail from './MediaThumbnail'
import { TextFieldElement } from 'react-hook-form-mui'
import FileUploadInput from './ui/FileUploadInput'

export default function PostTextArea(props: PostTextAreaProps) {
  const content = props.watch('content', '')
  const attachments = props.watch('mediaFiles', [])

  const maxLength = 150

  return (
    <Card
      sx={{
        maxWidth: 'md',
      }}
    >
      <CardContent>
        <TextFieldElement
          control={props.control}
          name="content"
          variant="standard"
          placeholder="Write a post"
          fullWidth
          multiline
          slotProps={{
            input: {
              disableUnderline: true,
              sx: { fontSize: 20 },
            },
            htmlInput: {
              maxLength: maxLength,
            },
          }}
          sx={{
            mb: 1,
          }}
          disabled={props.onPosting}
        />
        <Stack direction="row" gap={1} flexWrap="wrap" mt={1}>
          {attachments &&
            attachments.map((media, idx) => (
              <MediaThumbnail
                key={idx}
                fileRef={media}
                onRemoveClick={() => {
                  const newAttachment = attachments.filter(
                    (item) => item != media,
                  )
                  props.setValue(`mediaFiles`, newAttachment)
                  if (attachments.length === 1)
                    props.setValue('postType', 'text')
                }}
              />
            ))}
        </Stack>

        <Divider sx={{ mt: 1, mb: 2 }} />

        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row">
            <FileUploadInput
              accept="image/*"
              onFileSelect={(file) => {
                const newAttachment = [...attachments, file]
                props.setValue('mediaFiles', newAttachment)
                props.setValue('postType', 'image')
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
              loading={props.onPosting}
            >
              Post
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
