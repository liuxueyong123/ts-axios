import { AxiosRequestConfig } from '../types'

const defaults: Partial<AxiosRequestConfig> = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
  // url: '',
  // params: '',
  // data: '',
  // responseType: ''
}

export default defaults
