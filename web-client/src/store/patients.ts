import { Reducer } from 'redux'
import { Map as IMap } from 'immutable'

import { CLIENT } from 'types/client'
import { Action, Actions } from 'actions'
import { mergeArrayToMap } from 'utils/immutableUtils'
import { DEFAULT_PATIENTS_LIST_FILTERS_PAGE_SIZE } from 'utils/patientsUtils'

export type PatientsState = {
  patientsListIds: number[]
  patientsMap: CLIENT.PatientsMap
  patientsTotalCount: number
  filters: CLIENT.PatientsListFilters
  autocompletePatientIds: number[]
}

export const defaultPatientsState: PatientsState = {
  patientsListIds: [],
  patientsMap: IMap(),
  patientsTotalCount: 0,
  filters: {
    page: 1,
    pageSize: DEFAULT_PATIENTS_LIST_FILTERS_PAGE_SIZE,
  },
  autocompletePatientIds: [],
}

export const patientsReducer: Reducer<PatientsState, Action> = (state = defaultPatientsState, action) => {
  switch (action.type) {
    case Actions.SET_PATIENTS_LIST: {
      const { patients, totalCount } = action.data
      const patientIds = patients.map((patient) => patient.id)

      return {
        ...state,
        patientsListIds: patientIds,
        patientsMap: mergeArrayToMap(state.patientsMap, patients),
        patientsTotalCount: totalCount,
      }
    }

    case Actions.CHANGE_PATIENTS_LIST_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.data.filters,
          page: action.data.filters.page ?? 1,
        },
      }
    }

    case Actions.UPDATE_PATIENTS: {
      const { patients } = action.data

      return {
        ...state,
        patientsMap: mergeArrayToMap(state.patientsMap, patients),
      }
    }

    case Actions.SET_AUTOCOMPLETE_PATIENTS: {
      const { patients } = action.data
      const patientIds = patients.map((patient) => patient.id)

      return {
        ...state,
        autocompletePatientIds: patientIds,
        patientsMap: mergeArrayToMap(state.patientsMap, patients),
      }
    }
  }

  return state
}
