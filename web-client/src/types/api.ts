export namespace API {
  export const API_PREFIX = '/api'

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
}
