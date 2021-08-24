import Cookies from 'js-cookie'
import { transformResponseData } from '../helpers/processConfig'
import { parseHeaders } from '../helpers/header'
import AxiosError from '../helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../types'
import { isURLSameOrigin } from '../helpers/url'

export const xhr = (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    const { method = 'get', url, data = null, headers = {}, timeout, cancelToken, withCredentials, xsrfCookieName, xsrfHeaderName } = config

    const xhr = new XMLHttpRequest()
    xhr.open(method.toLowerCase(), url, true)

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        xhr.abort()
        reject(reason)
      })
    }

    if (withCredentials) {
      xhr.withCredentials = true
    }

    if ((withCredentials || isURLSameOrigin(url)) && xsrfCookieName) {
      const xsrfValue = Cookies.get(xsrfCookieName)

      if (xsrfValue) {
        headers[xsrfHeaderName!] = xsrfValue
      }
    }

    for (const [key, value] of Object.entries(headers)) {
      xhr.setRequestHeader(key, value)
    }

    xhr.onload = () => {
      const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
      const responseData = transformResponseData(xhr.response, config.transformResponse)
      const response: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        request: xhr
      }

      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(response)
      }

      // 请求失败
      reject(new AxiosError(`Request failed with status code ${xhr.status}: ${xhr.responseText}`, config, xhr, response))
    }

    // 处理网络请求失败的情况
    xhr.onerror = () => {
      reject(new AxiosError('Network Error', config, xhr))
    }

    if (timeout) {
      xhr.timeout = timeout
    }

    // 处理超时的情况
    xhr.ontimeout = () => {
      reject(new AxiosError(`Timeout of ${timeout} ms exceeded`, config, xhr))
    }

    xhr.send(data)
  })
}
