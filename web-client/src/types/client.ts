import { Map as IMap } from 'immutable'

import { API } from 'types/api'

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
    | Requests.DeleteSurveyRequest
    | Requests.FetchSurveyInfoRequest
    | Requests.FetchPatientsListRequest
    | Requests.FetchPatientInfoRequest
    | Requests.CreatePatientRequest
    | Requests.EditPatientRequest
    | Requests.DeletePatientRequest
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

    export const DELETE_SURVEY_REQUEST = 'DELETE_SURVEY_REQUEST' as const
    export type DeleteSurveyRequest = typeof DELETE_SURVEY_REQUEST

    export const FETCH_SURVEY_INFO_REQUEST = 'FETCH_SURVEY_INFO_REQUEST' as const
    export type FetchSurveyInfoRequest = typeof FETCH_SURVEY_INFO_REQUEST

    export const FETCH_PATIENTS_LIST_REQUEST = 'FETCH_PATIENTS_LIST_REQUEST' as const
    export type FetchPatientsListRequest = typeof FETCH_PATIENTS_LIST_REQUEST

    export const FETCH_PATIENT_INFO_REQUEST = 'FETCH_PATIENT_INFO_REQUEST' as const
    export type FetchPatientInfoRequest = typeof FETCH_PATIENT_INFO_REQUEST

    export const CREATE_PATIENT_REQUEST = 'CREATE_PATIENT_REQUEST' as const
    export type CreatePatientRequest = typeof CREATE_PATIENT_REQUEST

    export const EDIT_PATIENT_REQUEST = 'EDIT_PATIENT_REQUEST' as const
    export type EditPatientRequest = typeof EDIT_PATIENT_REQUEST

    export const DELETE_PATIENT_REQUEST = 'DELETE_PATIENT_REQUEST' as const
    export type DeletePatientRequest = typeof DELETE_PATIENT_REQUEST
  }

  /* Modals */

  export type Modal = (
    Modals.SurveyModal
    | Modals.ConfirmModal
    | Modals.PatientModal
  )

  export type ModalProps<T extends Modal> = T['props'] & {
    close(): void
    closeAll(): void
  }

  export namespace Modals {
    export const CONFIRM_MODAL_TYPE = 'CONFIRM_MODAL_TYPE' as const
    export const SURVEY_MODAL_TYPE = 'SURVEY_MODAL_TYPE' as const
    export const PATIENT_MODAL_TYPE = 'PATIENT_MODAL_TYPE' as const

    export type ConfirmModal = {
      type: typeof CONFIRM_MODAL_TYPE
      props: {
        title?: string
        description?: string
        cancelButtonText?: string
        okButtonText?: string
        requestName?: RequestName
        onCancelClick?(): void
        onOkClick?(): void
      }
    }

    export type SurveyModal = {
      type: typeof SURVEY_MODAL_TYPE
      props?: {
        survey?: Survey
      }
    }

    export type PatientModal = {
      type: typeof PATIENT_MODAL_TYPE
      props?: {
        patient?: Patient
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

  /* Patients */

  export type Patient = {
    id: number
    name: string
    gender: API.Gender
    birth: Date
    age: number
    ownerId: number
    createdAt: Date
    updatedAt: Date
  }

  export type PatientsMap = IMap<number, Patient>

  export type PatientsListFilters = {
    page?: number
    pageSize?: number
    searchText?: string
  }

  export type PatientsListFiltersOptions = {
    fetchPatientsList?: boolean
  }

  /* Events */

  export type InteractionEvent = {
    srcEvent: Event
    target: HTMLElement
    isFirst: boolean
    isFinal: boolean
  }

  export type PanInteractionEvent = InteractionEvent & {
    srcEvent: MouseEvent | PointerEvent | TouchEvent
  }

  export type PointerInteractionEvent = PanInteractionEvent & {
    srcEvent: PointerEvent
    deltaX: number
    deltaY: number
  }

  export type ZoomInteractionEvent = InteractionEvent & {
    srcEvent: WheelEvent
    deltaX: number
    deltaY: number
  }

  /* Remote Rendering */

  export namespace RemoteRendering {
    export enum InteractionMode {
      MODE_2D = '2D',
      MODE_3D = '3D',
      OPACITY = 'OPACITY',
    }

    export type RenderImageOptions = {
      size: [number, number]
      interact: boolean
    }
  }

  export namespace ParaView {
    export namespace ViewportMouseInteraction {
      export type Options = {
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
    }

    export namespace ViewportImageRender {
      export type Options = {
        size: [number, number]
        mtime: number
        quality: number
        localTime: number
        clearCache: boolean
      }
    }

    export namespace RendererDICOMRender {
      export type Options = {
        path: string
      }
    }

    export namespace RendererInteractionModeSet {
      export type Options = {
        mode: API.ParaView.InteractionMode
      }
    }

    export namespace RendererDICOMOpacityInteraction {
      export type Options = {
        pointDelta: number
        opacityDelta: number
        action: 'down' | 'move' | 'up'
      }
    }
  }
}
