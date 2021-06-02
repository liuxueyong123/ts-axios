import { isObject, isString } from './util'

export const transformRequestData = (data: any) => {
  if (isObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

export const transformResponseData = (data: any) => {
  let parsedData = {}

  if (isString(data)) {
    try {
      parsedData = JSON.parse(data)
    } catch (e) {
      // TODO
      parsedData = data
    }
  }

  return parsedData
}
