import { createTheme, Theme } from '@mui/material/styles'

const globalComponentTheme: Theme['components'] = {
  // Avatar default style
  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) =>
        // Change to larger size
        theme.unstable_sx({
          width: 44,
          height: 44,
        }),
    },
  },
  // Card default style
  MuiCard: {
    defaultProps: {
      variant: 'outlined',
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: ({ theme }) =>
        // Evens out all the padding
        theme.unstable_sx({
          p: 2,
          '&:last-child': { pb: 2 },
        }),
    },
  },
  // Button default style
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      disableElevation: true,
    },
  },
  // IconButton default syle
  MuiIconButton: {
    defaultProps: {
      color: 'primary',
    },
  },
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
  },
  components: globalComponentTheme,
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF',
    },
  },
  components: globalComponentTheme,
})
