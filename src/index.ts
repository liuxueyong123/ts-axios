import AxiosClass from './core/Axios'
import defaults from './core/defaults'
import mergeConfig from './core/mergeConfig'
import { AxiosInstance, AxiosRequestConfig } from './types'
export * from './types'

const createInstance = (config: Partial<AxiosRequestConfig>): AxiosInstance => {
  const instance = new AxiosClass(config)

  const axios: unknown = AxiosClass.prototype.request.bind(instance)
  Object.setPrototypeOf(axios, instance)

  return axios as AxiosInstance
}

const axios = createInstance(defaults)
axios.create = (config: Partial<AxiosRequestConfig>) => {
  const mergedConfig = mergeConfig(defaults, config as AxiosRequestConfig)
  return createInstance(mergedConfig)
}

export default axios as AxiosInstance
