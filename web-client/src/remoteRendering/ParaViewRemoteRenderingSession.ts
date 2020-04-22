import { CLIENT } from 'types/client'
import { API } from 'types/api'

import { RemoteRenderingSession, RemoteRenderingSessionConfig } from './RemoteRenderingSession'

export interface ParaViewRemoteRenderingSessionConfig extends RemoteRenderingSessionConfig {
  wslinkSecret: string
}

type ConstructorConfig = Omit<ParaViewRemoteRenderingSessionConfig, 'requestIdProp'>

export class ParaViewRemoteRenderingSession extends RemoteRenderingSession<ParaViewRemoteRenderingSessionConfig> {
  static readonly WSLINK_VERSION = '1.0'
  static readonly REQUEST_ID_PROP = 'id'
  static readonly PING_INTERVAL = 10 * 1000

  private pingIntervalId: NodeJS.Timeout = null

  private systemRpcCallId = 0
  private clientRpcCallId = 0
  private clientId = 'c0'
  private viewId = '-1'

  constructor(config: ConstructorConfig) {
    super({
      ...config,
      requestIdProp: ParaViewRemoteRenderingSession.REQUEST_ID_PROP,
    })
  }

  protected onWsClose(_event: CloseEvent) {
    this.clearRendererPingInterval()
  }

  setClientId(clientId: string) {
    this.clientId = clientId
  }

  setViewId(viewId: string) {
    this.viewId = viewId
  }

  startRendererPingInterval() {
    this.pingIntervalId = setInterval(() => {
      this.rendererPing().then()
    }, ParaViewRemoteRenderingSession.PING_INTERVAL)
  }

  clearRendererPingInterval() {
    clearInterval(this.pingIntervalId)
    this.pingIntervalId = null
  }

  async wslinkHello(): Promise<API.ParaView.WslinkHello.Resp> {
    const options: API.ParaView.WslinkHello.Options = { secret: this.config.wslinkSecret }
    const args: API.ParaView.WslinkHello.Args = [options]
    return await this.systemRpcCall(API.ParaView.WslinkHello.Method, args)
  }

  async rendererDestroy(): Promise<API.ParaView.RendererDestroy.Resp> {
    const options: API.ParaView.RendererDestroy.Options = { view: this.viewId }
    const args: API.ParaView.RendererDestroy.Args = [options]
    return await this.clientRpcCall(API.ParaView.RendererDestroy.Method, args)
  }

  async rendererPing(): Promise<API.ParaView.RendererPing.Resp> {
    const options: API.ParaView.RendererPing.Options = { view: this.viewId }
    const args: API.ParaView.RendererPing.Args = [options]
    return await this.clientRpcCall(API.ParaView.RendererPing.Method, args)
  }

  async rendererDICOMRender(
    options: CLIENT.ParaView.RendererDICOMRender.Options,
  ): Promise<API.ParaView.RendererDICOMRender.Resp> {
    const reqOptions: API.ParaView.RendererDICOMRender.Options = {
      ...options,
    }
    const args: API.ParaView.RendererDICOMRender.Args = [reqOptions]
    return await this.clientRpcCall(API.ParaView.RendererDICOMRender.Method, args)
  }

  async viewportMouseInteraction(
    options: CLIENT.ParaView.ViewportMouseInteraction.Options,
  ): Promise<API.ParaView.ViewportMouseInteraction.Resp> {
    const reqOptions: API.ParaView.ViewportMouseInteraction.Options = {
      ...options,
      view: this.viewId,
    }
    const args: API.ParaView.ViewportMouseInteraction.Args = [reqOptions]
    return await this.clientRpcCall(API.ParaView.ViewportMouseInteraction.Method, args)
  }

  async viewportImageRender(
    options: CLIENT.ParaView.ViewportImageRender.Options,
  ): Promise<API.ParaView.ViewportImageRender.Resp> {
    const reqOptions: API.ParaView.ViewportImageRender.Options = {
      ...options,
      view: this.viewId,
    }
    const args: API.ParaView.ViewportImageRender.Args = [reqOptions]
    return await this.clientRpcCall(API.ParaView.ViewportImageRender.Method, args)
  }

  private async systemRpcCall(method: string, args: Array<any> = [], kwargs: object = {}) {
    return this.rpcCall({
      wslink: ParaViewRemoteRenderingSession.WSLINK_VERSION,
      id: `system:${this.clientId}:${this.systemRpcCallId++}`,
      method,
      args,
      kwargs,
    })
  }

  private async clientRpcCall(method: string, args: Array<any> = [], kwargs: object = {}) {
    return this.rpcCall({
      wslink: ParaViewRemoteRenderingSession.WSLINK_VERSION,
      id: `rpc:${this.clientId}:${this.clientRpcCallId++}`,
      method,
      args,
      kwargs,
    })
  }

  private async rpcCall(data: API.ParaView.RpcCallReq): Promise<API.ParaView.RpcCallResp> {
    return this.sendRequest(data)
  }
}
