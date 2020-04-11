import { SessionRequestsStore, SessionRequestsStoreConfig, SessionRequestData } from './SessionRequestsStore'

export class SessionError extends Error {
  name = 'SessionError'
}

export type WebSocketOnOpenHandler = (event: Event) => void
export type WebSocketOnCloseHandler = (event: CloseEvent) => void
export type WebSocketOnErrorHandler = (event: Event) => void
export type WebSocketOnMessageHandler = (event: MessageEvent) => void

export type OnSessionReadyCallback = () => void

export interface SessionConfig extends SessionRequestsStoreConfig {
  url: string
}

export class Session<Config extends SessionConfig = SessionConfig> {
  protected connection: WebSocket | null = null
  protected config: Config
  protected onSessionReadyCallback?: OnSessionReadyCallback

  private requestsStore: SessionRequestsStore
  private onOpenCallback?: WebSocketOnOpenHandler
  private onCloseCallback?: WebSocketOnCloseHandler
  private onErrorCallback?: WebSocketOnErrorHandler
  private onMessageCallback?: WebSocketOnMessageHandler

  constructor(config: Config) {
    this.config = config
    this.requestsStore = new SessionRequestsStore(config)
  }

  get connectionStatus() {
    return this.connection.readyState
  }

  connect() {
    try {
      this.connection = new WebSocket(this.config.url)
      this.connection.onopen = this.onOpenHandler.bind(this)
      this.connection.onclose = this.onCloseHandler.bind(this)
      this.connection.onerror = this.onErrorHandler.bind(this)
      this.connection.onmessage = this.onMessageHandler.bind(this)
    } catch (error) {
      console.error(error)
    }
  }

  close() {
    if (this.connection) {
      this.connection.close()
    }
  }

  onOpen(onOpenCallback: WebSocketOnOpenHandler) {
    this.onOpenCallback = onOpenCallback
  }

  onClose(onCloseCallback: WebSocketOnCloseHandler) {
    this.onCloseCallback = onCloseCallback
  }

  onError(onErrorCallback: WebSocketOnErrorHandler) {
    this.onErrorCallback = onErrorCallback
  }

  onMessage(onMessageCallback: WebSocketOnMessageHandler) {
    this.onMessageCallback = onMessageCallback
  }

  onSessionReady(onSessionReadyCallback: OnSessionReadyCallback) {
    this.onSessionReadyCallback = onSessionReadyCallback
  }

  sendMessage(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    this.throwErrorIfNotConnection()
    this.connection.send(data)
  }

  async sendRequest(data: SessionRequestData) {
    this.requestsStore.mergeRequestIdToData(data)
    const jsonData = JSON.stringify(data)
    this.sendMessage(jsonData)
    return this.requestsStore.createRequest(data)
  }

  protected onWsOpen(_event: Event) {
    return
  }

  protected onWsClose(_event: CloseEvent) {
    return
  }

  protected onWsError(_event: Event) {
    return
  }

  protected onWsMessage(_event: MessageEvent) {
    return
  }

  protected throwErrorIfNotConnection() {
    if (!this.connection) {
      throw new SessionError('Not connection')
    }
  }

  private onOpenHandler(event: Event) {
    this.onWsOpen(event)

    if (this.onOpenCallback) {
      this.onOpenCallback(event)
    }
  }

  private onCloseHandler(event: CloseEvent) {
    this.onWsClose(event)

    if (this.onCloseCallback) {
      this.onCloseCallback(event)
    }
  }

  private onErrorHandler(event: Event) {
    this.onWsError(event)

    if (this.onErrorCallback) {
      this.onErrorCallback(event)
    }
  }

  private onMessageHandler(event: MessageEvent) {
    this.onWsMessage(event)
    this.requestsStore.onMessage(event)

    if (this.onMessageCallback) {
      this.onMessageCallback(event)
    }
  }
}
