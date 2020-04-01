import { Map as IMap } from 'immutable'

export namespace CLIENT {
  export enum RequestStatus {
    NOT_STARTED = 'NOT_STARTED',
    LOADING = 'LOADING',
    LOADED = 'LOADED',
    ERROR = 'ERROR',
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
    limit?: number
    offset?: number
  }

  export type SurveysListFiltersOptions = {
    fetchSurveysList?: boolean
  }
}
