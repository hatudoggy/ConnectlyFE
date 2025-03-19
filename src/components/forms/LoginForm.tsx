import { LoginFormProps } from '@/interfaces/ComponentProps'
import { Google, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { TextFieldElement } from 'react-hook-form-mui'

export default function LoginForm(props: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card>
      <CardContent>
        <Stack width="100vw" maxWidth={350} my={2} alignItems="center" gap={2}>
          <Typography variant="h5" fontWeight={500}>
            Login
          </Typography>

          <TextFieldElement
            control={props.control}
            name="username"
            size="small"
            label="Username"
            fullWidth
          />
          <TextFieldElement
            control={props.control}
            name="password"
            size="small"
            label="Password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button fullWidth type="submit" loading={props.onLoggingIn}>
            Login
          </Button>

          <Divider flexItem> Or </Divider>

          <Button variant="outlined" startIcon={<Google />} fullWidth>
            Sign in with Google
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
