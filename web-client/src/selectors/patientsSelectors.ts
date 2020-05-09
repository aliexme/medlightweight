import { createSelector } from 'reselect'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { getPatientsByIds } from 'utils/patientsUtils'

export const getPatientsSelector = createSelector<
  Store,
  number[],
  CLIENT.PatientsMap,
  CLIENT.Patient[]
>(
  [
    (state) => state.patients.patientsListIds,
    (state) => state.patients.patientsMap,
  ],
  (patientsListIds, patientsMap) => {
    return getPatientsByIds(patientsListIds, patientsMap)
  },
)

export const getAutocompletePatientsSelector = createSelector<
  Store,
  number[],
  CLIENT.PatientsMap,
  CLIENT.Patient[]
>(
  [
    (state) => state.patients.autocompletePatientIds,
    (state) => state.patients.patientsMap,
  ],
  (autocompletePatientIds, patientsMap) => {
    return getPatientsByIds(autocompletePatientIds, patientsMap)
  },
)
