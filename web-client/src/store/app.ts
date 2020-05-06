import { Reducer } from 'redux'

import { Action, Actions } from 'actions'
import { LocalStorageKey } from 'localStorage'

export type AppState = {
  loaded: boolean
  authorized: boolean
}

export const defaultAppState: AppState = {
  loaded: false,
  authorized: localStorage.getItem(LocalStorageKey.TOKEN) !== null,
}

export const appReducer: Reducer<AppState, Action> = (state = defaultAppState, action) => {
  switch (action.type) {
    case Actions.APP_LOADED_STATE: {
      return {
        ...state,
        loaded: action.data.loaded,
      }
    }

    case Actions.SET_AUTHORIZED_STATE: {
      return {
        ...state,
        authorized: action.data.authorized,
      }
    }
  }

  return state
}
