import { createSelector } from 'reselect'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { getSurveys } from 'utils/surveysUtils'

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
    return getSurveys(surveysListIds, surveysMap)
  },
)
