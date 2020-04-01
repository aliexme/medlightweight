import { Reducer } from 'redux'
import { Map as IMap } from 'immutable'

import { CLIENT } from 'types/client'
import { Action, Actions } from 'actions'
import { mergeArrayToMap } from 'utils/immutableUtils'

export type SurveysState = {
  surveysListIds: number[]
  surveysMap: CLIENT.SurveysMap
  filters: CLIENT.SurveysListFilters
  surveysTotalCount: number
}

export const defaultSurveysState: SurveysState = {
  surveysListIds: [],
  surveysMap: IMap(),
  filters: {
    limit: 20,
    offset: 0,
  },
  surveysTotalCount: 0,
}

export const surveysReducer: Reducer<SurveysState, Action> = (state = defaultSurveysState, action): SurveysState => {
  switch (action.type) {
    case Actions.SET_SURVEYS_LIST: {
      const { surveys, totalCount, concat } = action.data
      const surveyIds = surveys.map((survey) => survey.id)
      const updatedSurveysListIds = concat
        ? [...state.surveysListIds, ...surveyIds]
        : surveyIds

      return {
        ...state,
        surveysListIds: updatedSurveysListIds,
        surveysMap: mergeArrayToMap(state.surveysMap, surveys),
        surveysTotalCount: totalCount,
      }
    }

    case Actions.CHANGE_SURVEYS_LIST_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.data.filters,
          offset: action.data.filters.offset || 0,
        },
      }
    }
  }

  return state
}
