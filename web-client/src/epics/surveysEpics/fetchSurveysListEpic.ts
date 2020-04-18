import { concat, of, throwError } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap, startWith } from 'rxjs/operators'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Actions, createAction } from 'actions'
import { Epic } from 'epics/rootEpic'
import { guardMergeMap } from 'utils/epicsUtils'
import { DEFAULT_SURVEYS_LIST_FILTERS_PAGE_SIZE, mapApiSurveyToClient } from 'utils/surveysUtils'

export const fetchSurveysListEpic: Epic = (action$, state$, deps) => action$.pipe(
  ofType<Actions.ApiFetchSurveysList>(Actions.API_FETCH_SURVEYS_LIST),
  guardMergeMap(() => {
    const { filters } = state$.value.surveys
    const req: API.MlwSurvey.List.Req = {
      page: filters.page || 1,
      pageSize: filters.pageSize || DEFAULT_SURVEYS_LIST_FILTERS_PAGE_SIZE,
      searchText: filters.searchText || undefined,
    }

    return deps.ajax.get(API.MlwSurvey.MLW_SURVEYS_BASE_URL, req).pipe(
      mergeMap((resp: API.MlwSurvey.List.Resp) => {
        const clientSurveys = resp.results.map((apiSurvey) => mapApiSurveyToClient(apiSurvey))

        return of(
          createAction(Actions.SET_SURVEYS_LIST, {
            surveys: clientSurveys,
            totalCount: resp.count,
          }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.FETCH_SURVEYS_LIST_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.FETCH_SURVEYS_LIST_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.FETCH_SURVEYS_LIST_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
