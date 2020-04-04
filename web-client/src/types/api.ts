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
    export const MLW_SURVEY_PREFIX = API_PREFIX + '/surveys/'

    export namespace List {
      export const URL = MLW_SURVEY_PREFIX + ''

      export type Req = {
        page: number
        pageSize: number
        searchText?: string
      }

      export type Resp = Pagination<Survey>
    }

    export namespace Create {
      export const URL = MLW_SURVEY_PREFIX + ''

      export type Req = {
        name: string
        description?: string
        files: File[]
      }

      export type Resp = Survey
    }
  }
}
