import { Epic } from 'epics/rootEpic'

import { fetchPatientSurveysEpic } from './fetchPatientSurveysEpic'
import { changePatientSurveysFiltersEpic } from './changePatientSurveysFiltersEpic'
import { searchPatientSurveysEpic } from './searchPatientSurveysEpic'

export const patientsSurveysEpics: Epic[] = [
  fetchPatientSurveysEpic,
  changePatientSurveysFiltersEpic,
  searchPatientSurveysEpic,
]
