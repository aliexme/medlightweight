import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Actions, createAction } from 'actions'
import { Epic } from 'epics/rootEpic'
import { guardMergeMap } from 'utils/epicsUtils'
import { mapApiSurveyToClient } from 'utils/surveysUtils'

export const fetchSurveyInfoEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiSurveyInfo>(Actions.API_SURVEY_INFO),
  guardMergeMap((action) => {
    const url = API.MlwSurvey.MLW_SURVEYS_BASE_URL + action.data.surveyId + '/'
    const req: API.MlwSurvey.Info.Req = {}

    return deps.ajax.get(url, req).pipe(
      mergeMap((resp: API.MlwSurvey.Info.Resp) => {
        const clientSurvey = mapApiSurveyToClient(resp)

        return of(
          createAction(Actions.UPDATE_SURVEYS, { surveys: [clientSurvey] }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.FETCH_SURVEY_INFO_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.FETCH_SURVEY_INFO_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.FETCH_SURVEY_INFO_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
