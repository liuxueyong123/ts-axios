import { AxiosRequestConfig } from '../types'
import { transformURL } from './url'
import { transformRequestData } from './data'
import { flattenHeaders, transformHeaders } from './header'

const processConfig = (config: AxiosRequestConfig) => {
  const { url, params = {}, data = null, headers = {}, method } = config

  config.url = transformURL(url, params)
  config.headers = transformHeaders(headers, data)
  config.data = transformRequestData(data)
  config.headers = flattenHeaders(config.headers, method!)
}

export default processConfig
