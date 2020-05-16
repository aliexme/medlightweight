import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { getFromMap } from 'utils/immutableUtils'

export const DEFAULT_SURVEY_COMMENTS_INFO: CLIENT.SurveyCommentsInfo = {
  commentsListIds: [],
}

export function mapApiSurveyCommentToClient(apiSurveyComment: API.SurveyComment): CLIENT.SurveyComment {
  return {
    id: apiSurveyComment.id,
    text: apiSurveyComment.text,
    ownerId: apiSurveyComment.owner,
    surveyId: apiSurveyComment.survey,
    createdAt: new Date(apiSurveyComment.created_at),
    updatedAt: new Date(apiSurveyComment.updated_at),
  }
}

export function getSurveyCommentsByIds(
  surveyCommentsMap: CLIENT.SurveyCommentsMap,
  surveyCommentIds: number[],
): CLIENT.SurveyComment[] {
  return surveyCommentIds
    .map((surveyCommentId) => getFromMap(surveyCommentsMap, surveyCommentId))
    .filter((surveyComment): surveyComment is CLIENT.SurveyComment => surveyComment !== undefined)
}
