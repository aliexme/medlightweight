import { Reducer } from 'redux'

import { CLIENT } from 'types/client'
import { Action, Actions } from 'actions'

export type ModalsState = {
  stack: CLIENT.Modal[]
}

export const defaultModalsState: ModalsState = {
  stack: [],
}

export const modalsReducer: Reducer<ModalsState, Action> = (state = defaultModalsState, action): ModalsState => {
  switch (action.type) {
    case Actions.PUSH_MODAL: {
      return {
        ...state,
        stack: [...state.stack, action.data],
      }
    }

    case Actions.POP_MODAL: {
      return {
        ...state,
        stack: state.stack.slice(0, -1),
      }
    }

    case Actions.CLOSE_ALL_MODAL: {
      return {
        ...state,
        stack: [],
      }
    }
  }

  return state
}
