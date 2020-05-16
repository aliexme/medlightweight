import { Epic } from 'epics/rootEpic'

import { fetchSurveyCommentsEpic } from './fetchSurveyCommentsEpic'
import { addCommentToSurveyEpic } from './addCommentToSurveyEpic'

export const surveysCommentsEpics: Epic[] = [
  fetchSurveyCommentsEpic,
  addCommentToSurveyEpic,
]
