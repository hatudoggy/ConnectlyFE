import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/settings/')({
  component: Settings,
})

function Settings() {
  return <div>Hello "/_app/settings/"!</div>
}
