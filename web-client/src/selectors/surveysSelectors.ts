import { createSelector } from 'reselect'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { getSurveysByIds } from 'utils/surveysUtils'

export const getSurveysSelector = createSelector<
  Store,
  number[],
  CLIENT.SurveysMap,
  CLIENT.Survey[]
>(
  [
    (state) => state.surveys.surveysListIds,
    (state) => state.surveys.surveysMap,
  ],
  (surveysListIds, surveysMap) => {
    return getSurveysByIds(surveysListIds, surveysMap)
  },
)
