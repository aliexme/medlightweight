export class DeferredPromise<T> {
  private readonly promise: Promise<T>

  then: Promise<T>['then']
  catch: Promise<T>['catch']

  resolve: () => void
  reject: () => void

  constructor(executor?: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject

      if (executor) {
        executor(resolve, reject)
      }
    })

    this.then = this.promise.then.bind(this.promise)
    this.catch = this.promise.catch.bind(this.promise)
  }
}
