import { Reducer } from 'redux'
import { Map as IMap } from 'immutable'

import { CLIENT } from 'types/client'
import { Action, Actions } from 'actions'
import { DEFAULT_PATIENT_SURVEYS_PAGE_SIZE } from 'utils/patientsSurveysUtils'

export type PatientsSurveysState = {
  patientsSurveysMap: CLIENT.PatientsSurveysMap
  patientSurveysFilters: CLIENT.SurveysListFilters
}

export const defaultPatientsSurveysState: PatientsSurveysState = {
  patientsSurveysMap: IMap(),
  patientSurveysFilters: {
    page: 1,
    pageSize: DEFAULT_PATIENT_SURVEYS_PAGE_SIZE,
  },
}

export const patientsSurveysReducer: Reducer<PatientsSurveysState, Action> = (
  state = defaultPatientsSurveysState,
  action,
) => {
  switch (action.type) {
    case Actions.SET_PATIENT_SURVEYS_LIST: {
      const { patientId, patientSurveysInfo } = action.data

      return {
        ...state,
        patientsSurveysMap: state.patientsSurveysMap.set(patientId, patientSurveysInfo),
      }
    }

    case Actions.CHANGE_PATIENT_SURVEYS_FILTERS: {
      return {
        ...state,
        patientSurveysFilters: {
          ...state.patientSurveysFilters,
          ...action.data.filters,
          page: action.data.filters.page ?? 1,
        },
      }
    }
  }

  return state
}
