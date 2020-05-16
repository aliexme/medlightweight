import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardExhaustMap } from 'utils/epicsUtils'
import { mapApiSurveyCommentToClient } from 'utils/surveysCommentsUtils'

export const addCommentToSurveyEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiAddCommentToSurvey>(Actions.API_ADD_COMMENT_TO_SURVEY),
  guardExhaustMap((action) => {
    const url = API.MlwSurvey.MLW_SURVEYS_BASE_URL + API.MlwSurvey.Comments.URL_PATH
    const req: API.MlwSurvey.Comments.Create.Req = action.data

    return deps.ajax.post(url, req).pipe(
      mergeMap((resp: API.MlwSurvey.Comments.Create.Resp) => {
        const clientComment = mapApiSurveyCommentToClient(resp)

        return of(
          createAction(Actions.UPDATE_SURVEY_COMMENTS, { surveyComments: [clientComment] }),
          createAction(Actions.ADD_COMMENT_TO_SURVEY_COMMENTS_INFO, {
            surveyId: action.data.survey,
            surveyCommentId: clientComment.id,
          }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.ADD_COMMENT_TO_SURVEY_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.ADD_COMMENT_TO_SURVEY_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.ADD_COMMENT_TO_SURVEY_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
