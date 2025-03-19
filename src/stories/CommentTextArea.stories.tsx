import CommentTextArea from '@/components/CommentTextArea'
import { createCommentSchema } from '@/schema/commentSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'

const meta = {
  title: 'Comment Text Area',
  component: CommentTextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommentTextArea>

export default meta
type Story = Partial<StoryObj<typeof meta>>

export const Default: Story = {
  render: () => {
    const { control, watch, setValue } = useForm({
      resolver: zodResolver(createCommentSchema),
    })

    return (
      <Stack width="100vw" maxWidth="sm">
        <CommentTextArea control={control} watch={watch} setValue={setValue} />
      </Stack>
    )
  },
}
