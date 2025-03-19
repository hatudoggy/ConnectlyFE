import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import PostItem from '@components/PostItem'
import { Stack } from '@mui/material'

const meta = {
  title: 'Post Item',
  component: PostItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onLikeClick: fn() },
} satisfies Meta<typeof PostItem>

export default meta
type Story = StoryObj<typeof meta>

export const Preview: Story = {
  args: {
    linkOn: false,
    variant: 'preview',
    author: {
      picUrl:
        'https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds',
      displayName: 'ZyOx',
      username: 'ZyOx',
    },
    user: {
      picUrl: '',
      displayName: 'Doggy',
      username: 'doggy',
    },
    liked: true,
    content:
      'As a CSS utility, the Typography component also supports all system properties. You can use them as props directly on the component.',
    contentType: 'text',
    commentCount: 2,
    likeCount: 4,
    comments: [
      {
        id: 1,
        post: 1,
        author: {
          id: 1,
          picUrl:
            'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F24ea8e87-54d3-4baf-b891-52ca6c90d6cb.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1',
          first_name: 'The',
          last_name: 'Wok',
          username: 'chongwok',
        },
        content: 'Buy test car',
        comment_type: 'text',
        like_count: 0,
        is_liked: false,
        created_at: new Date().toString(),
      },
    ],
    postDate: new Date(),
  },
  render: (args) => {
    return (
      <Stack width="100vw" maxWidth="sm">
        <PostItem {...args} />
      </Stack>
    )
  },
}

export const Full: Story = {
  args: {
    linkOn: false,
    variant: 'full',
    author: {
      picUrl:
        'https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds',
      displayName: 'ZyOx',
      username: 'ZyOx',
    },
    user: {
      picUrl: '',
      displayName: 'Doggy',
      username: 'doggy',
    },
    liked: true,
    content:
      'As a CSS utility, the Typography component also supports all system properties. You can use them as props directly on the component.',
    contentType: 'text',
    commentCount: 2,
    likeCount: 4,
    comments: [
      {
        id: 1,
        post: 1,
        author: {
          id: 1,
          picUrl:
            'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F24ea8e87-54d3-4baf-b891-52ca6c90d6cb.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1',
          first_name: 'The',
          last_name: 'Wok',
          username: 'chongwok',
        },
        content: 'Buy test car',
        comment_type: 'text',
        like_count: 0,
        is_liked: false,
        created_at: new Date().toString(),
      },
      {
        id: 1,
        post: 1,
        author: {
          id: 1,
          picUrl:
            'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F24ea8e87-54d3-4baf-b891-52ca6c90d6cb.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1',
          first_name: 'The',
          last_name: 'Wok',
          username: 'chongwok',
        },
        content: 'China china china',
        comment_type: 'text',
        like_count: 0,
        is_liked: false,
        created_at: new Date().toString(),
      },
    ],
    postDate: new Date(),
  },
  render: (args) => {
    return (
      <Stack width="100vw" maxWidth="sm">
        <PostItem {...args} />
      </Stack>
    )
  },
}
