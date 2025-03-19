import { configureAuth } from 'react-query-auth'
import { LoginFormData, LoginResponse } from '@interfaces/Auth'
import { apiClient } from './client'
import { User } from '@interfaces/User'
import { APIResponse } from '@/interfaces/API'

export const getLoggedUserApi = async (): APIResponse<User> => {
  const res = await apiClient.get(`/profiles/me/`)

  return res.data
}

export const loginApi = async (
  form: LoginFormData,
): APIResponse<LoginResponse> => {
  const res = await apiClient.post('/token/', form)

  console.log('AUTH LOGIN API RESULT:', res)
  localStorage.setItem('accessToken', res.data.access)
  localStorage.setItem('refreshToken', res.data.refresh)

  return res.data
}

export const registerApi = async () => {}

export const logoutApi = async () => {}

export const auth = configureAuth<any, any, LoginFormData, any>({
  userFn: () => getLoggedUserApi(),
  loginFn: (form) => loginApi(form),
  registerFn: () => registerApi(),
  logoutFn: () => logoutApi(),
})
