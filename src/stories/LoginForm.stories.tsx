import { Meta, StoryObj } from '@storybook/react'

import LoginForm from '@components/forms/LoginForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schema/authSchema'

const meta = {
  title: 'Login Form',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = Partial<StoryObj<typeof meta>>

export const Default: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: {
        username: '',
        password: '',
      },
    })

    return <LoginForm control={control} />
  },
}

export const FieldValidation: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      resolver: zodResolver(loginSchema),
    })

    return (
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <LoginForm control={control} />
      </form>
    )
  },
}
