import { Epic } from 'epics/rootEpic'

import { signInEpic } from './signInEpic'

export const authEpics: Epic[] = [
  signInEpic,
]
