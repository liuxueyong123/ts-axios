import { isObject } from './util'

const keysToLowerCase = (headers: Record<any, any>) => {
  const lowerCaseHeaders: Record<any, any> = {}
  for (const [key, value] of Object.entries(headers)) {
    lowerCaseHeaders[key.toLowerCase()] = value
  }

  return lowerCaseHeaders
}

export const parseHeaders = (headers: string) => {
  const parsedHeaders: Record<string, string> = {}

  for (const item of headers.split('\r\n')) {
    let [key, value] = item.split(':')

    key = key.trim().toLowerCase()
    if (!key) continue

    if (value) {
      value = value.trim()
    }

    parsedHeaders[key] = value
  }

  return parsedHeaders
}

export const transformHeaders = (headers: Record<any, any>, data: any) => {
  const lowerCaseHeaders: Record<any, any> = keysToLowerCase(headers)

  if (isObject(data) && !lowerCaseHeaders['content-type']) {
    lowerCaseHeaders['content-type'] = 'application/json;charset=utf-8'
  }

  return lowerCaseHeaders
}
