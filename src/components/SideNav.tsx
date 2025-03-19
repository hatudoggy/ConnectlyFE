import { MainRouteItem } from '@interfaces/Route'
import {
  AccountCircle,
  AccountCircleOutlined,
  Home,
  HomeOutlined,
  Settings,
  SettingsOutlined,
} from '@mui/icons-material'
import { Box, Button, Stack } from '@mui/material'
import { Link } from '@tanstack/react-router'

export default function SideNav({
  linkOn = true,
  activeRoute,
}: {
  linkOn?: boolean
  activeRoute: string
}) {
  const mainRoutes: MainRouteItem[] = [
    {
      to: '/feed',
      label: 'Feed',
      iconFilled: Home,
      iconOutlined: HomeOutlined,
    },
    {
      to: '/profile',
      label: 'Profile',
      iconFilled: AccountCircle,
      iconOutlined: AccountCircleOutlined,
    },
    {
      to: '/settings',
      label: 'Settings',
      iconFilled: Settings,
      iconOutlined: SettingsOutlined,
    },
  ]

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
      }}
    >
      <Stack pt={4}>
        {mainRoutes.map((route) => {
          const FilledIcon = route.iconFilled
          const OutlinedIcon = route.iconOutlined

          return (
            <Button
              key={route.to}
              component={linkOn ? Link : 'button'}
              to={route.to}
              variant="text"
              startIcon={
                activeRoute === route.to ? (
                  <FilledIcon sx={{ fontSize: 28 }} />
                ) : (
                  <OutlinedIcon sx={{ fontSize: 28 }} />
                )
              }
              sx={{
                justifyContent: 'start',
                fontWeight: activeRoute === route.to ? 700 : 500,
                fontSize: 18,
              }}
            >
              {route.label}
            </Button>
          )
        })}
      </Stack>
    </Box>
  )
}
