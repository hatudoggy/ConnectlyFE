import { MediaThumbnailProps } from '@/interfaces/ComponentProps'
import { Close } from '@mui/icons-material'
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  useTheme,
} from '@mui/material'

export default function MediaThumbnail(props: MediaThumbnailProps) {
  const isDark = useTheme().palette.mode === 'dark'

  const fileUrl = URL.createObjectURL(props.fileRef)

  return (
    <Box width="fit-content" position="relative">
      <IconButton
        size="small"
        sx={{
          bgcolor: isDark ? '#000000' : '#FFFFFF',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 24,
          height: 24,
          zIndex: 2,
          translate: '40% -40%',
        }}
        onClick={props.onRemoveClick}
      >
        <Close fontSize="inherit" />
      </IconButton>
      <Card
        sx={{
          borderRadius: 4,
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            src={fileUrl}
            sx={{
              height: 82,
              width: 82,
            }}
          />
        </CardActionArea>
      </Card>
    </Box>
  )
}
