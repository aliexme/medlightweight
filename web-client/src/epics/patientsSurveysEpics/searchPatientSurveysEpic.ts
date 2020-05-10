import { of } from 'rxjs'
import { ofType } from 'redux-observable'

import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardSwitchMap, searchDebounce } from 'utils/epicsUtils'

export const searchPatientSurveysEpic: Epic = (action$) => action$.pipe(
  ofType<Actions.SearchPatientSurveys>(Actions.SEARCH_PATIENT_SURVEYS),
  searchDebounce((action) => action.data.searchText),
  guardSwitchMap((action) => {
    return of(
      createAction(Actions.CHANGE_PATIENT_SURVEYS_FILTERS, {
        patientId: action.data.patientId,
        filters: { searchText: action.data.searchText },
        options: { fetchPatientSurveys: true },
      }),
    )
  }),
)
