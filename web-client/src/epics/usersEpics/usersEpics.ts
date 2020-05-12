import { Epic } from 'epics/rootEpic'

import { fetchUsersListEpic } from './fetchUsersListEpic'
import { fetchCurrentUserEpic } from './fetchCurrentUserEpic'

export const usersEpics: Epic[] = [
  fetchUsersListEpic,
  fetchCurrentUserEpic,
]
