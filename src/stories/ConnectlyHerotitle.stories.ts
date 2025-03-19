import { Meta, StoryObj } from '@storybook/react'

import ConnectlyHeroTitle from '@components/ConnectlyHeroTitle'

const meta = {
  title: 'Hero Title',
  component: ConnectlyHeroTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConnectlyHeroTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
