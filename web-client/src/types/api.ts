export namespace API {
  export const API_PREFIX = '/api'

  export type Pagination<T> = {
    count: number
    next: string | null
    previous: string | null
    results: T[]
  }

  export type Survey = {
    id: number
    name: string
    description: string | null
    directory: string
    owner: number
    patient: number | null
    created_at: string
    updated_at: string
  }

  export namespace MlwAuth {
    export const MLW_AUTH_PREFIX = API_PREFIX + '/auth'

    export namespace SignIn {
      export const URL = MLW_AUTH_PREFIX + '/signin'

      export type Req = {
        username: string
        password: string
      }

      export type Resp = {
        token: string
      }
    }
  }

  export namespace MlwSurvey {
    export const MLW_SURVEYS_BASE_URL = API_PREFIX + '/surveys/'

    export namespace List {
      export type Req = {
        page: number
        pageSize: number
        searchText?: string
      }

      export type Resp = Pagination<Survey>
    }

    export namespace Info {
      export type Req = {}

      export type Resp = Survey
    }

    export namespace Create {
      export type Req = {
        name: string
        description?: string
        files: File[]
      }

      export type Resp = Survey
    }

    export namespace Update {
      export type Req = {
        name?: string
        description?: string
        files?: File[]
      }

      export type Resp = Survey
    }
  }

  export namespace ParaView {
    export enum KeyCodeModifier {
      NONE = 0,
      ALT = 1,
      META = 2,
      SHIFT = 4,
      CTRL = 8,
    }

    export type RpcCallReq = {
      wslink: string
      id: string
      method: string
      args: Array<any>
      kwargs: object
    }

    export type RpcCallResp<Result = any> = {
      wslink: string
      id: string
      result: Result
    }

    export namespace WslinkHello {
      export const Method = 'wslink.hello'

      export type Options = { secret: string }
      export type Args = [Options]

      export type Result = { clientID: string }
      export type Resp = RpcCallResp<Result>
    }

    export namespace ViewportMouseInteraction {
      export const Method = 'viewport.mouse.interaction'

      export type Options = {
        view: string
        x: number
        y: number
        buttonLeft: boolean
        buttonMiddle: boolean
        buttonRight: boolean
        shiftKey: number | boolean
        ctrlKey: number | boolean
        altKey: number | boolean
        metaKey: number | boolean
        action: 'down' | 'move' | 'up'
      }
      export type Args = [Options]

      export type Result = boolean
      export type Resp = RpcCallResp<Result>
    }

    export namespace ViewportImageRender {
      export const Method = 'viewport.image.render'

      export type Options = {
        view: string
        size: [number, number]
        mtime: number
        quality: number
        localTime: number
        clearCache: boolean
      }
      export type Args = [Options]

      export type Result = {
        format: string
        image: string
        workTime: number
        global_id: string
        mtime: number
        stale: boolean
        localTime: number
        size: [number, number]
      }
      export type Resp = RpcCallResp<Result>
    }

    export namespace RendererDestroy {
      export const Method = 'renderer.destroy'

      export type Options = { view: string }
      export type Args = [Options]

      export type Result = boolean
      export type Resp = RpcCallResp<Result>
    }

    export namespace RendererPing {
      export const Method = 'renderer.ping'

      export type Options = { view: string }
      export type Args = [Options]

      export type Result = boolean
      export type Resp = RpcCallResp<Result>
    }

    export namespace RendererDICOMRender {
      export const Method = 'renderer.dicom.render'

      export type Options = { path: string }
      export type Args = [Options]

      export type Result = { view: string }
      export type Resp = RpcCallResp<Result>
    }
  }
}
