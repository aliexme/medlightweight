import { Epic } from 'epics/rootEpic'

import { fetchSurveysListEpic } from './fetchSurveysListEpic'
import { changeSurveysListFiltersEpic } from './changeSurveysListFiltersEpic'
import { createSurveyEpic } from './createSurveyEpic'
import { searchSurveysEpic } from './searchSurveysEpic'
import { editSurveyEpic } from './editSurveyEpic'

export const surveysEpics: Epic[] = [
  fetchSurveysListEpic,
  changeSurveysListFiltersEpic,
  createSurveyEpic,
  editSurveyEpic,
  searchSurveysEpic,
]
