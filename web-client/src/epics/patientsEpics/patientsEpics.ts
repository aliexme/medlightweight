import { Epic } from 'epics/rootEpic'

import { fetchPatientsListEpic } from './fetchPatientsListEpic'
import { changePatientsListFiltersEpic } from './changePatientsListFiltersEpic'
import { searchPatientsEpic } from './searchPatientsEpic'
import { fetchPatientInfoEpic } from './fetchPatientInfoEpic'
import { deletePatientEpic } from './deletePatientEpic'
import { createPatientEpic } from './createPatientEpic'
import { editPatientEpic } from './editPatientEpic'
import { fetchAutocompletePatientsEpic } from './fetchAutocompletePatientsEpic'

export const patientsEpics: Epic[] = [
  fetchPatientsListEpic,
  changePatientsListFiltersEpic,
  searchPatientsEpic,
  fetchPatientInfoEpic,
  deletePatientEpic,
  createPatientEpic,
  editPatientEpic,
  fetchAutocompletePatientsEpic,
]
