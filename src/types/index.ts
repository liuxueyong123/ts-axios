import CancelToken, { Cancel } from '../core/CancelToken'

export type RequestMethod = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'patch' | 'PATCH' | 'options' | 'OPTIONS'

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface AxiosRequestConfig {
  url: string
  method?: RequestMethod
  params?: any
  data?: any
  headers?: Record<any, any>
  timeout?: number
  responseType?: XMLHttpRequestResponseType
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
}

// export interface AxiosDefaultRequestConfig extends AxiosRequestConfig {
//   url: string
//   method: RequestMethod
//   params: any
//   data?: any
//   headers: Record<any, any>
//   timeout: number
//   responseType?: XMLHttpRequestResponseType
// }

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

export type AxiosInterceptorResolvedFn<T> = (val: T) => T
export type AxiosInterceptorRejectFn = (error: any) => any

export interface AxiosInterceptor<T> {
  resolve: AxiosInterceptorResolvedFn<T>
  reject: AxiosInterceptorRejectFn
}

export interface AxiosInterceptorManage<T> {
  use(resolve: AxiosInterceptorResolvedFn<T>, reject: AxiosInterceptorRejectFn): number
  eject(interceptor: number): void
  forEach(callback: (val: AxiosInterceptor<T>) => void): void
}

export interface AxiosInterceptors {
  request: AxiosInterceptorManage<AxiosRequestConfig>
  response: AxiosInterceptorManage<AxiosResponse>
}

export interface ChainPromise {
  resolve: AxiosInterceptorResolvedFn<AxiosRequestConfig> | AxiosInterceptorResolvedFn<AxiosResponse> | ((config: AxiosRequestConfig) => Promise<AxiosResponse<any>>)
  reject?: AxiosInterceptorRejectFn
}

export interface Axios {
  interceptors: AxiosInterceptors
  defaults: Partial<AxiosRequestConfig>

  request<T = any>(url: string | AxiosRequestConfig, config?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>

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
  create: (config?: Partial<AxiosRequestConfig>) => AxiosInstance
  CancelToken: typeof CancelToken
  Cancel: typeof Cancel
  isCancel: (attr: any) => attr is Cancel
}
