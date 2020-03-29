import { Epic } from 'epics/rootEpic'

import { fetchSurveysListEpic } from './fetchSurveysListEpic'
import { changeSurveysListFiltersEpic } from './changeSurveysListFiltersEpic'

export const surveysEpics: Epic[] = [
  fetchSurveysListEpic,
  changeSurveysListFiltersEpic,
]
