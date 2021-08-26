import { AxiosRequestConfig, AxiosTransformer } from '../types'
import { transformURL } from './url'
import { flattenHeaders, transformHeaders } from './header'
import transform from '../core/transform'

export const processConfig = (config: AxiosRequestConfig) => {
  const { url, params = {}, data = null, headers = {}, method, paramsSerializer } = config

  config.url = transformURL(url, params, paramsSerializer)
  config.headers = transformHeaders(headers, data)
  config.data = transform(data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, method!)
}

export const transformResponseData = (data: any, transformResponse?: AxiosTransformer | AxiosTransformer[]) => {
  return transform(data, '', transformResponse)
}
