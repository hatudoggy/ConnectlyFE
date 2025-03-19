import { PostMediaProps } from '@interfaces/ComponentProps'
import Image from './ui/Image'
import { Box } from '@mui/material'
import ImageButton from './ui/ImageButton'

export default function PostMedia(props: PostMediaProps) {
  return (
    <Box
      pb={2}
      overflow="hidden"
      borderRadius={6}
      sx={{
        aspectRatio: 1 / 1,
      }}
    >
      <ImageButton focusRipple sx={{ width: '100%' }}>
        <Image
          src={props.media[0].url}
          sx={{
            aspectRatio: 1 / 1,
          }}
        />
      </ImageButton>
    </Box>
  )
}
