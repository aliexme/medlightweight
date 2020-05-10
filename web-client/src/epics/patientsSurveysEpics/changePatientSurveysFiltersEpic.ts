import { of } from 'rxjs'
import { ofType } from 'redux-observable'

import { Epic } from 'epics/rootEpic'
import { Action, Actions, createAction } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'

export const changePatientSurveysFiltersEpic: Epic = (action$) => action$.pipe(
  ofType<Actions.ChangePatientSurveysFilters>(Actions.CHANGE_PATIENT_SURVEYS_FILTERS),
  guardMergeMap((action) => {
    const { patientId, options } = action.data
    const actions: Action[] = []

    if (options && options.fetchPatientSurveys) {
      actions.push(createAction(Actions.API_FETCH_PATIENT_SURVEYS, { patientId }))
    }

    return of(...actions)
  }),
)
