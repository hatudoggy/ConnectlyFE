import { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  // notFoundComponent: () => {
  //   return (
  //     <div>
  //       <p>This is the notFoundComponent configured on root route</p>
  //       <Link to="/">Start Over</Link>
  //     </div>
  //   )
  // },
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
