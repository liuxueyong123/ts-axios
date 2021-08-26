import { transformRequestData, transformResponseData } from '../helpers/data'
import { AxiosRequestConfig } from '../types'

const defaults: Partial<AxiosRequestConfig> = {
  method: 'get',
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    (data: any) => {
      return transformRequestData(data)
    }
  ],

  transformResponse: [
    function (data: any): any {
      return transformResponseData(data)
    }
  ],

  validateStatus: (status: number) => {
    return (status >= 200 && status < 300) || status === 304
  }
  // url: '',
  // params: '',
  // data: '',
  // responseType: ''
}

export default defaults
