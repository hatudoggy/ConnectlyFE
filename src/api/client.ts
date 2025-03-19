import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const DISABLE_SSL = import.meta.env.VITE_DISABLE_SSL === 'true'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      console.log('Header Authorization Appended')
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')

        const refreshRes = await axios.post(`${API_BASE_URL}/token/refresh/`, {
          refresh: refreshToken,
        })

        if (refreshRes.status === 200) {
          const newAccessToken = refreshRes.data.access

          localStorage.setItem('accessToken', newAccessToken)

          originalReq.headers.Authorization = `Bearer ${newAccessToken}`
          return apiClient(originalReq)
        }
      } catch (error) {
        console.error('Failed to refresh token', error)
        localStorage.removeItem('accessToken')
        //window.location.href = '/login'
      }

      return Promise.reject(error)
    }

    if (error.response) {
      console.error(
        `API Error ${error.response.status}:`,
        error.response.data?.message || 'An error occurred',
      )

      return Promise.reject(error.response.data) // Reject with API response data
    } else if (error.request) {
      console.error('No response from server. Check your connection.')
      return Promise.reject({ message: 'No response from server' })
    } else {
      console.error('Axios request error:', error.message)
      return Promise.reject({ message: error.message })
    }
  },
)
