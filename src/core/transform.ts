import { AxiosTransformer } from '../types'

const transform = (
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
) => {
  if (!fns) {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  for (const fn of fns) {
    data = fn(data, headers)
  }

  return data
}

export default transform
