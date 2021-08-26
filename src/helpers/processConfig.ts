import { AxiosRequestConfig, AxiosTransformer } from '../types'
import { transformURL } from './url'
import { flattenHeaders, transformHeaders } from './header'
import transform from '../core/transform'

export const processConfig = (config: AxiosRequestConfig) => {
  const { data = null, headers = {}, method } = config

  config.url = transformURL(config)
  config.headers = transformHeaders(headers, data)
  config.data = transform(data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, method!)
}

export const transformResponseData = (data: any, transformResponse?: AxiosTransformer | AxiosTransformer[]) => {
  return transform(data, '', transformResponse)
}
