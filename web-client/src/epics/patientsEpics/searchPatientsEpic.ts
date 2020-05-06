import { of } from 'rxjs'
import { ofType } from 'redux-observable'

import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardSwitchMap, searchDebounce } from 'utils/epicsUtils'

export const searchPatientsEpic: Epic = (action$) => action$.pipe(
  ofType<Actions.SearchPatients>(Actions.SEARCH_PATIENTS),
  searchDebounce((action) => action.data.searchText),
  guardSwitchMap((action) => {
    return of(
      createAction(Actions.CHANGE_PATIENTS_LIST_FILTERS, {
        filters: { searchText: action.data.searchText },
        options: { fetchPatientsList: true },
      }),
    )
  }),
)
