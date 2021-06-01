import { AxiosConfig } from '../types'
import { transformURL } from './url'
import { transformRequestData } from './data'
import { transformHeaders } from './header'

const processConfig = (config: AxiosConfig) => {
  const { url, params = {}, data = null, headers = {} } = config

  config.url = transformURL(url, params)
  config.headers = transformHeaders(headers, data)
  config.data = transformRequestData(data)
}

export default processConfig
