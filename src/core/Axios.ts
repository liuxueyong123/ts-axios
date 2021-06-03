import { AxiosRequestConfig, RequestMethod } from '../types'
import dispatchRequest from './dispatchRequest'

class Axios {
  request (config: AxiosRequestConfig) {
    return dispatchRequest(config)
  }

  get (url: string, config?: Partial<AxiosRequestConfig>) {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete (url: string, config?: Partial<AxiosRequestConfig>) {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head (url: string, config?: Partial<AxiosRequestConfig>) {
    return this._requestMethodWithoutData('head', url, config)
  }

  options (url: string, config?: Partial<AxiosRequestConfig>) {
    return this._requestMethodWithoutData('options', url, config)
  }

  post (url: string, data?: any, config?: Partial<AxiosRequestConfig>) {
    return this._requestMethodWithData('post', url, data, config)
  }

  put (url: string, data?: any, config?: Partial<AxiosRequestConfig>) {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch (url: string, data?: any, config?: Partial<AxiosRequestConfig>) {
    return this._requestMethodWithData('patch', url, data, config)
  }

  private _requestMethodWithoutData (method: RequestMethod, url: string, config: Partial<AxiosRequestConfig> = {}) {
    const newConfig: AxiosRequestConfig = Object.assign(
      config,
      {
        method,
        url
      }
    )

    return this.request(newConfig)
  }

  private _requestMethodWithData (method: RequestMethod, url: string, data: any = {}, config: Partial<AxiosRequestConfig> = {}) {
    const newConfig: AxiosRequestConfig = Object.assign(
      config,
      {
        method,
        url,
        data
      }
    )

    return this.request(newConfig)
  }
}

export default Axios
