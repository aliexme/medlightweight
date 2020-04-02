import { Epic } from 'epics/rootEpic'

import { fetchSurveysListEpic } from './fetchSurveysListEpic'
import { changeSurveysListFiltersEpic } from './changeSurveysListFiltersEpic'
import { createSurveyEpic } from './createSurveyEpic'

export const surveysEpics: Epic[] = [
  fetchSurveysListEpic,
  changeSurveysListFiltersEpic,
  createSurveyEpic,
]
