import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/profile/_profile')({
  component: ProfileLayout,
})

function ProfileLayout() {
  return <div></div>
}
