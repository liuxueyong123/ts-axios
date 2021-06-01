/* eslint-disable */ 
import { AxiosConfig } from './types'

export const xhr = (config: AxiosConfig) => {
  return new Promise((resolve, reject) => {
    const { method = 'get', url, data = null } = config

    const xhr = new XMLHttpRequest()
    xhr.open(method.toLowerCase(), url, true)

    xhr.onload = () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        // 请求成功
        resolve({
          data: xhr.response,
          status: xhr.status
        })
      }

      // 请求失败: status: 4xx, 5xx
      reject(new Error(`status: ${xhr.status} ${xhr.statusText}: ${xhr.responseText}`))
    }

    xhr.send(data)
  })
}
