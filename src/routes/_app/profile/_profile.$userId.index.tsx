import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/profile/_profile/$userId/')({
  component: ProfilePosts,
})

function ProfilePosts() {
  return <div>Hello "/(app)/profile/"!</div>
}
