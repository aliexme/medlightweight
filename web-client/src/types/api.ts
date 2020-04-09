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
}
