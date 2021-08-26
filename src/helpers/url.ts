import { AxiosRequestConfig } from '../types'
import { isObject, isDate, isURLSearchParams } from './util'

const encodeObject = (obj: Object) => {
  return encodeURIComponent(JSON.stringify(obj))
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

const pushParamToList = (key: string, value: any, paramsList: string[]) => {
  // 数组
  if (Array.isArray(value)) {
    for (const item of value) {
      paramsList.push(`${key}=${item}`)
    }
    return
  }

  // 对象
  if (isObject(value)) {
    paramsList.push(`${key}=${encodeObject(value)}`)
    return
  }

  // 日期类型
  if (isDate(value)) {
    paramsList.push(`${key}=${value.toISOString()}`)
    return
  }

  // null / undefined 不做任何操作
  if (value === undefined || value === null) {
    return
  }

  paramsList.push(`${key}=${value}`)
}

// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
// by any combination of letters, digits, plus, period, or hyphen.
const isAbsoluteURL = (val: string) => {
  return /^([a-z][a-z+-.\d]*:)?\/\//i.test(val)
}

const combineURL = (baseURL: string, relativeURL?: string): string => {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

export const transformURL = (config: AxiosRequestConfig) => {
  let { url, params = {}, paramsSerializer, baseURL } = config

  if (baseURL && !isAbsoluteURL(url)) {
    url = combineURL(baseURL, url)
  }

  if (!params) {
    return url
  }

  if (paramsSerializer) {
    const serializedParams = paramsSerializer(params)
    return url.includes('?') ? `${url}&${serializedParams}` : `${url}?${serializedParams}`
  }

  if (isURLSearchParams(params)) {
    const serializedParams = params.toString()
    return url.includes('?') ? `${url}&${serializedParams}` : `${url}?${serializedParams}`
  }

  const paramList: string[] = []
  // 保留原有 params 参数
  if (url.includes('?')) {
    paramList.push(...url.split('?')[1].split('&'))
  }

  for (const [key, value] of Object.entries(params)) {
    pushParamToList(key, value, paramList)
  }

  const newURL = `${url.split('?')[0]}?${paramList.join('&')}`

  return newURL
}

export const isURLSameOrigin = (requestURL: string): boolean => {
  const currentOrigin = new URL(window.location.href).origin
  const requestOrigin = new URL(requestURL).origin

  return currentOrigin === requestOrigin
}
