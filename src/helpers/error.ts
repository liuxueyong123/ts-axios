import { AxiosRequestConfig, AxiosResponse } from '../types'

class AxiosError extends Error {
  config: AxiosRequestConfig
  request: any
  response?: AxiosResponse
  // code?: number

  constructor (message: string, config: AxiosRequestConfig, request: any, response?: AxiosResponse) {
    super(message)

    this.config = config
    this.request = request
    this.response = response
    // this.code = code

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export default AxiosError
