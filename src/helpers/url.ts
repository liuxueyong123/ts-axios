/* eslint-disable */
import { isObject, isDate } from './util'

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
  if(Array.isArray(value)) {
    for(const item of value) {
      paramsList.push(`${key}=${item}`)
    }
    return
  }

  // 对象
  if(isObject(value)) {
    paramsList.push(`${key}=${encodeObject(value)}`)
    return
  }

  // 日期类型
  if(isDate(value)) {
    paramsList.push(`${key}=${value.toISOString()}`)
    return
  }

  // null / undefined 不做任何操作
  if(value === undefined || value === null) {
    return
  }

  paramsList.push(`${key}=${value}`)
}


export const buildURL = (url: string, params: Object) => {
  const paramList: string[] = []

  // 保留原有 params 参数
  if(url.includes('?')) { 
    paramList.push(...url.split('?')[1].split('&'))
  }

  for(const [key, value] of Object.entries(params)) {
    pushParamToList(key, value, paramList)
  }

  const newURL = `${url.split('?')[0]}?${paramList.join('&')}`

  return newURL
}
