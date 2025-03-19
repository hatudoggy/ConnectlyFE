import { ImageProps } from '@/interfaces/ComponentProps'
import { Box } from '@mui/material'

export default function Image({
  src,
  alt = 'Image',
  width = '100%',
  height = 'auto',
  sx = {},
}: ImageProps) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width,
        height,
        objectFit: 'cover',
        ...sx,
      }}
    />
  )
}
