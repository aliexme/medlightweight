import { API } from 'types/api'

export function getGenderShortcut(gender: API.Gender): string {
  switch (gender) {
    case API.Gender.MALE:
      return 'М'
    case API.Gender.FEMALE:
      return 'Ж'
  }
}
