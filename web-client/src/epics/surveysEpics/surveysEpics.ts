import { Epic } from 'epics/rootEpic'

import { fetchSurveysListEpic } from './fetchSurveysListEpic'
import { changeSurveysListFiltersEpic } from './changeSurveysListFiltersEpic'
import { createSurveyEpic } from './createSurveyEpic'
import { searchSurveysEpic } from './searchSurveysEpic'
import { editSurveyEpic } from './editSurveyEpic'
import { deleteSurveyEpic } from './deleteSurveyEpic'
import { fetchSurveyInfoEpic } from './fetchSurveyInfoEpic'

export const surveysEpics: Epic[] = [
  fetchSurveysListEpic,
  changeSurveysListFiltersEpic,
  createSurveyEpic,
  editSurveyEpic,
  deleteSurveyEpic,
  searchSurveysEpic,
  fetchSurveyInfoEpic,
]
