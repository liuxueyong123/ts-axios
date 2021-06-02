import processConfig from './helpers/processConfig'
import { AxiosRequestConfig } from './types'
import { xhr } from './xhr'

const axios = (config: AxiosRequestConfig) => {
  processConfig(config)

  return xhr(config)
}

export default axios
