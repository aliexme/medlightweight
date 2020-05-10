import { Epic } from 'epics/rootEpic'

import { historyPushEpic } from './historyPushEpic'
import { historyGoBackEpic } from './historyGoBackEpic'

export const navigationEpics: Epic[] = [
  historyPushEpic,
  historyGoBackEpic,
]
