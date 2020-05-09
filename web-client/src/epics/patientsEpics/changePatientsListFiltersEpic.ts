import { of } from 'rxjs'
import { ofType } from 'redux-observable'

import { Epic } from 'epics/rootEpic'
import { Action, Actions, createActionEmpty } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'

export const changePatientsListFiltersEpic: Epic = (action$) => action$.pipe(
  ofType<Actions.ChangePatientsListFilters>(Actions.CHANGE_PATIENTS_LIST_FILTERS),
  guardMergeMap((action) => {
    const { options } = action.data
    const actions: Action[] = []

    if (options && options.fetchPatientsList) {
      actions.push(createActionEmpty(Actions.API_FETCH_PATIENTS_LIST))
    }

    return of(...actions)
  }),
)
