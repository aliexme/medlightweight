import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { getFromMap } from 'utils/immutableUtils'

export const DEFAULT_PATIENTS_LIST_FILTERS_PAGE_SIZE = 10
export const AUTOCOMPLETE_PATIENTS_PAGE_SIZE = 5

export const DEFAULT_PATIENT: CLIENT.Patient = {
  id: -1,
  ownerId: -1,
  name: 'UNKNOWN',
  gender: API.Gender.MALE,
  age: -1,
  birth: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
}

export function mapApiPatientToClient(apiPatient: API.Patient): CLIENT.Patient {
  return {
    id: apiPatient.id,
    name: apiPatient.name,
    gender: apiPatient.gender,
    birth: new Date(apiPatient.birth),
    age: apiPatient.age,
    ownerId: apiPatient.owner,
    createdAt: new Date(apiPatient.created_at),
    updatedAt: new Date(apiPatient.updated_at),
  }
}

export function getPatientsByIds(patientIds: number[], patientsMap: CLIENT.PatientsMap): CLIENT.Patient[] {
  return patientIds
    .map((patientId) => getFromMap(patientsMap, patientId))
    .filter((patient): patient is CLIENT.Patient => patient !== undefined)
}
