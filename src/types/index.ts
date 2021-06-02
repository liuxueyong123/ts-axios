export type RequestMethod = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: RequestMethod
  params?: any
  data?: any
  headers?: Record<any, any>
  timeout?: number
  // eslint-disable-next-line no-undef
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  config: AxiosRequestConfig
  data: any
  headers: any
  request: any
  status: number
  statusText: string
}
