import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import CommentItem from '@components/CommentItem'
import { Stack } from '@mui/material'

const meta = {
  title: 'Comment Item',
  component: CommentItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onLikeClick: fn() },
} satisfies Meta<typeof CommentItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    author: {
      picUrl:
        'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F24ea8e87-54d3-4baf-b891-52ca6c90d6cb.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1',
      displayName: 'The Wok',
      username: 'chongwok',
    },
    content: 'Hello, I am the Wok',
    contentType: 'text',
    likeCount: 0,
    liked: false,
    commentDate: new Date(),
  },
  render: (args) => {
    return (
      <Stack width="100vw" maxWidth="sm">
        <CommentItem {...args} />
      </Stack>
    )
  },
}
