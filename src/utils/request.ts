import axios, { AxiosResponse,AxiosRequestConfig } from 'axios'
import { API_BASE_URL, IS_DEV } from '@/config/env'

const service = axios.create({
  baseURL: IS_DEV ? '/api' : API_BASE_URL,
  timeout: 5000,
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截
interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, data, message } = response.data

    if (code !== 0) {
      console.error(message)
      return Promise.reject(new Error(message))
    }

    return data
  },
  (error) => {
    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 401:
          console.error('未登录或 token 失效')
          break
        case 500:
          console.error('服务器错误')
          break
      }
    }
    return Promise.reject(error)
  }
)

export function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return service.request(config)
}
