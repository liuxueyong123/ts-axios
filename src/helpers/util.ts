export const isObject = (val: any): val is Object => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export const isDate = (val: any): val is Date => {
  return Object.prototype.toString.call(val) === '[object Date]'
}

export const isString = (val: any): val is string => {
  return typeof val === 'string'
}
