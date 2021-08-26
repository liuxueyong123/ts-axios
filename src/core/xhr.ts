import Cookies from 'js-cookie'
import { transformResponseData } from '../helpers/processConfig'
import { parseHeaders } from '../helpers/header'
import AxiosError from '../helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../types'
import { isURLSameOrigin } from '../helpers/url'
import CancelToken from './CancelToken'
import { isFormData } from '../helpers/util'

const configureRequest = (xhr: XMLHttpRequest, config: AxiosRequestConfig) => {
  const { timeout, withCredentials, responseType, onDownloadProgress, onUploadProgress } = config

  if (responseType) {
    xhr.responseType = responseType
  }

  if (timeout) {
    xhr.timeout = timeout
  }

  if (withCredentials) {
    xhr.withCredentials = true
  }

  if (onDownloadProgress) {
    xhr.onprogress = onDownloadProgress
  }

  if (onUploadProgress) {
    xhr.upload.onprogress = onUploadProgress
  }
}

const addEvents = (xhr: XMLHttpRequest, config: AxiosRequestConfig, resolve: (value: AxiosResponse<any>) => void, reject: (reason?: any) => void) => {
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

    if (config.validateStatus && config.validateStatus(xhr.status)) {
      resolve(response)
    }

    // 请求失败
    reject(new AxiosError(`Request failed with status code ${xhr.status}: ${xhr.responseText}`, config, xhr, response))
  }

  // 处理网络请求失败的情况
  xhr.onerror = () => {
    reject(new AxiosError('Network Error', config, xhr))
  }

  // 处理超时的情况
  xhr.ontimeout = () => {
    reject(new AxiosError(`Timeout of ${config.timeout} ms exceeded`, config, xhr))
  }
}

const handleCancel = (xhr: XMLHttpRequest, reject: (reason?: any) => void, cancelToken?: CancelToken) => {
  if (cancelToken) {
    cancelToken.promise.then(reason => {
      xhr.abort()
      reject(reason)
    })
  }
}

const handleXSRFToken = (config: AxiosRequestConfig) => {
  const { url, headers = {}, withCredentials, xsrfCookieName, xsrfHeaderName } = config

  if ((withCredentials || isURLSameOrigin(url)) && xsrfCookieName) {
    const xsrfValue = Cookies.get(xsrfCookieName)

    if (xsrfValue) {
      headers[xsrfHeaderName!] = xsrfValue
    }
  }
}

const processHeader = (xhr: XMLHttpRequest, config: AxiosRequestConfig) => {
  const { data = null, headers = {}, auth } = config

  if (auth) {
    headers.Authorization = 'Basic ' + window.btoa(auth.username + ':' + auth.password)
  }

  if (isFormData(data)) {
    delete headers['Content-Type']
  }

  for (const [key, value] of Object.entries(headers)) {
    xhr.setRequestHeader(key, value)
  }
}

export const xhr = (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    const { method = 'get', url } = config

    const xhr = new XMLHttpRequest()
    xhr.open(method.toLowerCase(), url, true)

    configureRequest(xhr, config)

    handleCancel(xhr, reject, config.cancelToken)

    handleXSRFToken(config)

    processHeader(xhr, config)

    addEvents(xhr, config, resolve, reject)

    xhr.send(config.data || null)
  })
}
