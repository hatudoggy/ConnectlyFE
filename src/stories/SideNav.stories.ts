import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import SideNav from '@components/SideNav'

const meta = {
  title: 'Side Navigation',
  component: SideNav,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  args: {},
} satisfies Meta<typeof SideNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    linkOn: false,
    activeRoute: '/feed',
  },
}
