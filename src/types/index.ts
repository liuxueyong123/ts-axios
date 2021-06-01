export type RequestMethod = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'patch' | 'PATCH'

export interface AxiosConfig {
  url: string
  method?: RequestMethod
  params?: any
  data?: any
  headers?: Record<any, any>
}
