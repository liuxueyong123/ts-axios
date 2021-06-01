import processConfig from './helpers/processConfig'
import { AxiosConfig } from './types'
import { xhr } from './xhr'

const axios = (config: AxiosConfig) => {
  processConfig(config)

  return xhr(config)
}

export default axios
