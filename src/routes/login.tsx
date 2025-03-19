import ConnectlyHeroTitle from '@components/ConnectlyHeroTitle'
import LoginForm from '@components/forms/LoginForm'
import { Container, Stack } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@schema/authSchema'
import { auth } from '@api/auth'
import { LoginFormData } from '@interfaces/Auth'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const { useLogin } = auth
  const login = useLogin()
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const handleLogin = async (data: LoginFormData) => {
    login.mutateAsync(data, {
      onSuccess: async () => {
        await navigate({ to: '/feed' })
      },
      onError: (error) => {
        console.log('HANDLE LOGIN ERROR:', error)
      },
    })
  }

  return (
    <Container maxWidth="lg">
      <Stack
        height="100vh"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={6}
      >
        <ConnectlyHeroTitle />
        <form onSubmit={handleSubmit((data) => handleLogin(data))} noValidate>
          <LoginForm control={control} onLoggingIn={login.isPending} />
        </form>
      </Stack>
    </Container>
  )
}
