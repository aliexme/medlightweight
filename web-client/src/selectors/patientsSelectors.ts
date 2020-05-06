import { createSelector } from 'reselect'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { getPatients } from 'utils/patientsUtils'

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
    return getPatients(patientsListIds, patientsMap)
  },
)
