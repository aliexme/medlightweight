import { combineReducers, createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { Action } from 'actions'
import { EpicDependencies, rootEpic } from 'epics/rootEpic'
import { browserHistory } from 'browserHistory'
import { ajaxObservable } from 'network/http'

import { appReducer, AppState } from './app'
import { requestsReducer, RequestsState } from './requests'

export type Store = {
  app: AppState
  requests: RequestsState
}

const rootReducer = combineReducers<Store, Action>({
  app: appReducer,
  requests: requestsReducer,
})

const epicMiddleware = createEpicMiddleware<Action, Action, Store, EpicDependencies>({
  dependencies: {
    history: browserHistory,
    ajax: ajaxObservable,
  },
})

function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware),
  )

  epicMiddleware.run(rootEpic)

  return store
}

export const store = configureStore()
