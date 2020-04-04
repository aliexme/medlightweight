import { Reducer } from 'redux'
import { Map as IMap } from 'immutable'

import { CLIENT } from 'types/client'
import { Action, Actions } from 'actions'
import { mergeArrayToMap } from 'utils/immutableUtils'
import { DEFAULT_SURVEYS_LIST_FILTERS_PAGE_SIZE } from 'utils/surveysUtils'

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
    page: 1,
    pageSize: DEFAULT_SURVEYS_LIST_FILTERS_PAGE_SIZE,
    searchText: '',
  },
  surveysTotalCount: 0,
}

export const surveysReducer: Reducer<SurveysState, Action> = (state = defaultSurveysState, action): SurveysState => {
  switch (action.type) {
    case Actions.SET_SURVEYS_LIST: {
      const { surveys, totalCount } = action.data
      const surveyIds = surveys.map((survey) => survey.id)

      return {
        ...state,
        surveysListIds: surveyIds,
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
          page: action.data.filters.page || 1,
        },
      }
    }

    case Actions.UPDATE_SURVEYS: {
      const { surveys } = action.data

      return {
        ...state,
        surveysMap: mergeArrayToMap(state.surveysMap, surveys),
      }
    }
  }

  return state
}
