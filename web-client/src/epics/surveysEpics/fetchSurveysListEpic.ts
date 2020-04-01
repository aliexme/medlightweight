import { concat, of, throwError } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap, startWith } from 'rxjs/operators'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Actions, createAction } from 'actions'
import { Epic } from 'epics/rootEpic'
import { guardMergeMap } from 'utils/epicUtils'
import { mapApiSurveyToClient } from 'utils/surveysUtils'

export const fetchSurveysListEpic: Epic = (action$, state$, deps) => action$.pipe(
  ofType<Actions.FetchSurveysList>(Actions.FETCH_SURVEYS_LIST),
  guardMergeMap(() => {
    const { filters } = state$.value.surveys
    const req: API.MlwSurvey.List.Req = {
      limit: filters.limit,
      offset: filters.offset,
    }

    return deps.ajax.get(API.MlwSurvey.List.URL, req).pipe(
      mergeMap((resp: API.MlwSurvey.List.Resp) => {
        const clientSurveys = resp.results.map((apiSurvey) => mapApiSurveyToClient(apiSurvey))

        return of(
          createAction(Actions.SET_SURVEYS_LIST, {
            surveys: clientSurveys,
            totalCount: resp.count,
            concat: req.offset !== 0,
          }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: 'fetchSurveysListRequest' as const,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: 'fetchSurveysListRequest' as const,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: 'fetchSurveysListRequest' as const,
              status: CLIENT.RequestStatus.LOADED,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
