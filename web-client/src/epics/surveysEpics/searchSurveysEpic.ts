import { of } from 'rxjs'
import { ofType } from 'redux-observable'

import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardSwitchMap, searchDebounce } from 'utils/epicsUtils'

export const searchSurveysEpic: Epic = (action$) => action$.pipe(
  ofType<Actions.SearchSurveys>(Actions.SEARCH_SURVEYS),
  searchDebounce((action) => action.data.searchText),
  guardSwitchMap((action) => {
    return of(
      createAction(Actions.CHANGE_SURVEYS_LIST_FILTERS, {
        filters: { searchText: action.data.searchText },
        options: { fetchSurveysList: true },
      }),
    )
  }),
)
