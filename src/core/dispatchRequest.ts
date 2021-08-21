import { processConfig } from '../helpers/processConfig'
import { AxiosRequestConfig } from '../types'
import { throwIfCancellationRequested } from './CancelToken'
import { xhr } from './xhr'

const dispatchRequest = (config: AxiosRequestConfig) => {
  // 对于已经被取消的 token 将直接抛出异常
  throwIfCancellationRequested(config)

  // 对 config 进行处理
  processConfig(config)

  return xhr(config)
}

export default dispatchRequest
