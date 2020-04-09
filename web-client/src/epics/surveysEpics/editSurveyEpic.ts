import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction, createActionEmpty } from 'actions'
import { guardMergeMap, takeUntilCancelRequest } from 'utils/epicUtils'
import { mapApiSurveyToClient } from 'utils/surveysUtils'

export const editSurveyEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiEditSurvey>(Actions.API_EDIT_SURVEY),
  guardMergeMap((action) => {
    const req: API.MlwSurvey.Update.Req = action.data

    return deps.ajax.path(`${API.MlwSurvey.Update.URL}${action.data.id}/`, req, { formData: true }).pipe(
      takeUntilCancelRequest(action$, CLIENT.Requests.EDIT_SURVEY_REQUEST),
      mergeMap((resp: API.MlwSurvey.Update.Resp) => {
        const clientSurvey = mapApiSurveyToClient(resp)

        return of(
          createActionEmpty(Actions.POP_MODAL),
          createAction(Actions.UPDATE_SURVEYS, { surveys: [clientSurvey] }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.EDIT_SURVEY_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.EDIT_SURVEY_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.EDIT_SURVEY_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
