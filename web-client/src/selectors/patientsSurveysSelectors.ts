import createCachedSelector from 're-reselect'

import { Store } from 'store/store'
import { CLIENT } from 'types/client'
import { getFromMap } from 'utils/immutableUtils'
import { DEFAULT_PATIENT_SURVEYS_INFO } from 'utils/patientsSurveysUtils'
import { getSurveysByIds } from 'utils/surveysUtils'

export const getPatientSurveysSelector = createCachedSelector<
  Store,
  number,
  CLIENT.PatientsSurveysMap,
  CLIENT.SurveysMap,
  number,
  CLIENT.Survey[]
>(
  [
    (state) => state.patientsSurveys.patientsSurveysMap,
    (state) => state.surveys.surveysMap,
    (_state, patientId) => patientId,
  ],
  (patientsSurveysMap, surveysMap, patientId) => {
    const patientSurveysInfo = getFromMap(patientsSurveysMap, patientId, DEFAULT_PATIENT_SURVEYS_INFO)
    return getSurveysByIds(patientSurveysInfo.surveysListIds, surveysMap)
  },
)(
  (_state, patientId) => patientId,
)
