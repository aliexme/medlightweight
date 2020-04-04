import { API } from 'types/api'
import { CLIENT } from 'types/client'
import { getFromMap } from 'utils/immutableUtils'

export const DEFAULT_SURVEYS_LIST_FILTERS_PAGE_SIZE = 10

export function mapApiSurveyToClient(apiSurvey: API.Survey): CLIENT.Survey {
  return {
    id: apiSurvey.id,
    name: apiSurvey.name,
    description: apiSurvey.description || undefined,
    directory: apiSurvey.directory,
    createdAt: new Date(apiSurvey.created_at),
    updatedAt: new Date(apiSurvey.updated_at),
    ownerId: apiSurvey.owner,
    patientId: apiSurvey.patient || undefined,
  }
}

export function getSurveys(surveysListIds: number[], surveysMap: CLIENT.SurveysMap): CLIENT.Survey[] {
  return surveysListIds
    .map((surveyId) => getFromMap(surveysMap, surveyId))
    .filter((survey): survey is CLIENT.Survey => survey !== undefined)
}
