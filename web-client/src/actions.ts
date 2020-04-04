import { CLIENT } from 'types/client'
import { API } from 'types/api'

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
    request: CLIENT.RequestName
    status: CLIENT.RequestStatus
  }>

  export const CANCEL_REQUEST = 'CANCEL_REQUEST' as const
  export type CancelRequest = A<typeof CANCEL_REQUEST, { request: CLIENT.RequestName }>

  export const PUSH_MODAL = 'PUSH_MODAL' as const
  export type PushModal = A<typeof PUSH_MODAL, CLIENT.Modal>

  export const POP_MODAL = 'POP_MODAL' as const
  export type PopModal = AE<typeof POP_MODAL>

  export const CLOSE_ALL_MODAL = 'CLOSE_ALL_MODAL' as const
  export type CloseAllModal = AE<typeof CLOSE_ALL_MODAL>

  export const SIGN_IN = 'SIGN_IN' as const
  export type SignIn = A<typeof SIGN_IN, API.MlwAuth.SignIn.Req>

  export const LOGOUT = 'LOGOUT' as const
  export type Logout = AE<typeof LOGOUT>

  export const HISTORY_PUSH = 'HISTORY_PUSH' as const
  export type HistoryPush = A<typeof HISTORY_PUSH, { path: string }>

  export const API_FETCH_SURVEYS_LIST = 'API_FETCH_SURVEYS_LIST' as const
  export type ApiFetchSurveysList = AE<typeof API_FETCH_SURVEYS_LIST>

  export const SET_SURVEYS_LIST = 'SET_SURVEYS_LIST' as const
  export type SetSurveysList = A<typeof SET_SURVEYS_LIST, {
    surveys: CLIENT.Survey[]
    totalCount: number
  }>

  export const CHANGE_SURVEYS_LIST_FILTERS = 'CHANGE_SURVEYS_LIST_FILTERS' as const
  export type ChangeSurveysListFilters = A<typeof CHANGE_SURVEYS_LIST_FILTERS, {
    filters: CLIENT.SurveysListFilters
    options?: CLIENT.SurveysListFiltersOptions
  }>

  export const SEARCH_SURVEYS = 'SEARCH_SURVEYS' as const
  export type SearchSurveys = A<typeof SEARCH_SURVEYS, { searchText: string }>

  export const API_CREATE_SURVEY = 'API_CREATE_SURVEY' as const
  export type ApiCreateSurvey = A<typeof API_CREATE_SURVEY, API.MlwSurvey.Create.Req>

  export const UPDATE_SURVEYS = 'UPDATE_SURVEYS' as const
  export type UpdateSurveys = A<typeof UPDATE_SURVEYS, { surveys: CLIENT.Survey[] }>
}

export type Action = (
  Actions.AppLoadedState
  | Actions.SetAuthorizedState
  | Actions.ChangeRequestStatus
  | Actions.CancelRequest
  | Actions.PushModal
  | Actions.PopModal
  | Actions.CloseAllModal
  | Actions.SignIn
  | Actions.Logout
  | Actions.HistoryPush
  | Actions.ApiFetchSurveysList
  | Actions.SetSurveysList
  | Actions.ChangeSurveysListFilters
  | Actions.SearchSurveys
  | Actions.ApiCreateSurvey
  | Actions.UpdateSurveys
)
