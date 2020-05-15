import createCachedSelector from 're-reselect'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { getFromMap } from 'utils/immutableUtils'
import { DEFAULT_SURVEY_COMMENTS_INFO, getSurveyCommentsByIds } from 'utils/surveysCommentsUtils'

export const getSurveyCommentsSelector = createCachedSelector<
  Store,
  number,
  CLIENT.SurveysCommentsInfoMap,
  CLIENT.SurveyCommentsMap,
  number,
  CLIENT.SurveyComment[]
>(
  [
    (state) => state.surveysComments.surveysCommentsInfoMap,
    (state) => state.surveysComments.surveyCommentsMap,
    (_state, surveyId) => surveyId,
  ],
  (surveysCommentsInfoMap, surveyCommentsMap, surveyId) => {
    const surveyCommentsInfo = getFromMap(surveysCommentsInfoMap, surveyId, DEFAULT_SURVEY_COMMENTS_INFO)
    return getSurveyCommentsByIds(surveyCommentsMap, surveyCommentsInfo.commentsListIds)
  },
)(
  (_state, surveyId) => surveyId,
)
