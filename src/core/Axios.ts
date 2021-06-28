import { isString } from '../helpers/util'
import { AxiosInterceptors, AxiosRequestConfig, RequestMethod, Axios as IAxios, ChainPromise } from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManage from './Interceptor'

class Axios implements IAxios {
  interceptors: AxiosInterceptors

  constructor () {
    this.interceptors = {
      request: new InterceptorManage(),
      response: new InterceptorManage()
    }
  }

  request (url: string | AxiosRequestConfig, config: Partial<AxiosRequestConfig> = {}) {
    if (isString(url)) {
      config.url = url
    } else {
      config = url
    }

    const chain: ChainPromise[] = [
      {
        resolve: dispatchRequest,
        reject: undefined
      }
    ]

    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor)
    })

    // TODO: 干掉这个 any
    let promise: any = Promise.resolve(config as AxiosRequestConfig)
    for (const interceptor of chain) {
      promise = promise.then(interceptor.resolve, interceptor.reject)
    }

    return promise
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
