export const isObject = (val: any): val is Object => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export const isDate = (val: any): val is Date => {
  return Object.prototype.toString.call(val) === '[object Date]'
}

export const isString = (val: any): val is string => {
  return typeof val === 'string'
}

export const isFormData = (val: any): val is FormData => {
  return val instanceof FormData
}

export const isURLSearchParams = (val: any): val is URLSearchParams => {
  return val instanceof URLSearchParams
}

export const deepMerge = (...objs: Record<any, any>[]) => {
  const result = Object.create(null)

  for (const obj of objs) {
    if (!obj) continue

    for (const [key, value] of Object.entries(obj)) {
      if (!isObject(value) || !isObject(result[key])) {
        result[key] = value
        continue
      }

      result[key] = deepMerge(result[key], value)
    }
  }

  return result
}
