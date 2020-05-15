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
  export const START_APP_LOADING = 'START_APP_LOADING' as const
  export type StartAppLoading = AE<typeof START_APP_LOADING>

  export const APP_LOADED_STATE = 'APP_LOADED_STATE' as const
  export type AppLoadedState = A<typeof APP_LOADED_STATE, { loaded: boolean }>

  export const SET_AUTHORIZED_STATE = 'SET_AUTHORIZED_STATE' as const
  export type SetAuthorizedState = A<typeof SET_AUTHORIZED_STATE, { authorized: boolean }>

  export const SET_DRAWER_OPEN = 'SET_DRAWER_OPEN' as const
  export type SetDrawerOpen = A<typeof SET_DRAWER_OPEN, { open: boolean }>

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

  export const HISTORY_GO_BACK = 'HISTORY_GO_BACK' as const
  export type HistoryGoBack = AE<typeof HISTORY_GO_BACK>

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

  export const API_EDIT_SURVEY = 'API_EDIT_SURVEY' as const
  export type ApiEditSurvey = A<typeof API_EDIT_SURVEY, API.MlwSurvey.Update.Req & { id: number }>

  export const UPDATE_SURVEYS = 'UPDATE_SURVEYS' as const
  export type UpdateSurveys = A<typeof UPDATE_SURVEYS, { surveys: CLIENT.Survey[] }>

  export const API_DELETE_SURVEY = 'API_DELETE_SURVEY' as const
  export type ApiDeleteSurvey = A<typeof API_DELETE_SURVEY, { surveyId: number }>

  export const API_SURVEY_INFO = 'API_SURVEY_INFO' as const
  export type ApiSurveyInfo = A<typeof API_SURVEY_INFO, { surveyId: number }>

  export const API_FETCH_PATIENTS_LIST = 'API_FETCH_PATIENTS_LIST' as const
  export type ApiFetchPatientsList = AE<typeof API_FETCH_PATIENTS_LIST>

  export const SET_PATIENTS_LIST = 'SET_PATIENTS_LIST' as const
  export type SetPatientsList = A<typeof SET_PATIENTS_LIST, {
    patients: CLIENT.Patient[]
    totalCount: number
  }>

  export const CHANGE_PATIENTS_LIST_FILTERS = 'CHANGE_PATIENTS_LIST_FILTERS' as const
  export type ChangePatientsListFilters = A<typeof CHANGE_PATIENTS_LIST_FILTERS, {
    filters: CLIENT.PatientsListFilters
    options?: CLIENT.PatientsListFiltersOptions
  }>

  export const SEARCH_PATIENTS = 'SEARCH_PATIENTS' as const
  export type SearchPatients = A<typeof SEARCH_PATIENTS, { searchText: string }>

  export const UPDATE_PATIENTS = 'UPDATE_PATIENTS' as const
  export type UpdatePatients = A<typeof UPDATE_PATIENTS, { patients: CLIENT.Patient[] }>

  export const API_PATIENT_INFO = 'API_PATIENT_INFO' as const
  export type ApiPatientInfo = A<typeof API_PATIENT_INFO, { patientId: number }>

  export const API_CREATE_PATIENT = 'API_CREATE_PATIENT' as const
  export type ApiCreatePatient = A<typeof API_CREATE_PATIENT, API.MlwPatients.Create.Req & {
    submitCallback?(patient: CLIENT.Patient): void
  }>

  export const API_EDIT_PATIENT = 'API_EDIT_PATIENT' as const
  export type ApiEditPatient = A<typeof API_EDIT_PATIENT, API.MlwPatients.Update.Req & { id: number }>

  export const API_DELETE_PATIENT = 'API_DELETE_PATIENT' as const
  export type ApiDeletePatient = A<typeof API_DELETE_PATIENT, { patientId: number }>

  export const API_FETCH_AUTOCOMPLETE_PATIENTS = 'API_FETCH_AUTOCOMPLETE_PATIENTS' as const
  export type ApiFetchAutocompletePatients = A<typeof API_FETCH_AUTOCOMPLETE_PATIENTS, { searchText: string }>

  export const SET_AUTOCOMPLETE_PATIENTS = 'SET_AUTOCOMPLETE_PATIENTS' as const
  export type SetAutocompletePatients = A<typeof SET_AUTOCOMPLETE_PATIENTS, { patients: CLIENT.Patient[] }>

  export const API_FETCH_PATIENT_SURVEYS = 'API_FETCH_PATIENT_SURVEYS' as const
  export type ApiFetchPatientSurveys = A<typeof API_FETCH_PATIENT_SURVEYS, { patientId: number }>

  export const SET_PATIENT_SURVEYS_LIST = 'SET_PATIENT_SURVEYS_LIST' as const
  export type SetPatientSurveysList = A<typeof SET_PATIENT_SURVEYS_LIST, {
    patientId: number
    patientSurveysInfo: CLIENT.PatientSurveysInfo
  }>

  export const CHANGE_PATIENT_SURVEYS_FILTERS = 'CHANGE_PATIENT_SURVEYS_FILTERS' as const
  export type ChangePatientSurveysFilters = A<typeof CHANGE_PATIENT_SURVEYS_FILTERS, {
    patientId: number
    filters: CLIENT.SurveysListFilters
    options?: CLIENT.PatientSurveysFiltersOptions
  }>

  export const SEARCH_PATIENT_SURVEYS = 'SEARCH_PATIENT_SURVEYS' as const
  export type SearchPatientSurveys = A<typeof SEARCH_PATIENT_SURVEYS, { patientId: number, searchText: string }>

  export const API_FETCH_USERS_LIST = 'API_FETCH_USERS_LIST' as const
  export type ApiFetchUsersList = AE<typeof API_FETCH_USERS_LIST>

  export const SET_USERS_LIST = 'SET_USERS_LIST' as const
  export type SetUsersList = A<typeof SET_USERS_LIST, { users: CLIENT.User[] }>

  export const API_FETCH_CURRENT_USER_INFO = 'API_FETCH_CURRENT_USER_INFO' as const
  export type ApiFetchCurrentUserInfo = AE<typeof API_FETCH_CURRENT_USER_INFO>

  export const SET_CURRENT_USER = 'SET_CURRENT_USER' as const
  export type SetCurrentUser = A<typeof SET_CURRENT_USER, { currentUser: CLIENT.User }>

  export const API_FETCH_SURVEY_COMMENTS = 'API_FETCH_SURVEY_COMMENTS' as const
  export type ApiFetchSurveyComments = A<typeof API_FETCH_SURVEY_COMMENTS, API.MlwSurvey.Comments.List.Req>

  export const UPDATE_SURVEY_COMMENTS = 'UPDATE_SURVEY_COMMENTS' as const
  export type UpdateSurveyComments = A<typeof UPDATE_SURVEY_COMMENTS, { surveyComments: CLIENT.SurveyComment[] }>

  export const SET_SURVEY_COMMENTS_INFO = 'SET_SURVEY_COMMENTS_INFO' as const
  export type SetSurveyCommentsInfo = A<typeof SET_SURVEY_COMMENTS_INFO, {
    surveyId: number
    surveyCommentsInfo: CLIENT.SurveyCommentsInfo
  }>

  export const API_ADD_COMMENT_TO_SURVEY = 'API_ADD_COMMENT_TO_SURVEY' as const
  export type ApiAddCommentToSurvey = A<typeof API_ADD_COMMENT_TO_SURVEY, API.MlwSurvey.Comments.Create.Req>

  export const ADD_COMMENT_TO_SURVEY_COMMENTS_INFO = 'ADD_COMMENT_TO_SURVEY_COMMENTS_INFO' as const
  export type AddCommentToSurveyCommentsInfo = A<typeof ADD_COMMENT_TO_SURVEY_COMMENTS_INFO, {
    surveyId: number
    surveyCommentId: number
  }>
}

export type Action = (
  Actions.StartAppLoading
  | Actions.AppLoadedState
  | Actions.SetAuthorizedState
  | Actions.SetDrawerOpen
  | Actions.ChangeRequestStatus
  | Actions.CancelRequest
  | Actions.PushModal
  | Actions.PopModal
  | Actions.CloseAllModal
  | Actions.SignIn
  | Actions.Logout
  | Actions.HistoryPush
  | Actions.HistoryGoBack
  | Actions.ApiFetchSurveysList
  | Actions.SetSurveysList
  | Actions.ChangeSurveysListFilters
  | Actions.SearchSurveys
  | Actions.ApiCreateSurvey
  | Actions.ApiEditSurvey
  | Actions.UpdateSurveys
  | Actions.ApiDeleteSurvey
  | Actions.ApiSurveyInfo
  | Actions.ApiFetchPatientsList
  | Actions.SetPatientsList
  | Actions.ChangePatientsListFilters
  | Actions.SearchPatients
  | Actions.UpdatePatients
  | Actions.ApiPatientInfo
  | Actions.ApiCreatePatient
  | Actions.ApiEditPatient
  | Actions.ApiDeletePatient
  | Actions.ApiFetchAutocompletePatients
  | Actions.SetAutocompletePatients
  | Actions.ApiFetchPatientSurveys
  | Actions.SetPatientSurveysList
  | Actions.ChangePatientSurveysFilters
  | Actions.SearchPatientSurveys
  | Actions.ApiFetchUsersList
  | Actions.SetUsersList
  | Actions.ApiFetchCurrentUserInfo
  | Actions.SetCurrentUser
  | Actions.ApiFetchSurveyComments
  | Actions.UpdateSurveyComments
  | Actions.SetSurveyCommentsInfo
  | Actions.ApiAddCommentToSurvey
  | Actions.AddCommentToSurveyCommentsInfo
)
