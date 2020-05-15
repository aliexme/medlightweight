export namespace API {
  export const API_PREFIX = '/api'

  export type Pagination<T> = {
    count: number
    next: string | null
    previous: string | null
    results: T[]
  }

  export enum Gender {
    MALE = 'M',
    FEMALE = 'F',
  }

  export type User = {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
  }

  export type Survey = {
    id: number
    name: string
    description: string | null
    directory: string
    owner: number
    patient: Patient | null
    created_at: string
    updated_at: string
    users: number[]
  }

  export type SurveyComment = {
    id: number
    text: string
    survey: number
    owner: number
    created_at: string
    updated_at: string
  }

  export type Patient = {
    id: number
    name: string
    gender: Gender
    birth: string
    age: number
    owner: number
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

    export namespace Users {
      export const MLW_AUTH_USERS_BASE_URL = MLW_AUTH_PREFIX + '/users/'

      export namespace List {
        export type Req = void
        export type Resp = User[]
      }

      export namespace Current {
        export const URL = MLW_AUTH_USERS_BASE_URL + 'current/'
        export type Req = void
        export type Resp = User
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
        patientId?: number
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
        patient?: number
        files: File[]
        users?: number[]
      }

      export type Resp = Survey
    }

    export namespace Update {
      export type Req = {
        name?: string
        description?: string
        patient?: number | null
        files?: File[]
        users?: number[]
      }

      export type Resp = Survey
    }

    export namespace Delete {
      export type Req = void
      export type Resp = void
    }

    export namespace Comments {
      export const URL_PATH = 'comments/'
      export const MAX_COMMENT_LENGTH = 1024

      export namespace List {
        export type Req = {
          surveyId: number
        }

        export type Resp = SurveyComment[]
      }

      export namespace Create {
        export type Req = {
          survey: number
          text: string
        }

        export type Resp = SurveyComment
      }
    }
  }

  export namespace MlwPatients {
    export const MLW_PATIENTS_BASE_URL = API_PREFIX + '/patients/'

    export namespace List {
      export type Req = {
        page: number
        pageSize: number
        searchText?: string
      }

      export type Resp = Pagination<Patient>
    }

    export namespace Info {
      export type Req = {}

      export type Resp = Patient
    }

    export namespace Create {
      export type Req = {
        name: string
        gender: Gender
        birth: string
      }

      export type Resp = Patient
    }

    export namespace Update {
      export type Req = {
        name?: string
        gender?: Gender
        birth?: string
      }

      export type Resp = Patient
    }

    export namespace Delete {
      export type Req = void
      export type Resp = void
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

    export enum InteractionMode {
      MODE_2D = '2D',
      MODE_3D = '3D',
    }

    export enum RepresentationMode {
      VOLUME = 'Volume',
      SLICE = 'Slice',
    }

    export enum SliceMode {
      XY = 'XY Plane',
      XZ = 'XZ Plane',
      YZ = 'YZ Plane',
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

    export namespace ViewportCameraReset {
      export const Method = 'viewport.camera.reset'

      export type ViewId = string
      export type Args = [ViewId]

      export type Result = string
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

    export namespace RendererInteractionModeSet {
      export const Method = 'renderer.interactionmode.set'

      export type Options = {
        view: string
        mode: InteractionMode
      }
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

    export namespace RendererDICOMOpacityInteraction {
      export const Method = 'renderer.dicom.opacity.interaction'

      export type Options = {
        view: string
        pointDelta: number
        opacityDelta: number
        action: 'down' | 'move' | 'up'
      }
      export type Args = [Options]

      export type Result = boolean
      export type Resp = RpcCallResp<Result>
    }

    export namespace RendererDICOMRepresentationSet {
      export const Method = 'renderer.dicom.representation.set'

      export type Options = {
        view: string
        mode: RepresentationMode
      }
      export type Args = [Options]

      export type Result = boolean
      export type Resp = RpcCallResp<Result>
    }

    export namespace RendererDICOMSliceModeSet {
      export const Method = 'renderer.dicom.slicemode.set'

      export type Options = {
        view: string
        mode: SliceMode
      }
      export type Args = [Options]

      export type Result = boolean
      export type Resp = RpcCallResp<Result>
    }

    export namespace RendererDICOMCurrentSliceGet {
      export const Method = 'renderer.dicom.currentslice.get'

      export type Options = {
        view: string
      }
      export type Args = [Options]

      export type Result = number
      export type Resp = RpcCallResp<Result>
    }

    export namespace RendererDICOMCurrentSliceSet {
      export const Method = 'renderer.dicom.currentslice.set'

      export type Options = {
        view: string
        slice: number
      }
      export type Args = [Options]

      export type Result = boolean
      export type Resp = RpcCallResp<Result>
    }
  }
}
