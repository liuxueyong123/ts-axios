import { AxiosInterceptorManage, AxiosInterceptorResolvedFn, AxiosInterceptorRejectFn, AxiosInterceptor } from '../types'

export default class InterceptorManage<T> implements AxiosInterceptorManage<T> {
  private _interceptorList: AxiosInterceptor<T>[]

  constructor () {
    this._interceptorList = []
  }

  forEach (callback: (interceptor: AxiosInterceptor<T>) => void): void {
    for (const item of this._interceptorList) {
      if (!item) continue

      callback(item)
    }
  }

  use (resolve: AxiosInterceptorResolvedFn<T>, reject: AxiosInterceptorRejectFn): number {
    this._interceptorList.push({
      resolve,
      reject
    })
    return 1
  }

  eject (interceptorId: number) {}
}
