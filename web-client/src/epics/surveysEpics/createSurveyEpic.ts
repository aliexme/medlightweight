import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Actions, createAction, createActionEmpty } from 'actions'
import { Epic } from 'epics/rootEpic'
import { guardMergeMap, takeUntilCancelRequest } from 'utils/epicUtils'

export const createSurveyEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiCreateSurvey>(Actions.API_CREATE_SURVEY),
  guardMergeMap((action) => {
    const req: API.MlwSurvey.Create.Req = action.data

    return deps.ajax.postFormData(API.MlwSurvey.Create.URL, req).pipe(
      takeUntilCancelRequest(action$, CLIENT.Requests.CREATE_SURVEY_REQUEST),
      mergeMap(() => {
        return of(
          createActionEmpty(Actions.POP_MODAL),
          createAction(Actions.CHANGE_SURVEYS_LIST_FILTERS, {
            filters: { page: 1 },
            options: { fetchSurveysList: true },
          }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.CREATE_SURVEY_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.CREATE_SURVEY_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.CREATE_SURVEY_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
