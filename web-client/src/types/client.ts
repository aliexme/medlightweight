import { Map as IMap } from 'immutable'

export namespace CLIENT {
  /* Requests */

  export enum RequestStatus {
    NOT_STARTED = 'NOT_STARTED',
    LOADING = 'LOADING',
    CANCELED = 'CANCELED',
    LOADED = 'LOADED',
    ERROR = 'ERROR',
  }

  export type RequestName = (
    Requests.SignInRequest
    | Requests.LoadAppRequest
    | Requests.FetchSurveysListRequest
    | Requests.CreateSurveyRequest
    | Requests.EditSurveyRequest
    | Requests.FetchSurveyInfoRequest
  )

  export namespace Requests {
    export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST' as const
    export type SignInRequest = typeof SIGN_IN_REQUEST

    export const LOAD_APP_REQUEST = 'LOAD_APP_REQUEST' as const
    export type LoadAppRequest = typeof LOAD_APP_REQUEST

    export const FETCH_SURVEYS_LIST_REQUEST = 'FETCH_SURVEYS_LIST_REQUEST' as const
    export type FetchSurveysListRequest = typeof FETCH_SURVEYS_LIST_REQUEST

    export const CREATE_SURVEY_REQUEST = 'CREATE_SURVEY_REQUEST' as const
    export type CreateSurveyRequest = typeof CREATE_SURVEY_REQUEST

    export const EDIT_SURVEY_REQUEST = 'EDIT_SURVEY_REQUEST' as const
    export type EditSurveyRequest = typeof EDIT_SURVEY_REQUEST

    export const FETCH_SURVEY_INFO_REQUEST = 'FETCH_SURVEY_INFO_REQUEST' as const
    export type FetchSurveyInfoRequest = typeof FETCH_SURVEY_INFO_REQUEST
  }

  /* Modals */

  export type Modal = (
    Modals.AddSurveyModal
  )

  export type ModalProps<T extends Modal> = T['props'] & {
    close(): void
    closeAll(): void
  }

  export namespace Modals {
    export const SURVEY_MODAL_TYPE = 'SURVEY_MODAL_TYPE' as const

    export type AddSurveyModal = {
      type: typeof SURVEY_MODAL_TYPE
      props?: {
        survey?: Survey
      }
    }
  }

  /* Surveys */

  export type Survey = {
    id: number
    name: string
    description?: string
    directory: string
    createdAt: Date
    updatedAt: Date
    ownerId: number
    patientId?: number
  }

  export type SurveysMap = IMap<number, Survey>

  export type SurveysListFilters = {
    page?: number
    pageSize?: number
    searchText?: string
  }

  export type SurveysListFiltersOptions = {
    fetchSurveysList?: boolean
  }
}
