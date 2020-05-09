import { combineReducers, createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'

import { Action } from 'actions'
import { EpicDependencies, rootEpic } from 'epics/rootEpic'
import { browserHistory } from 'browserHistory'
import { ajaxObservable } from 'network/http'

import { appReducer, AppState } from './app'
import { modalsReducer, ModalsState } from './modals'
import { requestsReducer, RequestsState } from './requests'
import { surveysReducer, SurveysState } from './surveys'
import { drawerReducer, DrawerState } from './drawer'
import { patientsReducer, PatientsState } from './patients'

export type Store = {
  app: AppState
  drawer: DrawerState
  modals: ModalsState
  requests: RequestsState
  surveys: SurveysState
  patients: PatientsState
}

const rootReducer = combineReducers<Store, Action>({
  app: appReducer,
  drawer: drawerReducer,
  modals: modalsReducer,
  requests: requestsReducer,
  surveys: surveysReducer,
  patients: patientsReducer,
})

const epicMiddleware = createEpicMiddleware<Action, Action, Store, EpicDependencies>({
  dependencies: {
    history: browserHistory,
    ajax: ajaxObservable,
  },
})

const reduxLogger = createLogger({
  collapsed: true,
  diff: true,
  timestamp: false,
})

function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      epicMiddleware,
      reduxLogger,
    ),
  )

  epicMiddleware.run(rootEpic)

  return store
}

export const store = configureStore()
