import { transformRequestData, transformResponseData } from '../helpers/data'
import { AxiosRequestConfig } from '../types'

const defaults: Partial<AxiosRequestConfig> = {
  method: 'get',
  timeout: 0,
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
  ]
  // url: '',
  // params: '',
  // data: '',
  // responseType: ''
}

export default defaults
