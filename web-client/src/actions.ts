import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { RequestName } from 'store/requests'

type AE<T> = {
  type: T
}

type A<T, D> = {
  type: T
  data: D
}

export const createActionEmpty = <T>(type: T): AE<T> => ({ type })
export const createAction = <T, D>(type: T, data: D): A<T, D> => ({ type, data })

export namespace Actions {
  export const APP_LOADED_STATE = 'APP_LOADED_STATE' as const
  export type AppLoadedState = A<typeof APP_LOADED_STATE, { loaded: boolean }>

  export const SET_AUTHORIZED_STATE = 'SET_AUTHORIZED_STATE' as const
  export type SetAuthorizedState = A<typeof SET_AUTHORIZED_STATE, { authorized: boolean }>

  export const CHANGE_REQUEST_STATUS = 'CHANGE_REQUEST_STATUS' as const
  export type ChangeRequestStatus = A<typeof CHANGE_REQUEST_STATUS, {
    request: RequestName
    status: CLIENT.RequestStatus
  }>

  export const API_SIGN_IN = 'API_SIGN_IN' as const
  export type ApiSignIn = A<typeof API_SIGN_IN, API.MlwAuth.SignIn.Req>

  export const HISTORY_PUSH = 'HISTORY_PUSH' as const
  export type HistoryPush = A<typeof HISTORY_PUSH, { path: string }>
}

export type Action = (
  Actions.AppLoadedState
  | Actions.SetAuthorizedState
  | Actions.ChangeRequestStatus
  | Actions.ApiSignIn
  | Actions.HistoryPush
)
