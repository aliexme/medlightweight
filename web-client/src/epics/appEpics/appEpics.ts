import { Epic } from 'epics/rootEpic'

import { startAppLoadingEpic } from './startAppLoadingEpic'
import { appLoadedEpic } from './appLoadedEpic'

export const appEpics: Epic[] = [
  startAppLoadingEpic,
  appLoadedEpic,
]
