import { Reducer } from 'redux'
import { Map as IMap } from 'immutable'

import { CLIENT } from 'types/client'
import { Action, Actions } from 'actions'
import { getFromMap, mergeArrayToMap } from 'utils/immutableUtils'
import { DEFAULT_SURVEY_COMMENTS_INFO } from 'utils/surveysCommentsUtils'

export type SurveysCommentsState = {
  surveyCommentsMap: CLIENT.SurveyCommentsMap
  surveysCommentsInfoMap: CLIENT.SurveysCommentsInfoMap
}

export const defaultSurveysCommentsState: SurveysCommentsState = {
  surveyCommentsMap: IMap(),
  surveysCommentsInfoMap: IMap(),
}

export const surveysCommentsReducer: Reducer<SurveysCommentsState, Action> = (
  state = defaultSurveysCommentsState,
  action,
) => {
  switch (action.type) {
    case Actions.UPDATE_SURVEY_COMMENTS: {
      return {
        ...state,
        surveyCommentsMap: mergeArrayToMap(state.surveyCommentsMap, action.data.surveyComments),
      }
    }

    case Actions.SET_SURVEY_COMMENTS_INFO: {
      const { surveyId, surveyCommentsInfo } = action.data

      return {
        ...state,
        surveysCommentsInfoMap: state.surveysCommentsInfoMap.set(surveyId, surveyCommentsInfo),
      }
    }

    case Actions.ADD_COMMENT_TO_SURVEY_COMMENTS_INFO: {
      const { surveyId, surveyCommentId } = action.data
      const surveyCommentsInfo = getFromMap(state.surveysCommentsInfoMap, surveyId, DEFAULT_SURVEY_COMMENTS_INFO)
      const updatedSurveyCommentsInfo: CLIENT.SurveyCommentsInfo = {
        ...surveyCommentsInfo,
        commentsListIds: [surveyCommentId, ...surveyCommentsInfo.commentsListIds],
      }

      return {
        ...state,
        surveysCommentsInfoMap: state.surveysCommentsInfoMap.set(surveyId, updatedSurveyCommentsInfo),
      }
    }
  }

  return state
}
