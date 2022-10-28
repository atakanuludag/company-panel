import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import configService from '@/core/Config'
import IErrorResponse from '@/models/IErrorResponse'

const apiUrl = configService.REACT_APP_SERVICE_URL

const defaultOptions: AxiosRequestConfig = {
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
}

const instance = axios.create(defaultOptions)

export const axiosResponseInterceptors = (
  toast: Function,
  logoutUserStore: () => void,
) => {
  instance.interceptors.response.use(
    (response) => {
      //console.log('Response: ', response)
      return response
    },
    (error: AxiosError) => {
      const data: IErrorResponse = error.response?.data as any
      const status = error.response?.status

      if (error.message === 'Network Error' && !error.response) {
        toast({
          title: `Ağ hatası - API servisin çalıştığından emin olun. ${error.message}`,
          status: 'error',
        })
        if (window.location.href.indexOf('/error') === -1)
          window.location.href = '/error'
      }

      if (status === 401) {
        logoutUserStore()
        window.location.href = '/login'
      } else if (status !== 200) {
        toast({
          title: `${
            data.message ? data.message : ` Servis hatası - ${error.message}`
          }`,
          status: 'error',
        })
      }

      return Promise.reject(error)
    },
  )
}

export const axiosSetTokenInterceptor = (token: string) => {
  instance.interceptors.request.use((config) => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`,
      )
    }
    config.headers['Authorization'] = token ? `Bearer ${token}` : ''
    return config
  })
}

export const axiosRemoveTokenInterceptor = () => {
  instance.interceptors.request.use((config) => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`,
      )
    }
    delete config.headers['Authorization']
    return config
  })
}

export default instance
