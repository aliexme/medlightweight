import { of } from 'rxjs'
import { ofType } from 'redux-observable'

import { Epic } from 'epics/rootEpic'
import { Action, Actions, createActionEmpty } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'

export const changeSurveysListFiltersEpic: Epic = (action$) => action$.pipe(
  ofType<Actions.ChangeSurveysListFilters>(Actions.CHANGE_SURVEYS_LIST_FILTERS),
  guardMergeMap((action) => {
    const { options } = action.data
    const actions: Action[] = []

    if (options && options.fetchSurveysList) {
      actions.push(createActionEmpty(Actions.API_FETCH_SURVEYS_LIST))
    }

    return of(...actions)
  }),
)
