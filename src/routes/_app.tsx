import { Container, Typography } from '@mui/material'
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import Grid from '@mui/material/Grid2'
import SideNav from '@/components/SideNav'
import { loggedUserQueryOptions } from '@/api/queries/user'

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(loggedUserQueryOptions())
  },
  onError: () => {
    throw redirect({
      to: '/login',
    })
  },
  component: AppLayout,
})

function AppLayout() {
  const location = useLocation()

  return (
    <Container>
      <Grid container height="100vh" gap={2}>
        <Grid size="grow">
          <SideNav activeRoute={location.pathname} />
        </Grid>

        <Grid size={7}>
          <Outlet />
        </Grid>

        <Grid size="grow" pt={4}></Grid>
      </Grid>
    </Container>
  )
}
