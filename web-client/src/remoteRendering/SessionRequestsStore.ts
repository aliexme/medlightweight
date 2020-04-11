import { generateUniqueString } from 'utils/randomUtils'

export class SessionRequestError extends Error {
  name = 'SessionRequestError'
}

export type SessionRequest = {
  id: string
  onResponse(data: any): void
}

export type SessionRequestData = {
  [key: string]: any
}

export interface SessionRequestsStoreConfig {
  timeout?: number
  requestIdProp?: string
}

export class SessionRequestsStore {
  static readonly DEFAULT_REQUEST_ID_PROP = '_requestId'
  static readonly DEFAULT_TIMEOUT = 30 * 1000

  private config: SessionRequestsStoreConfig
  private requests: SessionRequest[] = []

  constructor(config: SessionRequestsStoreConfig) {
    this.config = config
  }

  private get requestIdProp() {
    return this.config.requestIdProp || SessionRequestsStore.DEFAULT_REQUEST_ID_PROP
  }

  private get timeout() {
    return this.config.timeout || SessionRequestsStore.DEFAULT_TIMEOUT
  }

  async createRequest(data: SessionRequestData): Promise<any> {
    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        throw new SessionRequestError('Timeout')
      }, this.timeout)

      this.requests.push({
        id: this.getRequestIdFromData(data),
        onResponse: (data) => {
          clearTimeout(timeoutId)
          resolve(data)
        },
      })
    })
  }

  onMessage(event: MessageEvent) {
    const data = this.parseJSON(event.data)
    const requestId = data && data[this.requestIdProp]
    const requestIndex = this.requests.findIndex((request) => request.id === requestId)

    if (requestIndex !== -1) {
      const request = this.requests[requestIndex]
      request.onResponse(data)
      this.requests.splice(requestIndex, 1)
    }
  }

  mergeRequestIdToData(data: SessionRequestData) {
    data[this.requestIdProp] = this.getRequestIdFromData(data)
  }

  private getRequestIdFromData(data: SessionRequestData): string {
    return data[this.requestIdProp] || generateUniqueString('SessionRequestId')
  }

  private parseJSON(data: any): any | undefined {
    try {
      return JSON.parse(data)
    } catch (error) {
      console.error(error)
      return undefined
    }
  }
}
