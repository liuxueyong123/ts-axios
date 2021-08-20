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

class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor (executor: (cancel: Canceler) => void) {
    let resolvePromise: any
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
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
}

export default CancelToken
