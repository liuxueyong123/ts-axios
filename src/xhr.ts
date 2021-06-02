import { transformResponseData } from './helpers/data'
import { parseHeaders } from './helpers/header'
import { AxiosRequestConfig, AxiosResponse } from './types'

export const xhr = (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    const { method = 'get', url, data = null, headers = {}, timeout } = config

    const xhr = new XMLHttpRequest()
    xhr.open(method.toLowerCase(), url, true)

    for (const [key, value] of Object.entries(headers)) {
      xhr.setRequestHeader(key, value)
    }

    xhr.onload = () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
        const responseData = transformResponseData(xhr.response)

        // 请求成功
        const response: AxiosResponse = {
          data: responseData,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: responseHeaders,
          config,
          request: xhr
        }

        resolve(response)
      }

      // 请求失败: status: 4xx, 5xx
      reject(new Error(`Request failed with status code ${xhr.status}: ${xhr.responseText}`))
    }

    // 处理网络请求失败的情况
    xhr.onerror = () => {
      reject(new Error('Network Error'))
    }

    if (timeout) {
      xhr.timeout = timeout
    }

    // 处理超时的情况
    xhr.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }

    xhr.send(data)
  })
}
