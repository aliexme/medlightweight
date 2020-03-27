import { Epic } from 'epics/rootEpic'

import { signInEpic } from './signInEpic'
import { logoutEpic } from './logoutEpic'

export const authEpics: Epic[] = [
  signInEpic,
  logoutEpic,
]
