import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'
import { mapApiSurveyCommentToClient } from 'utils/surveysCommentsUtils'

export const fetchSurveyCommentsEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiFetchSurveyComments>(Actions.API_FETCH_SURVEY_COMMENTS),
  guardMergeMap((action) => {
    const url = API.MlwSurvey.MLW_SURVEYS_BASE_URL + API.MlwSurvey.Comments.URL_PATH
    const req: API.MlwSurvey.Comments.List.Req = action.data

    return deps.ajax.get(url, req).pipe(
      mergeMap((resp: API.MlwSurvey.Comments.List.Resp) => {
        const clientSurveyComments = resp.map((apiSurveyComment) => mapApiSurveyCommentToClient(apiSurveyComment))
        const surveyCommentsIds = clientSurveyComments.map((surveyComment) => surveyComment.id)

        return of(
          createAction(Actions.UPDATE_SURVEY_COMMENTS, { surveyComments: clientSurveyComments }),
          createAction(Actions.SET_SURVEY_COMMENTS_INFO, {
            surveyId: action.data.surveyId,
            surveyCommentsInfo: {
              commentsListIds: surveyCommentsIds,
            },
          }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.FETCH_SURVEY_COMMENTS_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.FETCH_SURVEY_COMMENTS_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.FETCH_SURVEY_COMMENTS_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
