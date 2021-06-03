import processConfig from '../helpers/processConfig'
import { AxiosRequestConfig } from '../types'
import { xhr } from './xhr'

const dispatchRequest = (config: AxiosRequestConfig) => {
  processConfig(config)

  return xhr(config)
}

export default dispatchRequest
