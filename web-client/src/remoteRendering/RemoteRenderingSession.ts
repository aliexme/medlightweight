import { Session, SessionConfig } from './Session'

export class RemoteRenderingSessionError extends Error {
  name = 'RemoteRenderingSessionError'
}

export interface RemoteRenderingSessionConfig extends SessionConfig {}

export class RemoteRenderingSession<
  Config extends RemoteRenderingSessionConfig = RemoteRenderingSessionConfig
> extends Session<Config> {}
