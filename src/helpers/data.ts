import { isObject } from './util'

export const transformRequestData = (data: any) => {
  if (isObject(data)) {
    return JSON.stringify(data)
  }

  return data
}
