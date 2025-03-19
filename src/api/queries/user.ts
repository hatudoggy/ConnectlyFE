import { QueryKey, queryOptions } from '@tanstack/react-query'
import { getLoggedUserApi } from '../auth'

export const authUserQueryKey: QueryKey = ['auth-user']

export const loggedUserQueryOptions = () =>
  queryOptions({
    queryKey: authUserQueryKey,
    queryFn: () => getLoggedUserApi(),
  })
