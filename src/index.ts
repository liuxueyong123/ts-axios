import AxiosClass from './core/Axios'
import defaults from './core/defaults'
import { AxiosInstance } from './types'
export * from './types'

const instance = new AxiosClass(defaults)

const axios: unknown = AxiosClass.prototype.request.bind(instance)
Object.setPrototypeOf(axios, instance)

export default axios as AxiosInstance
