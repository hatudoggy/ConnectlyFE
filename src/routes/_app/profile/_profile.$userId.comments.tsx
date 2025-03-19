import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/profile/_profile/$userId/comments')(
  {
    component: ProfileComments,
  },
)

function ProfileComments() {
  return <div>Hello "/(app)/profile/$userId/comments"!</div>
}
