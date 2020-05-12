import { combineEpics, Epic as ReduxObservableEpic } from 'redux-observable'
import { catchError } from 'rxjs/operators'
import { History } from 'history'

import { Action } from 'actions'
import { Store } from 'store/store'
import { AjaxObservable } from 'network/ajax'
import { logError } from 'logging'

import { authEpics } from './authEpics/authEpics'
import { navigationEpics } from './navigationEpics/navigationEpics'
import { surveysEpics } from './surveysEpics/surveysEpics'
import { patientsEpics } from './patientsEpics/patientsEpics'
import { patientsSurveysEpics } from './patientsSurveysEpics/patientsSurveysEpics'
import { appEpics } from './appEpics/appEpics'
import { usersEpics } from './usersEpics/usersEpics'

export type EpicDependencies = {
  history: History
  ajax: AjaxObservable
}

export type Epic = ReduxObservableEpic<Action, Action, Store, EpicDependencies>

const epics: Epic[] = [
  ...appEpics,
  ...authEpics,
  ...navigationEpics,
  ...surveysEpics,
  ...patientsEpics,
  ...patientsSurveysEpics,
  ...usersEpics,
]

export const rootEpic: Epic = (action$, store$, dependencies) => {
  return combineEpics(...epics)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      logError(error)
      return source
    }),
  )
}
