import { Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, timeout } from 'rxjs/operators'

export type RequestHeaders = {
  [key: string]: string
}

export type RequestOptions = {
  headers?: RequestHeaders
  timeout?: number
}

export type QueryType = string | number | boolean | Array<QueryType>

export type QueryParams = {
  [key: string]: QueryType
}

export class AjaxObservable {
  private readonly timeout = Infinity
  private headers: RequestHeaders = {}

  constructor(options?: RequestOptions) {
    if (options && options.headers !== undefined) {
      this.headers = options.headers
    }

    if (options && options.timeout !== undefined) {
      this.timeout = options.timeout
    }
  }

  get(url: string, queryParams: QueryParams, options?: RequestOptions): Observable<any> {
    const requestHeaders = this.mergeHeaders(options?.headers)
    const requestTimeout = options?.timeout ?? this.timeout
    const queryUrl = this.buildUrlWithQueryParams(url, queryParams)

    return ajax.get(queryUrl, requestHeaders).pipe(
      timeout(requestTimeout),
      map((result) => result.response),
    )
  }

  post(url: string, body?: object, options?: RequestOptions): Observable<any> {
    const requestHeaders = this.mergeHeaders(options?.headers)
    const requestTimeout = options?.timeout ?? this.timeout

    return ajax.post(url, body, requestHeaders).pipe(
      timeout(requestTimeout),
      map((result) => result.response),
    )
  }

  setHeaders(headers: RequestHeaders) {
    this.headers = this.mergeHeaders(headers)
  }

  private mergeHeaders(headers?: RequestHeaders): RequestHeaders {
    return {
      ...this.headers,
      ...headers,
    }
  }

  private buildUrlWithQueryParams(url: string, queryParams: QueryParams) {
    if (Object.values(queryParams).length === 0) {
      return url
    }

    let result = url + '?'

    for (const [key, value] of Object.entries(queryParams)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          result += `${key}=${item}&`
        })
      } else {
        result += `${key}=${value}&`
      }
    }

    return result.slice(0, -1)
  }
}
