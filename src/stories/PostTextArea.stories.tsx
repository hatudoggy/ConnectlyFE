import type { Meta, StoryObj } from '@storybook/react'

import PostTextArea from '@components/PostTextArea'
import { Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPostSchema } from '@/schema/postSchema'
import { useEffect } from 'react'

const meta = {
  title: 'Post Text Area',
  component: PostTextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostTextArea>

export default meta
type Story = Partial<StoryObj<typeof meta>>

export const Default: Story = {
  render: () => {
    const { control, watch, setValue } = useForm({
      resolver: zodResolver(createPostSchema),
    })

    return (
      <Stack width="100vw" maxWidth="sm">
        <PostTextArea control={control} watch={watch} setValue={setValue} />
      </Stack>
    )
  },
}

export const WithText: Story = {
  render: () => {
    const { control, watch, setValue } = useForm({
      resolver: zodResolver(createPostSchema),
      values: {
        content:
          'To define the args of a single story, use the args CSF story key',
        mediaFiles: [],
        postType: 'text',
      },
    })

    return (
      <Stack width="100vw" maxWidth="sm">
        <PostTextArea control={control} watch={watch} setValue={setValue} />
      </Stack>
    )
  },
}

export const WithTextMultiine: Story = {
  render: () => {
    const { control, watch, setValue } = useForm({
      resolver: zodResolver(createPostSchema),
      values: {
        content: `
    A story is a component with a set of arguments that define how the component should render.
    “Args” are Storybook's mechanism for JS.
    `,
        mediaFiles: [],
        postType: 'text',
      },
    })

    return (
      <Stack width="100vw" maxWidth="sm">
        <PostTextArea control={control} watch={watch} setValue={setValue} />
      </Stack>
    )
  },
}

export const WithImages: Story = {
  render: () => {
    const { control, watch, setValue } = useForm({
      resolver: zodResolver(createPostSchema),
      values: {
        content: '',
        mediaFiles: [],
        postType: 'image',
      },
    })

    useEffect(() => {
      const sampleFile = new File(['Yo'], './yo.jpg', {
        type: 'image/jpeg',
      })

      setValue('mediaFiles', [sampleFile])
    }, [setValue])

    return (
      <Stack width="100vw" maxWidth="sm">
        <PostTextArea control={control} watch={watch} setValue={setValue} />
      </Stack>
    )
  },
}

// export const WithImages: Story = {
//   render: ({ interactive, textValue, onTextValueChange, ...args }) => {
//     const [localTextValue, setLocalTextValue] = useState('')
//     const images: MediaThumbnail[] = [
//       { imageRef: 'https://mui.com/static/images/cards/paella.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/live-from-space.jpg' },
//     ]

//     return (
//       <Stack width="100vw" maxWidth="sm">
//         <PostTextArea
//           {...args}
//           imageAttachments={images}
//           textValue={interactive ? localTextValue : textValue}
//           onTextValueChange={(val) => setLocalTextValue(val)}
//         />
//       </Stack>
//     )
//   },
// }

// export const WithManyImages: Story = {
//   render: ({ interactive, textValue, onTextValueChange, ...args }) => {
//     const [localTextValue, setLocalTextValue] = useState('')
//     const images: MediaThumbnail[] = [
//       { imageRef: 'https://mui.com/static/images/cards/paella.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/live-from-space.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/paella.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/live-from-space.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/paella.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/live-from-space.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/paella.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/live-from-space.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/paella.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/live-from-space.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/paella.jpg' },
//       { imageRef: 'https://mui.com/static/images/cards/live-from-space.jpg' },
//     ]

//     return (
//       <Stack width="100vw" maxWidth="sm">
//         <PostTextArea
//           {...args}
//           imageAttachments={images}
//           textValue={interactive ? localTextValue : textValue}
//           onTextValueChange={(val) => setLocalTextValue(val)}
//         />
//       </Stack>
//     )
//   },
// }
