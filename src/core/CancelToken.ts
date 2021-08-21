import { AxiosRequestConfig } from '../types'

interface Canceler {
  (message?: string): void
}

export class Cancel {
  message?: string

  constructor (message?: string) {
    this.message = message
  }
}

export const isCancel = (attr: any): attr is Cancel => {
  return attr instanceof Cancel
}

export const throwIfCancellationRequested = (config: AxiosRequestConfig) => {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor (executor: (cancel: Canceler) => void) {
    let resolvePromise: any
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      // 多次执行 cancel 函数仅第一次生效
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  public static source () {
    let cancel!: Canceler
    const token = new CancelToken((c) => { cancel = c })

    return {
      token,
      cancel
    }
  }

  throwIfRequested () {
    if (this.reason) {
      throw this.reason
    }
  }
}

export default CancelToken
