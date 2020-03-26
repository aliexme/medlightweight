import { Epic } from 'epics/rootEpic'

import { historyPushEpic } from './historyPushEpic'

export const navigationEpics: Epic[] = [
  historyPushEpic,
]
