/* eslint-disable */
import { AxiosConfig } from "../types"
import { buildURL } from './url'

const processConfig = (config: AxiosConfig) => {
  const { url, params = {} } = config

  config.url = buildURL(url, params)
}

export default processConfig
