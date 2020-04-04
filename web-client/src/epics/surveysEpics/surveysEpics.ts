import { Epic } from 'epics/rootEpic'

import { fetchSurveysListEpic } from './fetchSurveysListEpic'
import { changeSurveysListFiltersEpic } from './changeSurveysListFiltersEpic'
import { createSurveyEpic } from './createSurveyEpic'
import { searchSurveysEpic } from './searchSurveysEpic'

export const surveysEpics: Epic[] = [
  fetchSurveysListEpic,
  changeSurveysListFiltersEpic,
  createSurveyEpic,
  searchSurveysEpic,
]
