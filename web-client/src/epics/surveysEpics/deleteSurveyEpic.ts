import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction, createActionEmpty } from 'actions'
import { guardMergeMap, takeUntilCancelRequest } from 'utils/epicsUtils'

export const deleteSurveyEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiDeleteSurvey>(Actions.API_DELETE_SURVEY),
  guardMergeMap((action) => {
    const url = API.MlwSurvey.MLW_SURVEYS_BASE_URL + action.data.surveyId + '/'

    return deps.ajax.delete(url).pipe(
      takeUntilCancelRequest(action$, CLIENT.Requests.DELETE_SURVEY_REQUEST),
      mergeMap(() => {
        return of(
          createActionEmpty(Actions.HISTORY_GO_BACK),
          createActionEmpty(Actions.POP_MODAL),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.DELETE_SURVEY_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.DELETE_SURVEY_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.DELETE_SURVEY_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
