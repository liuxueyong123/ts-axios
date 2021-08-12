import { deepMerge, isObject } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

const defaultStrategy = (val1: any, val2: any): any => {
  return val2 || val1
}

const fromVal2Strategy = (val1: any, val2: any): any => {
  if (val2) {
    return val2
  }
}

const deepMergeStrategy = (val1: any, val2: any): any => {
  if (isObject(val2)) {
    return deepMerge(val1, val2)
  } else if (val2) {
    return val2
  } else if (isObject(val1)) {
    return deepMerge(val1)
  } else if (val1) {
    return val1
  }
}

const mergeFunctionMap = new Map<keyof AxiosRequestConfig, Function>([
  ['url', fromVal2Strategy],
  ['params', fromVal2Strategy],
  ['data', fromVal2Strategy],
  ['headers', deepMergeStrategy]
])

const mergeConfig = (config1: Partial<AxiosRequestConfig>, config2: AxiosRequestConfig) => {
  const config: Partial<AxiosRequestConfig> = Object.create(null)

  // 对传进来的配置每一项都进行处理
  for (const configKey of Object.keys(config2)) {
    const key = configKey as keyof AxiosRequestConfig
    const mergeFunction = mergeFunctionMap.get(key) || defaultStrategy

    config[key] = mergeFunction(config1[key], config2[key])
  }

  // 对传进来的配置没有，但默认配置里有的项做处理
  for (const configKey of Object.keys(config1)) {
    const key = configKey as keyof AxiosRequestConfig
    if (config2[key]) continue

    const mergeFunction = mergeFunctionMap.get(key) || defaultStrategy

    config[key] = mergeFunction(config1[key], config2[key])
  }

  return config as AxiosRequestConfig
}

export default mergeConfig
