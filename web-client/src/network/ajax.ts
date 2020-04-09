import { Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, timeout } from 'rxjs/operators'

export type RequestHeaders = {
  [key: string]: string
}

export type RequestOptions = {
  headers?: RequestHeaders
  timeout?: number
  formData?: boolean
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
    const reqBody = options?.formData ? this.mapBodyToFormData(body) : body

    return ajax.post(url, reqBody, requestHeaders).pipe(
      timeout(requestTimeout),
      map((result) => result.response),
    )
  }

  path(url: string, body?: object, options?: RequestOptions): Observable<any> {
    const requestHeaders = this.mergeHeaders(options?.headers)
    const requestTimeout = options?.timeout ?? this.timeout
    const reqBody = options?.formData ? this.mapBodyToFormData(body) : body

    return ajax.patch(url, reqBody, requestHeaders).pipe(
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
    if (Object.keys(queryParams).length === 0) {
      return url
    }

    const queryString = Object.keys(queryParams)
      .filter((key) => queryParams[key] !== undefined)
      .map((key) => this.encodeQueryParam(key, queryParams[key]))
      .join('&')

    return `${encodeURI(url)}?${queryString}`
  }

  private encodeQueryParam(key: string, value: QueryType): string {
    if (Array.isArray(value)) {
      return value
        .map((nestedValue) => this.encodeQueryParam(key, nestedValue))
        .join('&')
    }

    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  }

  private mapBodyToFormData(body?: object): FormData {
    const formData = new FormData()

    if (!body) {
      return formData
    }

    for (const [key, value] of Object.entries(body)) {
      if (value === undefined) {
        continue
      }

      if (Array.isArray(value)) {
        value.forEach((nestedValue) => {
          formData.append(key, nestedValue)
        })
      } else {
        formData.append(key, value)
      }
    }

    return formData
  }
}
