export type RequestMethod = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'patch' | 'PATCH' | 'options' | 'OPTIONS'

export interface AxiosRequestConfig {
  url: string
  method?: RequestMethod
  params?: any
  data?: any
  headers?: Record<any, any>
  timeout?: number
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse<T = any> {
  config: AxiosRequestConfig
  data: T
  headers: any
  request: any
  status: number
  statusText: string
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  request: any
  // code?: number
  response?: AxiosResponse
}

export interface Axios {
  request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>

  get<T = any>(url: string, config?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>

  delete<T = any>(url: string, config?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>

  head<T = any>(url: string, config?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>

  options<T = any>(url: string, config?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>

  post<T = any>(url: string, data?: any, config?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>

  put<T = any>(url: string, data?: any, config?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>

  patch<T = any>(url: string, data?: any, config?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>
}
