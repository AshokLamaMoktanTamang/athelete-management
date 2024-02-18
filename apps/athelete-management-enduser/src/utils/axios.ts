import axios, { AxiosResponse } from 'axios'

import { logout, getItem, setItem } from '.'
import 'react-toastify/dist/ReactToastify.css'

interface AxiosBaseResponse {
  isSuccess: boolean
  statusCode: number
}

export interface CustomAxiosError extends AxiosBaseResponse {
  message: string
  error: string
}

export type PostRefreshTokenResponse = {
  data: {
    accessToken: string
    refreshToken: string
  }
  statusCode: number
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    // if (response?.data?.isSuccess && response?.data?.data) {
    //   if (response.data.pagination) {
    //     const paginatedResponseData: PaginatedData<any> = {
    //       data: response.data.data,
    //       pagination: response.data.pagination,
    //     }
    //     return paginatedResponseData
    //   }
    //   return response.data.data
    // }
    return response
  },

  (error) => {
    if (!error.response) {
      const error = { response: { data: { message: 'Seems like its trouble in connecting!' } } }
      return Promise.reject(error)
    }

    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = getItem('refresh-token')

      if (!refreshToken) return Promise.reject(error.response.data)

      return axios
        .post(`${originalRequest.baseURL}auth/refresh-token`, {
          refreshToken,
        })
        .then((res: AxiosResponse<PostRefreshTokenResponse, any>) => {
          if (res.status === 200) {
            setItem('token', res.data.data.accessToken)
            setItem('refresh-token', res.data.data.refreshToken)

            originalRequest.headers.Authorization = 'Bearer ' + res.data.data.accessToken
            return axios(originalRequest)
          }
        })
        .catch(() => {
          logout()
          return
        })
    }

    if (error && error.response && error.response.status && error.response.status === 403) {
      logout()
      return
    }

    return Promise.reject(error.response.data)
  },
)

export default axiosInstance
