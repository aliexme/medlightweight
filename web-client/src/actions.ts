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

  export const SIGN_IN = 'SIGN_IN' as const
  export type SignIn = A<typeof SIGN_IN, API.MlwAuth.SignIn.Req>

  export const LOGOUT = 'LOGOUT' as const
  export type Logout = AE<typeof LOGOUT>

  export const HISTORY_PUSH = 'HISTORY_PUSH' as const
  export type HistoryPush = A<typeof HISTORY_PUSH, { path: string }>

  export const FETCH_SURVEYS_LIST = 'FETCH_SURVEYS_LIST' as const
  export type FetchSurveysList = AE<typeof FETCH_SURVEYS_LIST>

  export const SET_SURVEYS_LIST = 'SET_SURVEYS_LIST' as const
  export type SetSurveysList = A<typeof SET_SURVEYS_LIST, {
    surveys: CLIENT.Survey[]
    totalCount: number
    concat?: boolean
  }>

  export const CHANGE_SURVEYS_LIST_FILTERS = 'CHANGE_SURVEYS_LIST_FILTERS' as const
  export type ChangeSurveysListFilters = A<typeof CHANGE_SURVEYS_LIST_FILTERS, {
    filters: CLIENT.SurveysListFilters
    options: CLIENT.SurveysListFiltersOptions
  }>
}

export type Action = (
  Actions.AppLoadedState
  | Actions.SetAuthorizedState
  | Actions.ChangeRequestStatus
  | Actions.SignIn
  | Actions.Logout
  | Actions.HistoryPush
  | Actions.FetchSurveysList
  | Actions.SetSurveysList
  | Actions.ChangeSurveysListFilters
)
