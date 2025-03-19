import { Stack, Typography } from '@mui/material'

export default function ConnectlyHeroTitle() {
  return (
    <Stack>
      <Typography variant="h2" fontWeight={700}>
        Connectly
      </Typography>
      <Typography variant="h6" style={{ opacity: 0.75 }}>
        Connecting people accross the globe.
      </Typography>
    </Stack>
  )
}
