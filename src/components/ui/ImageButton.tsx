import { ButtonBase, styled } from '@mui/material'

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  component: 'div',
  transition: 'background-color 0.3s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: theme.palette.action.hover, // MUI hover color
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::after': {
    opacity: 1,
  },
}))

export default ImageButton
