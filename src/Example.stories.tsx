import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Example } from './Example'

type Meta = ComponentMeta<typeof Example>
type Story = ComponentStoryObj<typeof Example>

const meta: Meta = {
  title: 'Example',
  component: Example,
}

export default meta

export const Default: Story = {}
